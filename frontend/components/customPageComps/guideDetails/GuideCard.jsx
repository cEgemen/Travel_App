
import {Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { borderRadius, colors, elevation, fonts, spaces } from '../../../constands'
import {dottedWayIcon} from "../../../assets"

const GuideCard = ({dailyGuide}) => {
  const {time,activity,locationName,address,details,cost,popularity,duration,nextActivityTransition} = dailyGuide
  const {method,estimatedTime,nextLocation,nextAddress} = nextActivityTransition; 
  return (
     <View style={styles.wrapper}>
                                      <View style={styles.headerStyle}>
                                       <Text numberOfLines={1} style={styles.title}>📌 {activity}</Text>
                                       <View style={styles.headerTimeWrapper}>
                                          <Text style={styles.minTitle}>⏱ {time}</Text>
                                          <Text style={styles.minTitle}>⏱ {duration}</Text>  
                                       </View>
                                      </View>
                                      <View style={styles.detailsWrapper}>
                                        <Text style={styles.subtitle} numberOfLines={3}>🗞️ {details}</Text>
                                      </View>  
                                      <View style={styles.locationWrapper}>
                                        <View>
                                             <Text numberOfLines={1} style={styles.locationTitle}>📍{locationName}</Text>
                                             <Text numberOfLines={1} style={styles.locationSubTitle}>{address}</Text>
                                        </View>
                                        <View style={styles.locationDetailWrapper}>
                                             <Image style={styles.locationDetailIcon} source={dottedWayIcon}/> 
                                             <View>
                                                 <Text style={styles.locationSubTitle}>- {method}</Text>
                                                 <Text style={styles.locationSubTitle}>- {estimatedTime}</Text>
                                             </View>
                                        </View>
                                        <View>
                                             <Text numberOfLines={1} style={styles.locationTitle}>📍{nextLocation}</Text>
                                             <Text numberOfLines={1} style={styles.locationSubTitle}>{nextAddress}</Text>
                                        </View>
                                      </View>            
                                      <View style={{flexDirection:"row",justifyContent:"space-evenly",alignItems:"center"}}>
                                             <Text style={styles.minTitle}>🌟 {popularity}</Text>
                                             <Text style={styles.minTitle}>💸 {cost} $</Text>
                                      </View>                         
     </View>
  )
}

export default GuideCard

const styles = StyleSheet.create({
     wrapper : {
     borderColor:colors.gray,borderWidth:2,backgroundColor:colors.background,elevation:elevation.middleShhadow,
     borderRadius:borderRadius.middleRadius,padding:spaces.middle
     },
     headerStyle:{
       marginBottom:spaces.middle,gap:spaces.small
     },
     title:{
      fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight,flex:1
    },
     headerTimeWrapper : {
        flexDirection:"row",alignItems:"center",justifyContent:"space-around"
     },
     minTitle:{
       fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight,color:colors.gray
     },
     subtitle:{
        fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight,
     },
     detailsWrapper:{
        paddingHorizontal:spaces.small,marginBottom:spaces.middle
     },
     locationWrapper:{
       marginBottom:spaces.middle,gap:spaces.small
     },
     locationDetailWrapper:{
       flexDirection:"row",alignItems:"center"
     },
     locationDetailIcon:{
       width:40,height:40,resizeMode:"contain"
     },
     locationTitle:{
      fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight
     },
     locationSubTitle:{
      fontSize:fonts.smallFontSize-3,fontWeight:fonts.middleFontWeight,color:colors.gray,paddingLeft:spaces.high
     }
})