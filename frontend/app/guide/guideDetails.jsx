
import { ScrollView,FlatList, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { borderRadius, colors, fonts, spaces } from '../../constands/appConstand'
import useGuideStore from '../../managments/guideStore'
import { Stack } from 'expo-router'
import leftArrowIcon from "../../assets/icons/left_arrow.png"
import TouchableIcon from '../../components/customButtons/TouchableIconButton'
import notesIcon from "../../assets/icons/notes.png"
import DaysScroll from '../../components/customPageComps/guideDetails/DaysScroll'
import GuideCard from '../../components/customPageComps/guideDetails/GuideCard'

const GuideDetails = () => {
    const guide = useGuideStore(state => state.guide)
    const [currentDay , setCurrentDay] = useState(0)
    const test =  {"itinerary": [{"date": "03/03/2025", "day": 1, "theme": "Cultural Trip", "timeline": [{
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
     },]}], "metadata": {"currency": "$/€/₺", "emergencyContacts": ["local police: 155", "tourist hotline: 444 0 863"], "endDate": "03/03/2025", "location": "London, Greater London", "startDate": "03/03/2025", "totalDays": 1, "totalNights": 1}}
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
              <DaysScroll currentDay={currentDay + 1} totalDays={test.itinerary.length} onPress={handleDay} wrapperStyle={{marginBottom:spaces.high}} />
              <FlatList
                  style={{}}
                  contentContainerStyle = {{}}
                  keyExtractor={(item,index) => index}
                  data={test.itinerary[currentDay].timeline}
                  ListHeaderComponentStyle={{marginBottom:spaces.middle}}
                  ListHeaderComponent={() => {
                       const {date} = test.itinerary[currentDay]
                       return <View style={{alignItems:"center"}}>
                                <Text style={{fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight,color:colors.lightGray}}>{date}</Text>
                              </View>
                  }}
                  renderItem={({item,index}) => {
                       const {type,time,activities} = item
                       return <GuideCard type={type} time={time} activities={activities} />
                  }}
               />
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