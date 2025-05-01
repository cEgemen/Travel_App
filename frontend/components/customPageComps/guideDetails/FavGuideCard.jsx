
import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { borderRadius, colors, elevation, fonts, spaces } from '../../../constands'
import dayjs from 'dayjs';
import { router } from 'expo-router';

const FavGuideCard = ({guide}) => {
  const {metadata,createDate,id} = guide;
  const {budgetClass,city,country,lastDate,startDate,totalDays,totalNights,travelType} = metadata 
  const format =  'DD/MM/YYYY'
  const dateFormat = (date) => {
           const newDate = dayjs(date).format(format)
           return newDate;
                               }
  const handlePress = () => {
      router.push("/"+id)
  }                            
  return (
   <View style={{justifyContent:"flex-end",height:80,paddingHorizontal:spaces.small}}> 
     <Text style={styles.iconStyle}>📌</Text>
     <Pressable onPress={handlePress} style={styles.wrapper}>
          <View style={styles.topDetailWrapper}>
           <Text numberOfLines={1} style={styles.title}>📍{city},{country}</Text>
          </View>
          <View style={styles.detailWrapper}>
             <Text style={styles.detailText}>💾 {dateFormat(createDate)}</Text>
             <Text style={styles.detailText}>{travelType}</Text>          
          </View>
    </Pressable>
   </View> 
   
  )
}

export default FavGuideCard

const styles = StyleSheet.create({
        wrapper : {
            width:"100%",borderRadius:borderRadius.middleRadius,borderColor:colors.gray,borderWidth:2,gap:spaces.small,elevation:elevation.middleShhadow,backgroundColor:colors.background,padding:spaces.small,paddingVertical:spaces.middle
        },
        topDetailWrapper:{
            flexDirection:"row",justifyContent:"space-between",alignItems:"center"
        },
        iconStyle:{
          width:25,height:25,textAlign:"center",tintColor:colors.backgroundDark,position:"absolute",right:-5,top:4,zIndex:2
        },
        detailWrapper:{
            flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:spaces.small
        },
        title:{
           fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight,flex:1
        },
        detailText: {
           fontSize:fonts.smallFontSize-3,fontWeight:fonts.middleFontWeight,color:colors.gray
        }
})