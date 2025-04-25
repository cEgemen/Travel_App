import React from "react";
import {View,Text,TouchableOpacity,StyleSheet,FlatList,ImageBackground} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Animated, {FadeInRight} from "react-native-reanimated";
import { borderRadius, colors, fonts, spaces } from "../../../constands/appConstand";
import useRouteStore from "../../../managments/routeStore";
import { router } from "expo-router";

export default function MainCard({routesData=[],currentIndex = 0,onChangeIndex = (index) => {}}) {
  const setSelectRoute = useRouteStore(state => state.setSelectRoute)
  const cardWidth = 220 + 20;

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (cardWidth - 20));
    if(currentIndex !== index)
    {
      onChangeIndex(index);
    }
  };

  const handleCart = () => {
        setSelectRoute({routeData : routesData[currentIndex],routeNumber : currentIndex + 1})
        router.push("/route/routeDetail")
  }

  return (

        <View style={styles.container}>
          <FlatList
            data={routesData}
            keyExtractor={(item) => item.id.toString()}
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
                   <Text style={styles.cardTitle}>{"Rota "+(index+1)}</Text>   
                   <Icon
                      name="map-marker"
                      size={25}
                      color={
                        index === 0 ? "#ff5c83": index === 1? "#5facdb" : "#bb32fe"
                            }
                   />
                  </View>
                  <View style={styles.cardFooter}>
                  <Text style={styles.cardText}>{"Distance : "+item.distance}</Text>
                  <Text style={styles.cardText}>{"Duration : "+item.duration}</Text>
                  <Text style={styles.cardText}>{"Cost : " + item.cost}</Text>
                  <Text style={styles.cardText}>{"Traffic Level : " + item.trafficLevel}</Text>
               
                  </View>

                  <TouchableOpacity
                    onPress={handleCart}
                    style={styles.routeButton}
                  >
                    <Text style={styles.routeButtonText}>Rota Seç</Text>
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
    fontSize: fonts.middleFontSize,
    fontWeight: fonts.middleFontWeight,
    color:colors.backgroundDark,
    textAlign: "center",
    marginBottom:spaces.small,
  },

  cardFooter: {
    flexDirection: "column",
    flex:1,
  },

  cardText: { flex: 1, fontSize:fonts.smallFontSize, color: colors.darkGray, marginRight:spaces.middle },

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