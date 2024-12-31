

import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { borderRadius, colors, fonts, shadows, spaces } from '../../../constands/appConstand'
import CustomTouchableButton from '../../customButtons/customTouchableButton'
import { getPlaceImgRef , getPlaceImg, GetPlaceImg} from '../../../confs/googleAPIService'

const HotelCard = ({hotel}) => {
   const [hotelState,setHotelState] = useState({isLoading : true,hotelImageRef : null})
   
   const getHotelImg  = async () => {
     const hotelImageRef = await getPlaceImgRef(hotel.hotelName)
     setHotelState(oldState => {
           return {...oldState,isLoading:false,hotelImageRef}
     })  
   }

   useEffect(()=>{
           getHotelImg()
   },[]) 

  return (
    <View style={styles.cardWrapper}>
         {hotelState.isLoading ? 
         <ActivityIndicator size="large"  /> :
         <GetPlaceImg style={styles.cardImage} imgRef={hotelState.hotelImageRef} />
        }       
       <Text style={styles.hotelName}>📌 {hotel.hotelName}</Text>
       <View style={styles.cardDetailContainer}>
       <View style={styles.cardDetailWrapper}>
        <Text style={styles.hotelPrice}>💸 {hotel.price}</Text>
        <Text style={styles.hotelRate}>⭐ {hotel.rating}</Text>
       </View>
       <CustomTouchableButton textStyle={styles.btnText} buttonStyle={styles.btn} text={"🗺️"} />
       </View>
    </View>
  )
}

export default HotelCard

const styles = StyleSheet.create({
     cardWrapper : {
        width:250,backgroundColor:colors.secondary,marginRight:spaces.small,
        borderRadius:borderRadius.highRadius,overflow:"hidden"
      },
     cardImage : {
         width:"100%",height:100,resizeMode:"cover",backgroundColor:"white"
     },
     hotelName : {
         fontSize:fonts.smallMidFontSize,fontWeight:fonts.smallFontWeight,color:colors.text,marginBottom:spaces.middle,textAlign:"justify"
     },
     cardDetailContainer:{
         flexDirection:"row",width:"100%",alignItems:"center",justifyContent:"space-between",padding:spaces.small,
     },
     cardDetailWrapper:{
       display:"flex",gap:spaces.small,
     },
     hotelPrice : {
         fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight,color:colors.text
     },
     hotelRate : {
         fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight,color:colors.text
     },
     btn:{
          width:50,height:50,borderRadius:borderRadius.circleRadius(50),backgroundColor:colors.text
     },
     btnText:{
          fontWeight:fonts.middleFontWeight,fontSize:fonts.middleFontSize
     }
})