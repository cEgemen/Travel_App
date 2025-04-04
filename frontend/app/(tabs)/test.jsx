import React, { useState, useEffect, useCallback, useRef } from 'react';
import {View,TextInput,Button,Alert,StyleSheet,ScrollView,TouchableOpacity,ActivityIndicator,Text,Dimensions} from 'react-native';
import MapView, { Polyline, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import debounce from 'lodash.debounce';

const { width, height } = Dimensions.get('window');

const MapScreen = () => {
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isStartInputFocused, setIsStartInputFocused] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);

  // Renk paletleri
  const ROUTE_COLORS = {
    paid: ['#FF6B6B', '#FF8E53', '#FFD93D'],
    free: ['#4CAF50', '#2196F3', '#9C27B0', '#673AB7', '#009688']
  };

  // Konum izinleri ve kullanıcı konum takibi
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation([location.coords.latitude, location.coords.longitude]);

        const watch = await Location.watchPositionAsync({
          accuracy: Location.Accuracy.High,
          distanceInterval: 10
        }, (newLocation) => {
          setUserLocation([newLocation.coords.latitude, newLocation.coords.longitude]);
        });

        return () => watch.remove();
      }
    })();
  }, []);

  // Adres → Koordinat dönüşümü
  const geocode = useCallback(async (address) => {
    if (address === 'My Location' && userLocation) return userLocation;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
      { headers: { 'User-Agent': 'MyApp' } }
    );
    const data = await response.json();
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  }, [userLocation]);

  // Otomatik tamamlama
  const fetchSuggestions = useCallback(debounce(async (query) => {
    if (query.length < 3) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
        { headers: { 'User-Agent': 'MyApp' } }
      );
      const data = await response.json();
      setSuggestions(data.map((item) => item.display_name));
      setShowSuggestions(true);
    } catch {
      setSuggestions([]);
    }
  }, 300), []);

  // Rota hesaplama
  const calculateRoute = async () => {
    try {
      setLoading(true);

      const startCoord = await geocode(start);
      const destCoord = await geocode(destination);

      const response = await fetch(
       ` https://router.project-osrm.org/route/v1/driving/${startCoord[1]},${startCoord[0]};${destCoord[1]},${destCoord[0]}?overview=full&geometries=geojson&alternatives=3`
      );
      
      const data = await response.json();
      console.log(data);

if (!data.routes || !Array.isArray(data.routes)) {
  throw new Error('Rota bilgisi alınamadı. Lütfen tekrar deneyin.');
}

const allRoutes = data.routes.map((route, index) => ({
  distance: `${(route.distance / 1000).toFixed(1)} km`,
  duration: `${Math.round(route.duration / 60)} dakika`,
  coordinates: route.geometry?.coordinates
    ? route.geometry.coordinates.map(([lon, lat]) => [lat, lon])
    : [],
  isPaid: index % 2 === 0,
  trafficLevel: Math.floor(Math.random() * 3),
  cost: index % 2 === 0 ? Math.floor(Math.random() * 50) + 10 : 0
}));

      // Rotaları kategorilere ayırma
      const paidRoutes = allRoutes.filter((route) => route.isPaid).slice(0, 3);
      const freeRoutes = allRoutes.filter((route) => !route.isPaid).slice(0, 5);

      const finalRoutes = [...paidRoutes, ...freeRoutes];

      // Konsola yazdırma
      console.log('--- Tüm Rotalar ---');
      finalRoutes.forEach((route, index) => {
        /* console.log(Rota ${index + 1}:,
          ${route.distance} - ${route.duration},
          route.isPaid ? Ücretli ($${route.cost}) : 'Ücretsiz'
        ); */
      });

      setRoutes(finalRoutes);
      setSelectedRoute(0);

      // Harita güncelleme
      if (mapRef.current && finalRoutes[0]?.coordinates) {
        const coords = finalRoutes[0].coordinates.map((coord) => ({
          latitude: coord[0],
          longitude: coord[1]
        }));

        mapRef.current.fitToCoordinates(coords, {
          edgePadding: { top: 100, right: 50, bottom: 50, left: 50 },
          animated: true
        });
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Hata', 'Rota hesaplanırken bir sorun oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 39.9208,
            longitude: 32.8541,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation
          showsMyLocationButton
          followsUserLocation
        >
          {/* Rotaları çiz */}
          {routes.map((route, index) => {
            const isPaidRoute = route.isPaid;
            const colorIndex = isPaidRoute
              ? index % ROUTE_COLORS.paid.length
              : index % ROUTE_COLORS.free.length;

            const routeColor = isPaidRoute
              ? ROUTE_COLORS.paid[colorIndex]
              : ROUTE_COLORS.free[colorIndex];

            return (
              <Polyline
                key={index}
                coordinates={route.coordinates.map(coord => ({
                  latitude: coord[0],
                  longitude: coord[1]
                }))}
                strokeColor={routeColor}
                strokeWidth={index === selectedRoute ? 4 : 3}
                lineDashPattern={index === selectedRoute ? [] : [5]}
              />
            );
          })}

          {/* Başlangıç ve Bitiş Markerları */}
          {routes.length > 0 && (
            <>
              <Marker
                coordinate={{
                  latitude: routes[selectedRoute].coordinates[0][0],
                  longitude: routes[selectedRoute].coordinates[0][1]
                }}
                title="Başlangıç"
                pinColor="#3182ce"
              />
              <Marker
                coordinate={{
                  latitude: routes[selectedRoute].coordinates.slice(-1)[0][0],
                  longitude: routes[selectedRoute].coordinates.slice(-1)[0][1]
                }}
                title="Varış"
                pinColor="#e53e3e"
              />
            </>
          )}
        </MapView>

        {/* Kontrol Paneli */}
        <View style={styles.controls}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Başlangıç Noktası"
              value={start}
              onChangeText={(text) => {
                setStart(text);
                fetchSuggestions(text);
              }}
              onFocus={() => {
                setIsStartInputFocused(true);
                setShowSuggestions(true);
              }}
            />
            <TouchableOpacity
              style={styles.currentLocationButton}
              onPress={() => setStart('My Location')}
            >
              <MaterialIcons name="my-location" size={20} color="#3182ce" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Varış Noktası"
              value={destination}
              onChangeText={(text) => {
                setDestination(text);
                fetchSuggestions(text);
              }}
              onFocus={() => {
                setIsStartInputFocused(false);
                setShowSuggestions(true);
              }}
            />
            <TouchableOpacity
              style={styles.currentLocationButton}
              onPress={() => setDestination('My Location')}
            >
              <MaterialIcons name="my-location" size={20} color="#3182ce" />
            </TouchableOpacity>
          </View>

          {showSuggestions && suggestions.length > 0 && (
            <ScrollView style={styles.suggestionsList}>
              {suggestions.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionItem}
                  onPress={() => {
                    isStartInputFocused ? setStart(item) : setDestination(item);
                    setShowSuggestions(false);
                  }}
                >
                  <Text numberOfLines={1} style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          <Button
            title="Rota Oluştur"
            onPress={calculateRoute}
            color="#38a169"
            disabled={loading}
          />

          {routes.length > 0 && (
            <ScrollView
              horizontal
              style={styles.routeSelector}
              showsHorizontalScrollIndicator={false}
            >
              {routes.map((route, index) => {
                const isPaidRoute = route.isPaid;
                const colorIndex = isPaidRoute
                  ? index % ROUTE_COLORS.paid.length
                  : index % ROUTE_COLORS.free.length;

                const routeColor = isPaidRoute
                  ? ROUTE_COLORS.paid[colorIndex]
                  : ROUTE_COLORS.free[colorIndex];

                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.routeOption,
                      index === selectedRoute && styles.selectedRouteOption,
                      { borderLeftColor: routeColor, borderLeftWidth: 4 }
                    ]}
                    onPress={() => setSelectedRoute(index)}
                  >
                    <Text style={styles.routeOptionText}>
                      {index + 1}. {route.isPaid ? 'Ücretli' : 'Ücretsiz'} ({route.distance})
                    </Text>
                    <View style={styles.routeIndicators}>
                      <View style={[
                        styles.trafficIndicator,
                        { backgroundColor: ['#48bb78', '#ecc94b', '#f56565'][route.trafficLevel] }
                      ]} />
                      {route.isPaid && (
                        <Text style={styles.costText}>${route.cost}</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </View>

        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#3182ce" />
            <Text style={styles.loadingText}>Rota Hesaplanıyor...</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  map: {
    width,
    height,
  },
  controls: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  input: {
    flex: 1,
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontSize: 16
  },
  currentLocationButton: {
    padding: 10,
    marginLeft: 8
  },
  suggestionsList: {
    maxHeight: 150,
    marginVertical: 8,
    borderRadius: 8
  },
  suggestionItem: {
    padding: 12,
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#edf2f7'
  },
  suggestionText: {
    fontSize: 16,
    color: '#2d3748'
  },
  routeSelector: {
    marginTop: 15,
    maxHeight: 80
  },
  routeOption: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minWidth: 160
  },
  selectedRouteOption: {
    borderColor: '#3182ce',
    backgroundColor: '#ebf8ff'
  },
  routeOptionText: {
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 4
  },
  routeIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  trafficIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8
  },
  costText: {
    color: '#2f855a',
    fontWeight: 'bold',
    marginLeft: 5
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 10,
    color: '#3182ce',
    fontSize: 16
  }
});

export default MapScreen;