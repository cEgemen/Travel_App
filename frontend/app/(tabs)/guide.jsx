
import { StyleSheet,ScrollView, Text,FlatList  } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { colors, spaces } from '../../constands/appConstand'
import { router, Stack } from 'expo-router'
import AutoCompletSearchInput from '../../components/customPageComps/home/AutoCompletSearchInput'
import useGuideStore from '../../managments/guideStore'

const Guide = () => {
  const setGuideInfo = useGuideStore(state => state.setGuideInfo)
  const selectLocation = (location) => {
          setGuideInfo({type:"location",data:location})
          router.push("/guide/selectTravelDates")
    }

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
             <FlatList 
                
             />
      </SafeAreaView>
  )
}

export default Guide

const styles = StyleSheet.create({
     safeAreaStyle : {
         flex:1,backgroundColor:colors.background,paddingVertical:spaces.middle,paddingHorizontal:spaces.high
     },
     
})