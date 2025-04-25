import { BackHandler, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import route2Lottie from "../../assets/lottie/route2.json"
import LottieView from 'lottie-react-native'
import { colors, fonts } from '../../constands/appConstand'
import { router } from 'expo-router'
import useLocationStore from '../../managments/locationStore'
import { generateRoute } from '../../utils/generateRoute'
import useRouteStore from '../../managments/routeStore'

const Generate = () => {

  const {locationDetails:{startDetails,endDetails},filters} = useLocationStore(state => state)
  const setRouteDatas  =  useRouteStore(state => state.setRouteDatas)

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
           const startLoc = [startDetails.lat,startDetails.lon]
           const endLoc  =   [endDetails.lat,endDetails.lon]
           const generate = async () => {
              const result = await generateRoute(startLoc,endLoc,filters.price,filters.vehicle)
              setRouteDatas(result)
              router.replace("/route/main")
           }
           generate()
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