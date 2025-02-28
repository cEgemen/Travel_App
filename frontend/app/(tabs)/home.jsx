
import {SafeAreaView, ScrollView, StyleSheet,View,Text} from 'react-native'
import React from 'react'
import { borderRadius, colors, elevation, fonts, spaces } from '../../constands/appConstand'
import { router, Stack } from 'expo-router'
import TouchableIcon from '../../components/customButtons/TouchableIconButton'
import logOutIcon from "../../assets/icons/logout.png"
import chatRobotIcon from "../../assets/icons/chatRobot.png"
import useUserStore from '../../managments/userStore'
import SearchInput from '../../components/forms/SearchInput'
import SuggesContainer from '../../components/customPageComps/home/SuggesContainer'



const Home = () => {
  const {username} = useUserStore(state => state.user)
  const logOut = () => {
      router.replace("/login")
  }
 
 
 
  return (
     <SafeAreaView style={styles.safeArea}>
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
       <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <TouchableIcon icon={chatRobotIcon} iconStyle={styles.chatIcon} iconWrapperStyle={styles.chatIconWrapper}  /> 
          <View style={styles.contentHeader}>
           <Text style={styles.contentHeaderTopText}>Let the Adventure Begin! 🌍</Text>
           <Text style={styles.contentHeaderBottomText}>Discover new places, plan your trips, and create unforgettable memories!</Text>
          </View>
          <SearchInput focusColor={colors.primary} placeholder='Enter Location ...' />
          <SuggesContainer />
       </ScrollView>
     </SafeAreaView>
  )
}

const styles = StyleSheet.create({
       safeArea : {
           flex:1
       },
       scrollView : {
          flex:1,backgroundColor:colors.background
       },
       scrollContent:{
          flex:1,padding:spaces.middle
       },
       chatIconWrapper : {
          width:50,aspectRatio:1,borderRadius:borderRadius.circleRadius(60),
          backgroundColor:colors.primary,elevation:elevation.middleShhadow,position:"absolute",zIndex:2,bottom:spaces.highx2,right:spaces.middle
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