
import {StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { borderRadius, colors, elevation, fonts, spaces } from '../../../constands/appConstand'


const GuideCard = ({type,time,activities}) => {
  const {name,details,location,cost,address,popularity} =activities[0]  
  return (
     <View style={styles.wrapper}>
                                      <View style={styles.headerStyle}>
                                         <View style={styles.headerTitlesWrapper}>
                                             <Text style={styles.title}>📌 {type}</Text>
                                             <Text style={{fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight,color:colors.lightGray,flexGrow:1}}>⏱ {time}</Text>
                                         </View>
                                         <Text style={styles.subtitle}>📋 {name}</Text>
                                      </View>
                                      <View style={{height:50,justifyContent:"center"}}>
                                        <Text style={styles.subtitle} numberOfLines={3}>✏️ {details}</Text>
                                      </View>
                                      <View style={{paddingVertical:spaces.small,justifyContent:"space-evenly",flex:1}}>
                                       <Text style={styles.subtitle}>📍 {location}</Text>
                                       <Text style={styles.subtitle}>🗺️ {address}</Text>
                                       <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
                                         <Text style={styles.subtitle}>💵 {parseInt(cost) === 0 ? "Free" : cost}$</Text>  
                                         <Text style={styles.subtitle}>🔥{popularity}</Text>
                                       </View>
                                       
                                      </View>                                     
     </View>
  )
}

export default GuideCard

const styles = StyleSheet.create({
     wrapper : {
     borderColor:colors.gray,borderWidth:2, height:225,backgroundColor:colors.background,elevation:elevation.middleShhadow,
     borderRadius:borderRadius.middleRadius,padding:spaces.middle
     },
     headerStyle:{
        marginBottom:spaces.middle,gap:spaces.small
     },
     headerTitlesWrapper : {
        flexDirection:"row",alignItems:"center"
     },
     title:{
       fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight,width:"70%"
     },
     subtitle:{
        fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight
     }
})