
import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { borderRadius, colors, elevation, fonts, spaces } from '../../../constands'
import { dottedWayIcon } from '../../../assets'

const RouteDetailMainCard = ({routeData}) => {
  const {cost , duration , distance , startLocName , destinationLocName , optionRoute } = routeData;  
  return (
    <View style={styles.cardWrapper}>
      <Text style={{position:"absolute",top:-16,right:-12,fontSize:fonts.smallMidFontSize}}>📌</Text>
      <View style={styles.headerWrapper}>
       <Text style={styles.cardTitle}>{optionRoute}</Text> 
      </View>
      <View style= {styles.contentWrapper}>
        <Text style={[styles.cardSubTitle,{fontSize:fonts.smallMidFontSize,fontWeight:fonts.smallFontWeight,marginBottom:spaces.middle}]}>📍 {startLocName}</Text>
        <View style={{flexDirection:"row"}}>
         <Image style={styles.locImgStyle} source={dottedWayIcon} /> 
         <View style={styles.detailWrapper}>
          <Text style={styles.cardSubTitle}>💰 {cost}$</Text>
          <Text style={styles.cardSubTitle}>⏱️ {duration} mins.</Text>
          <Text style={styles.cardSubTitle}>🛤️ {distance} km.</Text>
         </View>
        </View>
      <Text style={[{fontSize:fonts.smallMidFontSize,fontWeight:fonts.smallFontWeight,marginTop:spaces.middle}]}>📍 {destinationLocName}</Text>
     </View>
    </View>
  )
}

export default RouteDetailMainCard

const styles = StyleSheet.create({
     cardWrapper : {
         width:"100%",
         height:250,
         padding:spaces.middle,
         borderRadius:borderRadius.highRadius,
         backgroundColor:colors.lightGray,
         elevation:elevation.smallShadow
     },
     headerWrapper : {
         
     },
     cardTitle : {
        fontSize:fonts.middleFontSize,
        fontWeight:fonts.middleFontWeight,
        textAlign:"center"
     },
     cardSubTitle : {
         fontSize:fonts.smallFontSize,
         fontWeight:fonts.smallFontWeight
     },
     contentWrapper : {
       flex:1,justifyContent:"center"
    },
     locImgStyle : {
        width:40,height:60,resizeMode:"contain"
     },
     detailWrapper : {
         flex:1,
         flexDirection:"row",
         alignItems:"center",
         justifyContent:"space-around",
     }

})