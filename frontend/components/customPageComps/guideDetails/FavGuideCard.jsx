
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { borderRadius, colors, elevation, fonts, spaces } from '../../../constands/appConstand'
import dayjs from 'dayjs';
import rightArrowShortIcon from "../../../assets/icons/right_arrow_short.png"
import { router } from 'expo-router';

const FavGuideCard = ({guide}) => {
  const {metadata,createDate,id} = guide;
  const {totalDays,totalNights,location} = metadata 
  const format =  'DD/MM/YYYY'
  const dateFormat = (date) => {
           const newDate = dayjs(date).format(format)
           return newDate;
                               }
  const handlePress = () => {
      router.push("/"+id)
  }                            
  return (
    <Pressable onPress={handlePress} style={styles.wrapper}>
          <View style={styles.topDetailWrapper}>
           <Text numberOfLines={1} style={styles.title}>📍{location}</Text>
           <Image style={styles.iconStyle} source={rightArrowShortIcon} />
          </View>
          <View style={styles.detailWrapper}>
             <Text style={styles.detailText}>📆 {dateFormat(createDate)}</Text>
             <Text style={styles.detailText}>🌞 {totalDays} 🌚 {totalNights}</Text>
          </View>
    </Pressable>
  )
}

/* 
[{"createDate": "2025-03-05T14:16:43.256Z", "id": "67c85ccb4dbc28712c9e9987", "metadata": {"currency": "$/€/₺", "emergencyContacts": [Array], "endDate": "05/03/2025", "location": "London, United Kingdom", "startDate": "05/03/2025", "totalDays": 1, "totalNights": 1}, "updateDate": "2025-03-05T14:16:43.256Z"}]
*/

export default FavGuideCard

const styles = StyleSheet.create({
        wrapper : {
            width:"100%",borderRadius:borderRadius.middleRadius,borderColor:colors.lightGray,borderWidth:2,padding:spaces.middle,gap:spaces.small,elevation:elevation.middleShhadow,backgroundColor:colors.background
        },
        topDetailWrapper:{
            flexDirection:"row",justifyContent:"space-between",alignItems:"center"
        },
        iconStyle:{
          width:25,height:25,resizeMode:"contain",tintColor:colors.backgroundDark,flexWrap:1
        },
        detailWrapper:{
            flexDirection:"row",justifyContent:"space-between",alignItems:"center"
        },
        title:{
           fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight,flex:1
        },
        detailText: {
           fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight,color:colors.lightGray
        }
})