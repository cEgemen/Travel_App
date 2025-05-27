
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { borderRadius, colors, elevation, fonts, spaces } from '../../../constands'
import dayjs from 'dayjs'
import { router } from 'expo-router'

const FavPlaceCard = ({placeData}) => {
  const {imgUrl,name,location,id:placeId,updateDate} = placeData
  console.log("placeId : ",placeId)
    const format =  'DD/MM/YYYY'
    const dateFormat = (date) => {
             const newDate = dayjs(date).format(format)
             return newDate;
                                 }
            
  const handlePressCard = () => {
     router.push("/"+placeId)
  }                               
                                 
  return (
   <View style={styles.cardContainer}>
    <Text style={{position:"absolute",top:0,right:0,fontSize:fonts.smallFontSize,zIndex:5}}>📌</Text>
    <Pressable style={styles.cardWrapper} onPress={handlePressCard}>
      <View style={styles.imgContainer} >
         <Image source={{uri:imgUrl}} style={styles.imgStyle} />
      </View>
      <View style={styles.detailContainer} >
         <View style={styles.upDetailContainer}>
            <Text style={[{flex:1},styles.detailTextStyle]} numberOfLines={1} >{name}</Text>
            <Text style={styles.detailTextStyle} >{dateFormat(updateDate)}</Text>
         </View>
         <View style={styles.downDetailContainer}>
            <Text style={styles.detailTextStyle} numberOfLines={1}>{location}</Text>
         </View>
      </View>
    </Pressable>
   </View> 
    
  )
}

export default FavPlaceCard

const styles = StyleSheet.create({
     cardContainer : {
       padding:spaces.middle
     },
     cardWrapper : {
         width:"100%",backgroundColor:colors.background,borderRadius:borderRadius.middleRadius,borderColor:colors.gray,borderWidth:2,elevation:elevation.middleShadow,flexDirection:"row",columnGap:spaces.small,padding:spaces.small
     },
     imgContainer : {
          width:100,height:60,overflow:"hidden",borderRadius:borderRadius.middleRadius
     },
     imgStyle : {
        width:"100%",height:"100%",resizeMode:"cover"
     },
     detailContainer : {
       flex:1,justifyContent:"space-between"
     },
     upDetailContainer : {
       flexDirection:"row",columnGap:spaces.small,justifyContent:"space-between"
     },
     downDetailContainer : { 
        alignItems:"center"
     },
     detailTextStyle : {
        fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight,color:colors.darkGray
     }
})