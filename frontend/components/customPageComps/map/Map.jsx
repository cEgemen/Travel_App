import React, {useRef } from 'react';
import {Alert,StyleSheet,Dimensions, View, TextInput, TouchableOpacity, ScrollView, Button, Text, ActivityIndicator} from 'react-native';
import MapView, { Polyline, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import useLocationStore from '../../../managments/locationStore';

const { width, height } = Dimensions.get('window');

const Map = () => {
  const {startDetails,endDetails} =  useLocationStore(state => state.locationDetails)

  const mapRef = useRef(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          
        </MapView>
      </View>
    </SafeAreaView>
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

export default Map;