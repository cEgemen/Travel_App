
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { borderRadius, colors, fonts, spaces } from '../../../constands'
import { notesIcon } from '../../../assets'
import { useEffect, useState } from 'react'
import { fetchLocationImg, getFallbackImageForCategory } from '../../../utils/scanRoute'
import { useLocationStore, useRouteStore } from '../../../managments'
import { router } from 'expo-router'


const PopularPlaceCard = ({place,index}) => {
  const filters = useLocationStore(state => state.filters)
  const [placeImgUrl,setPlaceImgUrl] = useState(null)
  const setSelectPlace = useRouteStore(state => state.setSelectPlace)
  console.log("place : ",place)
  const {name,type} = place
 
  useEffect(() => {
          const fetchImg = async () => {
               const placeImg = await fetchLocationImg(name,filters.places)
               setPlaceImgUrl(placeImg)
          }    

           fetchImg()

  } , [])

  const handlePlaceDetail = () => {
       setSelectPlace({...place,imgUrl:placeImgUrl})
       router.push("/route/placeDetail")
  }

  const  tmp = "city_gate".split("_").join(" ")
  console.log("tmp : ",tmp)
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.imgWrapper}>
           <View style={styles.numberWrapper}>
             <Text>{index + 1}</Text>
           </View>
           {placeImgUrl ? <Image style={styles.img} source={placeImgUrl === -1 ? getFallbackImageForCategory(filters.places[0]) : {uri:placeImgUrl}} /> : <ActivityIndicator color={colors.primary} size={"large"} /> }
      </View>
      <View style={styles.contentWrapper}>
            <View style={styles.subContentWrapper}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.subTitle} >{type.split("_").join(" ").substring(0,1).toUpperCase()+type.split("_").join(" ").substring(1)}</Text>
            </View>
            <Pressable style={styles.imgContainer} onPress={handlePlaceDetail}>
                <Image source={notesIcon} style={styles.icon} />
            </Pressable>
      </View>
    </View>
  )
}

export default PopularPlaceCard

const styles = StyleSheet.create({
    
     cardWrapper : {
         width:"100%",backgroundColor:colors.lightGray,height:180,borderRadius:borderRadius.middleRadius,
         overflow:"hidden"
     },
     imgWrapper : {
         width:"100%",height:"60%",justifyContent:"center",alignItems:"center"
     },
     img : {
       width:"100%",height:"100%",resizeMode:"cover"
     },
     contentWrapper : {
           flex:1,flexDirection:"row",justifyContent:"space-between",alignItems:"flex-end",padding:spaces.small
     },
     subContentWrapper : { 
      height:"100%",flex:17,justifyContent:"space-around"
     },
     imgContainer:{
         width:40,height:40,backgroundColor:colors.background,justifyContent:"center",alignItems:"center",borderRadius:borderRadius.smallRadius 
     },
     numberWrapper : {
      width:30,height:30,position:"absolute",right:spaces.small,top:spaces.small,zIndex:2,
      borderColor:colors.backgroundDark,borderWidth:1,backgroundColor:colors.lightGray,
      borderRadius:borderRadius.circleRadius(30),justifyContent:"center",alignItems:"center"
       },
     icon : {
           width:30,height:30,resizeMode:"contain",tintColor:colors.darkGray
     },
     title : {
        fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight
     },
     subTitle : {
        fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight,color:colors.primary
     }

})