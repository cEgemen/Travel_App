
import { View, Text, StyleSheet, Image } from 'react-native'
import Animated, { FadeInRight } from 'react-native-reanimated'
import { borderRadius, colors, elevation, fonts, spaces } from '../../../constands'
import CircleTouchableIcon from '../../customButtons/CircleTouchableIcon'
import { notesIcon } from '../../../assets'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { fetchLocationImg } from '../../../utils/scanRoute'
import { useRouteStore } from '../../../managments'

const RouteDetailSubCard = ({route,index}) => {

  const setSelectPlace = useRouteStore(state => state.setSelectPlace)
  const [imgUrl,setImgUrl] = useState("https://picsum.photos/200")
  const handleCart = (placeData) => {
        setSelectPlace(placeData)
        router.push("/route/placeDetail")
  }

  useEffect(() => {
          const fetchImg = async () => {
             const img = await fetchLocationImg(route.name)
             setImgUrl(img)
          } 

          fetchImg()
  },[])
  

  return (
                    <Animated.View
                      entering={FadeInRight.delay(400 + index * 200).duration(1000)}
                      style={styles.card}
                     >
                     <View style={styles.imgContainer}>
                      <Image style={styles.img} source={{uri:imgUrl}} />
                      <View style={{width:"100%",height:"35",position:"absolute",bottom:0,left:0,zIndex:50,backgroundColor:"rgba(255,255,255,.7)"}}>
                         <Text numberOfLines={1} style={styles.imgText}>{route.name}</Text>
                      </View>
                     </View>
                     <View style={styles.detailContainer}>
                       <Text style={{fontSize:fonts.smallMidFontSize-3,fontWeight:fonts.middleFontWeight,marginLeft:spaces.middle}}>{route.type.charAt(0).toUpperCase()+route.type.substring(1)}</Text>
                       <Text style={{fontSize:fonts.smallMidFontSize-3,fontWeight:fonts.middleFontWeight,marginLeft:spaces.middle}}>{route.score}</Text>
                     </View>
                     <CircleTouchableIcon iconWrapperStyle={{alignSelf:"flex-end",marginRight :3,marginBottom:2}} icon={notesIcon} onPress={() => handleCart({...route,imgUrl:imgUrl})} />
                    </Animated.View>
  )
}

const styles = StyleSheet.create({
    card: {
     backgroundColor: colors.lightGray,
     height: 220,
     width: 220,
     borderRadius: borderRadius.highx2Radius,
     marginHorizontal: spaces.middle,
     justifyContent: "space-between",
     overflow:"hidden"
          },
    imgContainer : {
    height:"50%",width:"100%",borderBottomLeftRadius:borderRadius.highRadius,borderBottomRightRadius:borderRadius.highRadius,backgroundColor:colors.lightGray,elevation:elevation.middleShadow,overflow:"hidden",position:"relative"
                   },
    img : {
       width:"100%",height:"100%",resizeMode:"cover"
    }   ,            
    imgText : {
        fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight,position:"absolute",bottom:spaces.small,left:spaces.middle,color:colors.primary
    },            
    detailContainer : {
     width:"100%",height:"30%",justifyContent:"space-evenly"
                   }
})

export default RouteDetailSubCard