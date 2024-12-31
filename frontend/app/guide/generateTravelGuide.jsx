

import {Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, fonts, spaces } from '../../constands/appConstand'
import LottieView from "lottie-react-native"
import { LocationManagment } from '../../managments/locationManagment'
import { AI_PROMT } from '../../constands/appConstand'
import { chatSession } from '../../confs/geminiAIConf'
import { router } from 'expo-router'

const GenerateTravelGuide = () => {
  const {locationState,setLocationState} = useContext(LocationManagment)
  
  const generateTravelGuide = async () => {
      const replacePromt = AI_PROMT.replace("{location}",locationState.description)
                                     .replace("{daysCount}",locationState.daysCount)
                                     .replace("{nightsCount}",locationState.nightsCount)
          const res = await chatSession.sendMessage(replacePromt);
          setLocationState(oldState => {
              return {...oldState,locationPromt:res.response.text()}
          })
          router.push("/guide/guideDetails")
  }
  
  useEffect(() => {
          generateTravelGuide()
  },[])

  return (
    <SafeAreaView style={styles.safeView}>
        <View style={styles.container}>
           <View>
             <Text  style={styles.headerTitle}>Please Wait ...</Text>
             <Text style={styles.headerDesc} >We are working to generate your guide.</Text>
           </View> 
        <LottieView style={styles.gif} source={require('../../assets/lottie/generation.json')} autoPlay loop />   
        <Text style={styles.bottomText} > Wait for here </Text>
       </View>
    </SafeAreaView>
    
  )
}

export default GenerateTravelGuide

const styles = StyleSheet.create({
     safeView : {
          width:"100%",height:"100%"
     },
     container : {
          width:"100%",height:"100%",backgroundColor:colors.background,paddingVertical:spaces.high,paddingHorizontal:spaces.middle
     },
     headerTitle : {
            textAlign:"center",marginBottom:spaces.small,
            color:colors.text,fontSize:fonts.highFontSize,fontWeight:fonts.highFontWeight
     } ,
     headerDesc : {
            textAlign:"center",color:colors.text,fontSize:fonts.smallMidFontSize,fontWeight:fonts.smallFontWeight
     },
     gif : {
         width:"100%",height:300,resizeMode:"contain",marginBottom:spaces.high
     },
     bottomText:{
         textAlign:"center",color:colors.text,fontSize:fonts.smallMidFontSize,fontWeight:fonts.smallFontWeight
     }

})