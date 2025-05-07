import React, { useState } from "react";
import {View,Text,TouchableOpacity,StyleSheet,FlatList,ImageBackground} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Animated, {FadeInRight} from "react-native-reanimated";
import { borderRadius, colors, elevation, fonts, spaces } from "../../../constands";
import {useRouteStore} from "../../../managments";
import { router } from "expo-router";
import TouchableIcon from "../../customButtons/TouchableIconButton";
import { leftShortArrowIcon, rightShortArrowIcon } from "../../../assets";

export default function MainCard({routesData=[],currentIndex = 0,onChangeIndex = (index) => {}}) {
  const setSelectRoute = useRouteStore(state => state.setSelectRoute)
  const [showLevel,setShowLevel] = useState(false)
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

  const CardDetail = ({data,level}) => {
      const levelColor = level === 0 ? "rgb(44, 168, 48)" : level === 1 ? "rgb(236, 222, 71)" : "rgb(205, 44, 44)"
      return <>
                  <View style={styles.cardDetailWrapper}>
                    <Text style={styles.cardText}>{data}</Text>
                    <CircleLevel levelColor={levelColor}/>
                  </View>
             </>

  }

  const calculateLevel = (key,index) => {
        let mainValue = null;
        let otherValue1 = null;
        let otherValue2 = null;
        for(let i = 0 ;  i < routesData.length ; i ++)
        {
            const value = routesData[i][key]
            if(i === index)
            {
               mainValue = value  
            }
            else if (otherValue1 === null)
            {
               otherValue1 = value
            } 
            else
            {
               otherValue2 = value
            } 
        }
        if(mainValue <= otherValue1 && mainValue <= otherValue2)
          {
            return 0;
          } 
       else if((otherValue1 < mainValue && mainValue <= otherValue2) || (otherValue2 < mainValue && mainValue <= otherValue1))
        {
            return 1
        } 
        else
        {
           return 2;
        }  
  }

  const CircleLevel = ({levelColor}) => {
      return  <View style={{...styles.levelCircle,backgroundColor:levelColor}}></View>

  }

  return (

        <View style={styles.container}>
          <View style={styles.levelDetailWrapper}>
              <Text style={{width:"auto"}}> Levels</Text>
              <TouchableIcon icon={showLevel ? leftShortArrowIcon : rightShortArrowIcon} iconStyle={{tintColor:colors.backgroundDark,width:25,height:25}} onPress={() => setShowLevel(oldState => !oldState)} /> 
              {showLevel ? <View style={{flex:1,flexDirection:"row",justifyContent:"space-around"}}>
            <View style={styles.levelWrapper}>
              <CircleLevel levelColor={"rgb(205, 44, 44)"} /> <Text> High</Text>
            </View>
            <View style={styles.levelWrapper}>
              <CircleLevel levelColor={"rgb(236, 222, 71)"} /> <Text> Middle</Text>
            </View>
            <View style={styles.levelWrapper}>
              <CircleLevel levelColor={"rgb(44, 168, 48)"} /> <Text> Low</Text>
            </View>
                        </View> : null 
          }
          </View>
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
                        index === 0 ? "rgb(33, 211, 74)": index === 1? "rgb(36, 26, 187)":"rgb(201, 76, 118)"
                            }
                   />
                  </View>
                  <View style={styles.cardFooter}>
                  <CardDetail data={"🛤️ "+item.distance+" km"} level={calculateLevel("distance",index)} />
                  <CardDetail data={"⏱️ "+item.duration+" min"} level={calculateLevel("duration",index)} />
                  <CardDetail data={"💰 "+item.cost+" $"} level={calculateLevel("cost",index)} />             
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
  container: {flexDirection:"column",rowGap:spaces.middle,paddingHorizontal:spaces.middle,paddingVertical:spaces.high},
  
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
    justifyContent:"space-around",
    flex:1,
  },

  cardDetailWrapper : {
      flexDirection:"row",columnGap:spaces.small,justifyContent:"space-between",alignItems:"center"
  },

  cardText: { flex: 1, fontSize:fonts.smallFontSize, color: colors.darkGray, marginRight:spaces.middle },

  levelCircle : {
      width:15,height:15,borderRadius:borderRadius.circleRadius(25),borderWidth:1,borderColor:"black"
  },

 levelDetailWrapper :{flexDirection:"row",alignItems:"center",alignSelf:"flex-start",columnGap:spaces.small,elevation:elevation.middleShhadow,backgroundColor:colors.lightGray,borderRadius:borderRadius.middleRadius}, 

 levelWrapper : {
    flexDirection:"row",alignItems:"center"
 },

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