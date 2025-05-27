import { useState } from "react";
import {View,Text,TouchableOpacity,StyleSheet,FlatList, Image} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Animated, {FadeInRight} from "react-native-reanimated";
import { borderRadius, colors, elevation, fonts, spaces } from "../../../constands";
import {useRouteStore} from "../../../managments";
import { router } from "expo-router";
import TouchableIcon from "../../customButtons/TouchableIconButton";
import { leftShortArrowIcon, rightShortArrowIcon,upShortArrowIcon,downShortArrowIcon, lineIcon, mainCardImg } from "../../../assets";

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
      const levelColor = level === 0 ? "rgb(44, 168, 48)" : level === 1 ? "rgb(1, 33, 241)" : "rgb(205, 44, 44)"
      const levelIcon  = level === 0 ? upShortArrowIcon : level === 1 ? lineIcon : downShortArrowIcon
      return <>
                  <View style={styles.cardDetailWrapper}>
                    <Text style={styles.cardText}>{data}</Text>
                    <CircleLevel levelColor={levelColor} levelIcon = {levelIcon}/>
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

  const CircleLevel = ({levelColor,levelIcon}) => {
      return  <Image style={{...styles.levelCircle,tintColor:levelColor}} source={levelIcon}  />

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
                  <View style={{height:"35%",flexDirection:"row",justifyContent:"flex-start",alignItems:"center",columnGap:spaces.small}}>
                   <Image style={styles.cardImg} source={mainCardImg} />
                   <View style={styles.cardTitleWrapper}>
                    <Text style={styles.cardTitle}>{(index+1)}</Text> 
                   </View>
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
    elevation:elevation.smallShadow
  },
  
  cardTitleWrapper : {width:30,height:30,position:"absolute",top:spaces.high,right:spaces.middle,backgroundColor:"rgba(255,255,255,.7)",borderRadius:borderRadius.circleRadius(30),alignItems:"center",justifyContent:"center",borderColor:colors.backgroundDark,borderWidth:1},

  cardTitle: {
    fontWeight: fonts.middleFontWeight,
    fontSize : fonts.smallMidFontSize,
    color:colors.backgroundDark,
  },

  cardImg : {
      height:"100%",width:"80%",resizeMode:"contain"
  } ,

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
      width:20,height:20
  },

 levelDetailWrapper :{flexDirection:"row",alignItems:"center",alignSelf:"flex-start",columnGap:spaces.small,elevation:elevation.middleShadow,backgroundColor:colors.lightGray,borderRadius:borderRadius.middleRadius}, 

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