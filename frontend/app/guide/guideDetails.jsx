
import { ScrollView,FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { borderRadius, colors, fonts, spaces } from '../../constands/appConstand'
import useGuideStore from '../../managments/guideStore'
import { router, Stack } from 'expo-router'
import leftArrowIcon from "../../assets/icons/left_arrow.png"
import TouchableIcon from '../../components/customButtons/TouchableIconButton'
import notesIcon from "../../assets/icons/notes.png"
import DaysScroll from '../../components/customPageComps/guideDetails/DaysScroll'
import GuideCard from '../../components/customPageComps/guideDetails/GuideCard'
import bookmarkIcon from "../../assets/icons/bookmark.png"
import { useMutation,useQueryClient } from '@tanstack/react-query'
import { saveFavGuide } from '../../utils/querys'
import useUserStore from '../../managments/userStore'
import { BASE_URL } from '../../secret'


const GuideDetails = () => {
    const {guide,resGuideInfo,resGuide} = useGuideStore(state => state)
    const {token,id} = useUserStore(state => state.user)
    const [isSave , setIsSave] = useState(false)
    const client = useQueryClient()

    const [currentDay , setCurrentDay] = useState(0)
    
    const handleDay = (newDay) => {
          setCurrentDay(newDay)
    }

    const handleBackPress = () => {
         resGuideInfo();resGuide();
         router.replace("/Home")
    }

    const saveFavorite = () => {
         const guideData = {favOwner:id,...guide}
         fetch(BASE_URL+"favorite/save",{
              body:JSON.stringify(guideData),
              method:"POST",
              headers:{
                 "Content-Type" : "application/json",
                 "Authorization":"Bearer "+token
              }
         }).then(res => res.json())
           .then(data => {
               setIsSave(true)
           })
           .catch(err => console.log("err : ",err))
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
                          return <TouchableIcon onPress={handleBackPress} icon={leftArrowIcon} iconStyle={styles.headerIconStyle} />
                     },
                     headerRight:() => {
                          return <TouchableIcon icon={notesIcon} iconStyle={styles.headerIconStyle} />
                     }
                }}
            />
            <ScrollView style={styles.scrollStyle} showsVerticalScrollIndicator={false}>
              <View style={styles.headerContainer}>  
                 <Text numberOfLines={1} style={styles.headerTitle}>📍{guide.metadata.location}</Text>
                 <Pressable onPress={saveFavorite} >
                  <Image style={{...styles.markIconStyle,backgroundColor:isSave ? colors.primary : colors.background}} source={bookmarkIcon} /> 
                 </Pressable>
              </View>
              <DaysScroll currentDay={currentDay + 1} totalDays={guide.itinerary.length} onPress={handleDay} wrapperStyle={{marginBottom:spaces.high}} />
              <FlatList
                  style={{}}
                  contentContainerStyle = {{gap:spaces.middle}}
                  keyExtractor={(item,index) => index}
                  data={guide.itinerary[currentDay].timeline}
                  ListHeaderComponentStyle={{marginBottom:spaces.middle}}
                  ListHeaderComponent={() => {
                       const {date} = guide.itinerary[currentDay]
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
         flexGrow:1,backgroundColor:colors.background ,
         paddingVertical:spaces.middle,paddingHorizontal:spaces.high
      },
      markIconStyle:{
         width:25,height:25,resizeMode:"contain",tintColor:colors.backgroundDark,flexGrow:1
      },
      headerIconStyle: {
       tintColor:colors.backgroundDark
      },
      headerContainer:{
         marginBottom:spaces.high,flexDirection:"row",alignItems:"center"
      },
      headerTitle : {
          fontSize : fonts.smallMidFontSize , fontWeight : fonts.highFontWeight,color : colors.text,marginBottom:spaces.small,flex:1
      },
      headerSubTitle : {
          fontSize:fonts.smallMidFontSize,fontWeight:fonts.smallFontSize,color:colors.lightGray,paddingHorizontal:spaces.middle
      }
})