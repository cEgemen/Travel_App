import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {useRouteStore} from '../../../managments';
import { router } from 'expo-router';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { borderRadius, colors, elevation, fonts, spaces } from '../../../constands';

export default ({routesData=[],currentIndex = 0,onChangeIndex = (index) => {}}) => {
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

  console.log("routeData[0] : ",routesData[0])

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
                  <View style={styles.imgContainer}>
                   <Image style={{width:"100%",height:"100%",resizeMode:"contain"}} source={{uri:"https://placehold.co/600x400"}} />
                   <Text numberOfLines={1} style={{fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight,position:"relative",bottom:30,left:10}}>{item.name}</Text>
                  </View>
                  <View>
                    
                  </View>
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
     marginHorizontal: spaces.middle,
     justifyContent: "space-between",
  },
  imgContainer : {
    height:"50%",width:"100%",borderBottomLeftRadius:borderRadius.highRadius,borderBottomRightRadius:borderRadius.highRadius,backgroundColor:colors.primary,elevation:elevation.middleShhadow,overflow:"hidden",position:"relative"
  }
});