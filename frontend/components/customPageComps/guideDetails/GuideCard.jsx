
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import bookmarkIcon from "../../../assets/icons/bookmark.png"
import { borderRadius, colors, elevation, fonts, spaces } from '../../../constands/appConstand'


const GuideCard = ({type,time,activities}) => {
  const {name,details,location,cost,address} =activities[0]  
  return (
     <View style={styles.wrapper}>
                                      <View style={styles.headerStyle}>
                                         <View style={styles.headerTitlesWrapper}>
                                             <Text style={styles.title}>📌 {type}</Text>
                                             <Text style={styles.subtitle}>📋 {name}</Text>
                                         </View>
                                           <Pressable>
                                             <Image style={styles.markIconStyle} source={bookmarkIcon} />
                                           </Pressable>
                                      </View>
                                      <View style={{height:50,justifyContent:"center"}}><Text numberOfLines={3}>✏️ {details}</Text></View>
                                      <Text>📍 {location}</Text>
                                      <Text>🗺️ {address}</Text>
                                      <View style={{flexDirection:"row",justifyContent:"space-around",marginVertical:"auto"}}> 
                                        <Text>💵 {cost}</Text>
                                        <Text>⏱ {time}</Text>
                                      </View>
                                      
                                      
     </View>
  )
}
/*
 {
               "type": "Morning Routine",
               "time": "07:30-08:00",
               "activities": [
                  {
                     "name": "Wake-up & Breakfast",
                     "location": "Hotel Restaurant",
                     "details": "Enjoy a traditional English breakfast spread.",
                     "duration": "30 mins",
                     "cost": "Included in hotel stay",
                     "address": "Your hotel’s restaurant"
                  }
               ]
            }
*/

export default GuideCard

const styles = StyleSheet.create({
     wrapper : {
     borderColor:colors.gray,borderWidth:2, height:225,backgroundColor:colors.background,elevation:elevation.middleShhadow,
     borderRadius:borderRadius.middleRadius,padding:spaces.middle
     },
     headerStyle:{
         flexDirection:"row",justifyContent:"space-between",marginBottom:spaces.middle
     },
     headerTitlesWrapper : {
        gap:spaces.small
     },
     title:{
       fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight
     },
     subtitle:{
        fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight
     },
     markIconStyle:{
        width:25,height:25,resizeMode:"contain",tintColor:colors.backgroundDark
     }
})