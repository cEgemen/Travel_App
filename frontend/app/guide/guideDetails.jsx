
import { ScrollView,FlatList, StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, fonts, spaces } from '../../constands/appConstand'
import useGuideStore from '../../managments/guideStore'
import { router, Stack } from 'expo-router'
import leftArrowIcon from "../../assets/icons/left_arrow.png"
import TouchableIcon from '../../components/customButtons/TouchableIconButton'
import DaysScroll from '../../components/customPageComps/guideDetails/DaysScroll'
import GuideCard from '../../components/customPageComps/guideDetails/GuideCard'
import bookmarkIcon from "../../assets/icons/bookmark.png"
import bookmark2Icon from "../../assets/icons/bookmark2.png"
import useUserStore from '../../managments/userStore'
import { useSaveFavGuide } from '../../hooks/query/queryHook'
import { useQueryClient } from '@tanstack/react-query'

const GuideDetails = () => {
    const {guide,resGuideInfo,resGuide} = useGuideStore(state => state)
    const {id,token} = useUserStore(state => state.user)
    const [currentDay , setCurrentDay] = useState(0)
    const client = useQueryClient()
    
    const guideData =  {favOwner:id,...guide}
    const {mutate,isPending,isError,isSuccess} = useSaveFavGuide(guideData,client,token)
 
    const handleDay = (newDay) => {
          setCurrentDay(newDay)
    }

    const handleBackPress = () => {
         resGuideInfo();resGuide();
         router.replace("/home")
    }

    return (
      <SafeAreaView style={styles.safeView}>
           <Stack.Screen
                options={{
                     headerTransparent:false,
                     headerShown:true,
                     headerShadowVisible:false,
                     title:guide.metadata.travelType,
                     headerTitleAlign:"center",
                     headerLeft:() => {
                          return <TouchableIcon onPress={handleBackPress} icon={leftArrowIcon} iconStyle={styles.headerIconStyle} />
                     },
                     headerRight:() => {
                          return <Pressable onPress={mutate} >
                                  {isPending  ? <ActivityIndicator size={"small"} color={colors.primary} />  :  <Image style={{...styles.markIconStyle,tintColor:isSuccess ? colors.primary : colors.backgroundDark}} source={isSuccess ? bookmark2Icon : bookmarkIcon} />} 
                                </Pressable>
                     }
                }}
            />
            <ScrollView style={styles.scrollStyle} showsVerticalScrollIndicator={false}>
              <View style={styles.headerContainer}>  
                 <Text numberOfLines={1} style={styles.headerTitle}>📍{guide.metadata.city},{guide.metadata.country}</Text>
                 <Text style={{color:colors.lightGray,fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight}}>🌞 {guide.metadata.totalDays} 🌚 {guide.metadata.totalNights}</Text>
              </View>
              <DaysScroll currentDay={currentDay + 1} totalDays={guide.itinerary.length} onPress={handleDay} wrapperStyle={{marginBottom:spaces.high}} />
              <FlatList
                  style={{paddingBottom:spaces.high}}
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
                       return <GuideCard dailyGuide={item} /> 
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
})