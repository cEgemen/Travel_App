
import { ScrollView, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, fonts, spaces } from '../../constands/appConstand'
import useGuideStore from '../../managments/guideStore'
import { Stack } from 'expo-router'
import leftArrowIcon from "../../assets/icons/left_arrow.png"
import TouchableIcon from '../../components/customButtons/TouchableIconButton'
import notesIcon from "../../assets/icons/notes.png"
import DaysScroll from '../../components/customPageComps/guideDetails/daysScroll'

const GuideDetails = () => {
    const guide = useGuideStore(state => state.guide)
    const [currentDay , setCurrentDay] = useState(1)
    const test =  {"itinerary": [{"date": "03/03/2025", "day": 1, "theme": "Cultural Trip", "timeline": [Array]}], "metadata": {"currency": "$/€/₺", "emergencyContacts": ["local police: 155", "tourist hotline: 444 0 863"], "endDate": "03/03/2025", "location": "London, Greater London", "startDate": "03/03/2025", "totalDays": 1, "totalNights": 1}}
    console.log("guide : ",guide)
  
    const handleDay = (newDay) => {
          setCurrentDay(newDay)
    }

    return (
      <SafeAreaView style={styles.safeView}>
           <Stack.Screen
                options={{
                     headerTransparent:false,
                     headerShown:true,
                     headerShadowVisible:false,
                     title:"Trip Guide",
                     headerTitleAlign:"center",
                     headerLeft:() => {
                          return <TouchableIcon icon={leftArrowIcon} iconStyle={styles.headerIconStyle} />
                     },
                     headerRight:() => {
                          return <TouchableIcon icon={notesIcon} iconStyle={styles.headerIconStyle} />
                     }
                }}
            />
            <ScrollView style={styles.scrollStyle}>
              <View style={styles.headerContainer}>  
                 <Text numberOfLines={1} style={styles.headerTitle}>📍{test.metadata.location}</Text>
                 <Text style={styles.headerSubTitle}>Days</Text>
              </View>
              <DaysScroll currentDay={currentDay} totalDays={test.itinerary.length + 5} onPress={handleDay} />
            </ScrollView>
      </SafeAreaView>
  )
}

export default GuideDetails

const styles = StyleSheet.create({
      
      safeView : {
           flex:1
      },
      scrollStyle : {
         flexGrow:1,backgroundColor:colors.background ,padding:spaces.middle
      },
      headerIconStyle: {
       tintColor:colors.backgroundDark
      },
      headerContainer:{
         marginBottom:spaces.high,gap:spaces.small
      },
      headerTitle : {
          fontSize : fonts.middleFontSize , fontWeight : fonts.highFontWeight,color : colors.text,marginBottom:spaces.small
      },
      headerSubTitle : {
          fontSize:fonts.smallMidFontSize,fontWeight:fonts.smallFontSize,color:colors.lightGray,paddingHorizontal:spaces.middle
      }
})