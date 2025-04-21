import { BackHandler, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import route2Lottie from "../../assets/lottie/route2.json"
import LottieView from 'lottie-react-native'
import { colors, fonts } from '../../constands/appConstand'
import { router } from 'expo-router'

const Generate = () => {

  useEffect(() => {
          const backFn = () => {
              return true
          }

          const backHand = BackHandler.addEventListener("hardwareBackPress",backFn)

          return () => {
              backHand.remove()
          }  
  },[])  

  useEffect(() => {
        setTimeout(() => {
             router.push("/route/main")
        },2000)
  },[])

  return (
    <SafeAreaView style={styles.wrapper}>
        <LottieView source={route2Lottie} autoPlay style={styles.lottie} />
        <View style={styles.header}>
                  <Text style={styles.headerTitle}>Please Wait ...</Text>
                  <Text style={styles.headerSubTitle}>We are working to draw your routes.</Text>
        </View>
    </SafeAreaView>
  )
}

export default Generate

const styles = StyleSheet.create({
    wrapper : {
       flex:1,backgroundColor:colors.background  
    },
    lottie:{
        width:"100%",height:300
    },
    header:{
         justifyContent:"center",alignItems:"center",marginVertical:"auto"
    },
    headerTitle : {
        fontSize:fonts.middleHighFontSize,fontWeight:fonts.middleFontWeight
    },
    headerSubTitle : {
        fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight,color:colors.gray
    }
})