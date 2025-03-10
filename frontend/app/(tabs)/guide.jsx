
import { StyleSheet,FlatList, ActivityIndicator, View, Text, Pressable, Image  } from 'react-native'
import React, { useState } from 'react'
import {  SafeAreaView } from 'react-native-safe-area-context'
import { colors, fonts, spaces } from '../../constands/appConstand'
import { router, Stack } from 'expo-router'
import AutoCompletSearchInput from '../../components/customPageComps/home/AutoCompletSearchInput'
import useGuideStore from '../../managments/guideStore'
import FavGuideCard from '../../components/customPageComps/guideDetails/FavGuideCard'
import downIcon from "../../assets/icons/downArrow.png"
import upIcon from "../../assets/icons/upArrow.png"
import { useGetOwnerFavGuides } from '../../hooks/query/queryHook'
import useUserStore from '../../managments/userStore'

const Guide = () => {
  const [orderState,setOrderState] = useState(1)  
  const setGuideInfo = useGuideStore(state => state.setGuideInfo)
  const {id,token} = useUserStore(state => state.user)
  const selectLocation = (location) => {
          setGuideInfo({type:"location",data:location})
          router.push("/guide/selectTravelDates")
    }

   const {data,isError,isLoading} = useGetOwnerFavGuides(id,orderState,token)

   const handleSort = (mod)=> {
       setOrderState(mod)
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
             { 
              <FlatList 
                   data={isLoading ? [""] : data.ok_data.data}
                   keyExtractor={(item,index) => index}
                   contentContainerStyle={[styles.flatContainerStyle,{flex:isLoading ? 1 : undefined}]}
                   ListHeaderComponent={() => {
                      return <View style={styles.flatHeaderWrapper}>
                               <Text style={styles.flatHeaderText}>Favorite Guides</Text>
                               <View style={styles.flatHeaderIconButtonsContainer}>
                                  <Pressable onPress={() => handleSort(1)}>
                                     <Image style={[styles.flatHeaderIcon,{elevation:orderState === 1 ? 4 : 0,borderColor:orderState === 1 ? colors.primary : colors.lightGray,tintColor:orderState === 1 ? colors.primary : colors.lightGray}]} source={upIcon} />
                                  </Pressable>
                                  <Pressable onPress={() => {handleSort(2)}}>
                                     <Image  style={[styles.flatHeaderIcon,{elevation:orderState === 2 ? 4 : 0,borderColor:orderState === 2 ? colors.primary : colors.lightGray,tintColor:orderState === 2 ? colors.primary : colors.lightGray}]} source={downIcon} />
                                  </Pressable>
                               </View>
                              </View>
                   }}
                   renderItem={({item,index}) => {
                        const content = isLoading  ?  <View style={{height:"100%",justifyContent:"center",alignItems:"center"}}>
                <ActivityIndicator size={"large"} color={colors.primary} />
              </View> : <FavGuideCard guide={item} />
                          return content;
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
         gap:spaces.small
     },
     flatHeaderWrapper:{
         marginBottom:spaces.small,marginTop:spaces.high,flexDirection:"row",alignItems:"center"
     },
     flatHeaderText:{
       fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight,color:colors.lightGray,flex:1
     },
     flatHeaderIconButtonsContainer:{
        flexDirection:"row",gap:spaces.middle
     },
     flatHeaderIcon:{
         width:25,height:25,resizeMode:"contain",borderWidth:1,backgroundColor:colors.background
     }
})