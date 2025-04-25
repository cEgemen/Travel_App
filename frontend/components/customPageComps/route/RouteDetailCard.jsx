import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useRouteStore from '../../../managments/routeStore';
import { router } from 'expo-router';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { borderRadius, colors, fonts, spaces } from '../../../constands/appConstand';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export  const RouteDetailCard = ({routesData=[],currentIndex = 0,onChangeIndex = (index) => {}}) => {
  const setSelectPlace = useRouteStore(state => state.setSelectPlace)
  const cardWidth = 220 + 20;

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (cardWidth - 20));
    if(currentIndex !== index)
    {
      onChangeIndex(index);
    }
  };

  const handleCart = (placeData) => {
        setSelectPlace(placeData)
        router.push("/route/placeDetail")
  }

  /**
   * {"id": 13799212, "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Holborn_library.jpg", "lat": 51.5210756, "lon": -0.1156142, "name": "Holborn Library", "score": 6, "type": "library"}
   */

  return (

        <View style={styles.container}>
          <FlatList
            data={routesData}
            keyExtractor={(item,index) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardWidth}
            decelerationRate="fast"
            snapToAlignment="center"
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => (
                  <Animated.View
                   entering={FadeInRight.delay(400 + index * 200).duration(1000)}
                   style={styles.card}
                  >
                  <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",columnGap:spaces.small}}>
                   <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>   
                  </View>
                  <View style={styles.cardFooter}>
                  <Text style={styles.cardText}>🔖 {item.type.toUpperCase()}</Text>
                  <Text style={styles.cardText}>🔥 {item.score}/10</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleCart(item)}
                    style={styles.routeButton}
                  >
                   <Text style={styles.routeButtonText}>Detail</Text>
                  </TouchableOpacity>
                 </Animated.View>
            )}
          />
        </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal:spaces.middle,paddingVertical:spaces.high},
  card: {
     backgroundColor: colors.lightGray,
     height: 220,
     width: 220,
     borderRadius: borderRadius.highRadius,
     padding: spaces.middle,
     marginHorizontal: spaces.middle,
     justifyContent: "space-between",
  },

  cardTitle: {
    fontSize: fonts.smallMidFontSize,
    fontWeight: fonts.middleFontWeight,
    color:colors.backgroundDark,
    textAlign: "center",
    marginBottom:spaces.small,
  },

  cardFooter: {
    flexDirection: "row",
    flex:1,
    justifyContent:"space-around",alignItems:"center"
  },

  cardText: {fontSize:fonts.smallFontSize, color: colors.darkGray, marginRight:spaces.middle },

  routeButton: {
    marginTop:spaces.middle,
    backgroundColor:colors.primary,
    borderRadius:borderRadius.highRadius,
    paddingVertical: spaces.middle,
    alignItems: "center",
  },

  routeButtonText: {
    color: colors.background,
    fontSize: fonts.smallFontSize,
    fontWeight: fonts.smallMidFontSize,
  },
});