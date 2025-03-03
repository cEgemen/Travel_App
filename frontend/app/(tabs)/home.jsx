
import {SafeAreaView, ScrollView, StyleSheet,View,Text, KeyboardAvoidingView, Platform} from 'react-native'
import React, { useCallback } from 'react'
import { borderRadius, colors, elevation, fonts, spaces } from '../../constands/appConstand'
import { router, Stack } from 'expo-router'
import TouchableIcon from '../../components/customButtons/TouchableIconButton'
import logOutIcon from "../../assets/icons/logout.png"
import chatRobotIcon from "../../assets/icons/chatRobot.png"
import useUserStore from '../../managments/userStore'
import SuggesContainer from '../../components/customPageComps/home/SuggesContainer'
import AutoCompletSearchInput from '../../components/customPageComps/home/AutoCompletSearchInput'
import useGuideStore from "../../managments/guideStore"


const Home = () => {
  const {username} = useUserStore(state => state.user)
  const setGuideInfo = useGuideStore(state => state.setGuideInfo )

  const logOut = () => {
      router.replace("/login")
  }
 
  const selectLocation = (location) => {
        setGuideInfo({type:"location",data:location})
        router.replace("/guide/selectTravelDates")
  }

  return (
     <SafeAreaView style={styles.safeArea}>
     
     <KeyboardAvoidingView
     behavior={Platform.OS === "ios" ? "padding" : "height"}
     style={{ flex: 1 }}>
     <ScrollView 
         showsVerticalScrollIndicator={false}
         keyboardShouldPersistTaps="handled"
         contentContainerStyle={styles.scrollContent}>
         <Stack.Screen options={{headerShadowVisible:false,headerTitle:"",
        headerLeft:()=>{
          return <>
         <View style={styles.header}>
            <Text style={styles.headerText}>Hello {username}</Text>
         </View>
                 </>           
       },
       headerRight:() => {
            return <>
                      <TouchableIcon icon={logOutIcon} iconStyle={{tintColor:colors.gray}} onPress={logOut} />
                   </>
       }}}  />
       
          <TouchableIcon icon={chatRobotIcon} iconStyle={styles.chatIcon} iconWrapperStyle={styles.chatIconWrapper}  /> 
          <View style={styles.contentHeader}>
           <Text style={styles.contentHeaderTopText}>Let the Adventure Begin! 🌍</Text>
           <Text style={styles.contentHeaderBottomText}>Discover new places, plan your trips, and create unforgettable memories!</Text>
          </View>
          <AutoCompletSearchInput onPress={selectLocation} focusColor={colors.primary} placeholder='Enter Location ...' searchWrapperStyle={{marginBottom:spaces.small}} />
          <SuggesContainer containerStyle = {{marginVertical:"auto"}}  />
       </ScrollView> 
     </KeyboardAvoidingView>
      
     </SafeAreaView>
  )
}

const styles = StyleSheet.create({
       safeArea : {
           flex:1
       },
       scrollContent:{
          padding:spaces.middle,backgroundColor:colors.background,flexGrow:1
       },
       chatIconWrapper : {
          width:50,aspectRatio:1,borderRadius:borderRadius.circleRadius(60),
          backgroundColor:colors.primary,elevation:elevation.middleShhadow,position:"absolute",zIndex:2,bottom:spaces.high,right:spaces.middle
       },
       chatIcon : {
             tintColor:colors.background
       },
       header:{
         gap:spaces.small,marginLeft:spaces.middle
       },
       headerText:{
          fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight,color:colors.gray
       },
       contentHeader:{
          gap:spaces.small,marginBottom:spaces.highx2
       },
       contentHeaderTopText:{
         fontSize:fonts.middleFontSize,fontWeight:fonts.middleFontWeight,color:colors.textPrimary
       },
       contentHeaderBottomText:{
         fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight,color:colors.textPrimary,color:colors.lightGray
       },
      
})

export default Home