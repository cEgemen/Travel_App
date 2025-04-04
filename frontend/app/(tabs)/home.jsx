
import {SafeAreaView, ScrollView, StyleSheet,View,Text, KeyboardAvoidingView, Platform} from 'react-native'
import React, { useState } from 'react'
import { colors, fonts, spaces } from '../../constands/appConstand'
import { router, Stack } from 'expo-router'
import TouchableIcon from '../../components/customButtons/TouchableIconButton'
import logOutIcon from "../../assets/icons/logout.png"
import useUserStore from '../../managments/userStore'
import SuggesContainer from '../../components/customPageComps/home/SuggesContainer'
import AutoCompletSearchInput from '../../components/customPageComps/home/AutoCompletSearchInput'
import useGuideStore from "../../managments/guideStore"
import ChatBotHome from '../../components/customPageComps/chatbot/ChatBotHome'
import CustomModal from '../../components/customModals/CustomModal'
import ModalWithButtons from '../../components/customModals/ModalWithButtons'


const Home = () => {
  const {username} = useUserStore(state => state.user)
  const setGuideInfo = useGuideStore(state => state.setGuideInfo )
  const [isVisible,setIsVisible] = useState(false)

  const logOut = () => {
      router.replace("/login")
  }
 
  const setModal = (mod) => {
      mod === 1 ? setIsVisible(true) : setIsVisible(false)
  }

  const selectLocation = (location) => {
        setGuideInfo({type:"location",data:location.locationName})
        router.replace("/guide/selectTravelDates")
  }

  const selectChatBot = () => {
      router.push("/chat")
  }

  return (
     <SafeAreaView style={styles.safeArea}>
     <ModalWithButtons isVisible={isVisible} closeVisible={() => {setModal(2)}} cancel={() => {setModal(2)}} confirm={logOut} title='Log Out Info' desc='Are you sure you want to log out?' />
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
                      <TouchableIcon icon={logOutIcon} iconStyle={{tintColor:colors.gray}} onPress={() => {setModal(1)}} />
                   </>
       }}}  />
           <ChatBotHome onClick={selectChatBot} />
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
       header:{
         gap:spaces.small,marginLeft:spaces.middle
       },
       headerText:{
          fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight,color:colors.darkGray
       },
       contentHeader:{
          gap:spaces.small,marginBottom:spaces.highx2
       },
       contentHeaderTopText:{
         fontSize:fonts.middleFontSize,fontWeight:fonts.middleFontWeight,color:colors.textPrimary
       },
       contentHeaderBottomText:{
         fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight,color:colors.textPrimary,color:colors.gray
       },
      
})

export default Home