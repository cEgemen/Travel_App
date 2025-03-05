
import { StyleSheet,FlatList, ActivityIndicator, View, Text  } from 'react-native'
import React from 'react'
import {  SafeAreaView } from 'react-native-safe-area-context'
import { colors, spaces } from '../../constands/appConstand'
import { router, Stack, Tabs } from 'expo-router'
import AutoCompletSearchInput from '../../components/customPageComps/home/AutoCompletSearchInput'
import useGuideStore from '../../managments/guideStore'
import { useQuery } from '@tanstack/react-query'
import useUserStore from '../../managments/userStore'
import { BASE_URL } from '../../secret'
import FavGuideCard from '../../components/customPageComps/guideDetails/FavGuideCard'

const Guide = () => {
  const setGuideInfo = useGuideStore(state => state.setGuideInfo)
  const {id,token} = useUserStore(state => state.user)

  const selectLocation = (location) => {
          setGuideInfo({type:"location",data:location})
          router.push("/guide/selectTravelDates")
    }

   const getFavs = async () => {
       const result = await fetch(BASE_URL+"favorite/user/"+id,{
           method:"GET",
           headers:{
            "Content-Type":"",
            "Authorization":"Bearer "+token
           },
       })
       const {ok_data} = await result.json()
       return ok_data.data;
   } 
/* 
   const {isLoading,data} = useQuery({
       queryKey:["favorites"],
       queryFn:() => getFavs()
   })   */

   const test = [{"createDate": "2025-03-05T14:16:43.256Z", "id": "67c85ccb4dbc28712c9e9987", "metadata": {"currency": "$/€/₺", "emergencyContacts": [Array], "endDate": "05/03/2025", "location": "London, United Kingdom", "startDate": "05/03/2025", "totalDays": 1, "totalNights": 1}, "updateDate": "2025-03-05T14:16:43.256Z"}]

  return (
      <SafeAreaView style={styles.safeAreaStyle}>
          <Stack.Screen 
             options={{
                 headerShadowVisible:false,
                 headerTitleAlign:"center",
                 title:"Trip Guide"
             }}
          />
             <AutoCompletSearchInput onPress={(data) => {
                selectLocation(data)
             }} focusColor={colors.primary} placeholder='Enter Location ...' searchWrapperStyle={{marginBottom:spaces.small}} />
             {false  ?  
              <View style={{flex:1,justifyContent:"center"}}>
                <ActivityIndicator size={"large"} color={colors.primary} />
              </View> : 
              <FlatList 
                   data={test}
                   keyExtractor={(item,index) => index}
                   contentContainerStyle={styles.flatContainerStyle}
                   ListHeaderComponent={() => {
                      return <View style={{marginBottom:spaces.small,marginTop:spaces.high}}>
                               <Text>Favorite Guides</Text>
                              </View>
                   }}
                   renderItem={({item,index}) => {
                        return <FavGuideCard guide={item} />
                   }}
              />}
      </SafeAreaView>
  )
}

export default Guide

const styles = StyleSheet.create({
     safeAreaStyle : {
         flex:1,backgroundColor:colors.background,paddingVertical:spaces.middle,paddingHorizontal:spaces.high
     },
     flatContainerStyle:{
         gap:spaces.middle
     }
})