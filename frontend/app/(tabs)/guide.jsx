
import { StyleSheet,FlatList, ActivityIndicator, View  } from 'react-native'
import React from 'react'
import {  SafeAreaView } from 'react-native-safe-area-context'
import { colors, spaces } from '../../constands/appConstand'
import { router, Stack } from 'expo-router'
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

   const {isLoading,data} = useQuery({
       queryKey:["favorites"],
       queryFn:() => getFavs()
   })  
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
             {isLoading  ?  
              <View style={{flex:1,justifyContent:"center"}}>
                <ActivityIndicator size={"large"} color={colors.primary} />
              </View> : 
              <FlatList 
                   data={data}
                   keyExtractor={(item,index) => index}
                   contentContainerStyle={styles.flatContainerStyle}
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