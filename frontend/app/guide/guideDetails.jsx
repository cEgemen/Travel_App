import { ScrollView,FlatList, StyleSheet, Text, View, Image, Pressable, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, fonts, spaces, title } from '../../constands'
import {useGuideStore,useUserStore} from '../../managments'
import { router, Stack } from 'expo-router'
import leftArrowIcon from "../../assets/icons/left_arrow.png"
import {DaysScroll,GuideCard, SquareButton, StackHeader} from '../../components'
import bookmarkIcon from "../../assets/icons/bookmark.png"
import bookmark2Icon from "../../assets/icons/bookmark2.png"
import { useDeleteFavGuide, useSaveFavGuide } from '../../hooks/query/queryHook'
import { useQueryClient } from '@tanstack/react-query'

const GuideDetails = () => {
    const {guide,resGuideInfo,resGuide} = useGuideStore(state => state)
    const {id,token} = useUserStore(state => state.user)
    const [currentDay , setCurrentDay] = useState(0)
    const client = useQueryClient()
    const [isSaved , setIsSaved] = useState(false)
    const guideData =  {favOwner:id,...guide}
    const errorCall = ()=> {ToastAndroid.showWithGravity("An Error Occurrent.Plase Try Again.",ToastAndroid.LONG,ToastAndroid.BOTTOM)}
    const succesCall = (mod)=>{
     const isSaveSucces = mod === 1
     setIsSaved(isSaveSucces)
     }
    const {mutate:saveMutate,isPending:savePending,isError,isSuccess,data} = useSaveFavGuide(guideData,client,token,()=>{
        succesCall(1)
    },errorCall)
    const guideID = data === undefined ? "" : data.ok_data.data
    const {mutate:deleteMutate , isPending:deletePending} = useDeleteFavGuide(guideID,client,token,()=>{succesCall(2)},errorCall)
 
    const handleDay = (newDay) => {
          setCurrentDay(newDay)
    }

    const handleBackPress = () => {
         resGuideInfo();
         resGuide();
         router.replace("/home")
    }
 
    const handleSave = isSaved ? deleteMutate : saveMutate 

    return (
      <SafeAreaView style={styles.safeView}>
          
            <ScrollView style={styles.scrollStyle} showsVerticalScrollIndicator={false}>
               <StackHeader LeftComp={() =>  <SquareButton onClick={handleBackPress} icon={leftArrowIcon} contentStyle={styles.headerIconStyle} /> } RightComp={() => <Pressable onPress={handleSave} >
                                  {(savePending || deletePending)  ? <ActivityIndicator size={"small"} color={colors.primary} />  :  <Image style={{...styles.markIconStyle,tintColor:isSaved ? colors.primary : colors.backgroundDark}} source={isSaved ? bookmark2Icon : bookmarkIcon} />} 
                                </Pressable> } title={guide.metadata.travelType}  />
              <View style={styles.headerContainer}>  
                 <Text numberOfLines={1} style={{...title,color : colors.text,marginBottom:spaces.small,flex:1}}>📍{guide.metadata.city},{guide.metadata.country}</Text>
                 <Text style={{color:colors.gray,fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight}}>🌞 {guide.metadata.totalDays} 🌚 {guide.metadata.totalNights}</Text>
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
                                <Text style={{fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight,color:colors.gray}}>{date}</Text>
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
      }
})