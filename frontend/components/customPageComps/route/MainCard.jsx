import {View,Text,StyleSheet,FlatList,Pressable} from "react-native";
import Animated, {FadeInUp} from "react-native-reanimated";
import { borderRadius, colors, detailText, elevation, fonts, spaces, subTitle } from "../../../constands";
import {useRouteStore} from "../../../managments";
import { router } from "expo-router";
import {rightShortArrowIcon } from "../../../assets";
import SquareButton from "../../customButtons/SquareButton";

export default function MainCard({routesData=[],currentIndex = 0,onChangeIndex = (index) => {}}) {
  const setSelectRoute = useRouteStore(state => state.setSelectRoute)
  
  const handleCard = () => {
        setSelectRoute({routeData : routesData[currentIndex],routeNumber : currentIndex + 1})
        router.push("/route/routeDetail")
  }

  return (
        <View style={styles.container}>
          <FlatList
            data={routesData}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{rowGap:spaces.middle,paddingVertical:spaces.small}}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
                const selectStyle = currentIndex !== index ? {} : {backgroundColor:"rgb(231, 231, 231)",elevation:elevation.middleShadow,borderRadius:borderRadius.highRadius}
                return  <Animated.View
                         entering={FadeInUp.delay(index * 80).duration(1000)}
                        >
                         <Pressable style={[styles.card,selectStyle]} onPress={() => onChangeIndex(index)}>
                          <SquareButton label={index+1} contentStyle={{fontSize:fonts.smallMidFontSize}} />
                           <View style={{flex:1 , marginHorizontal:spaces.middle}} >
                            <Text style={subTitle} >{item.distance}km-{item.duration}min-{item.cost}$</Text>
                            <Text style={detailText} >{`${index === 0 ? "Green" : index === 1 ? "Blue" : "Pink"} lines represent route ${index+1}.`}</Text>
                           </View>
                          <SquareButton icon={rightShortArrowIcon} contentStyle={{tintColor:colors.backgroundDark}} onClick={handleCard} />
                         </Pressable>
                        </Animated.View>
            }}
          />
        </View>
  );
}

const styles = StyleSheet.create({
  container: {paddingHorizontal:spaces.middle,paddingVertical:spaces.high},
  
  card: {
    height: 70,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  
  cardTitleWrapper : {width:30,height:30,position:"absolute",top:spaces.high,right:spaces.middle,backgroundColor:"rgba(255,255,255,.7)",borderRadius:borderRadius.circleRadius(30),alignItems:"center",justifyContent:"center",borderColor:colors.backgroundDark,borderWidth:1},

});