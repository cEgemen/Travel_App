
import { Alert, BackHandler, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LottieView from 'lottie-react-native'
import generate from "../../assets/lottie/generate.json"
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, fonts } from '../../constands/appConstand'
import useGuideStore from '../../managments/guideStore'
import { router } from 'expo-router'
import { getTripGuide } from '../../confs/groqAlConf'
import { getGuidePromt } from '../../constands/aiContand'
import dayjs from 'dayjs'

const Generate = () => {
  const {guideInfo,setGuide,guide} = useGuideStore(state => state)
  console.log("guide : ",guide)
  const format =  'DD/MM/YYYY'
    const dateFormat = (date) => {
           const newDate = dayjs(date).format(format)
           return newDate;
    }

  useEffect(() => {
          const listener = BackHandler.addEventListener("hardwareBackPress",() => {
               const canGoBack = router.canGoBack()
               if(canGoBack)
               {
                  return false
               }
                  return true
          })

          return () => {
              BackHandler.removeEventListener(listener)
          }
  },[])

  useEffect(() => {
   
     const {location,dayData,type,price} = guideInfo
     const [city,country] = location.split(",")
     const {daysCount,nightsCount,startDate,endDate} = dayData;
     getTripGuide({messages:[{ role: "user", content: getGuidePromt({city,country,daysCount,nightsCount,startDate:dateFormat(startDate),endDate:dateFormat(endDate),type,price})}]})
     .then(data => {    

        setGuide(data)
       /*  router.replace("/guide/guideDetails") */
     })
     .catch(err => console.log("err : ",err))
  },[])

  return (
    <SafeAreaView style={styles.safeArea}>
       <LottieView style={styles.lottiStyle} autoPlay source={generate} loop />
       <View style={styles.header}>
          <Text style={styles.headerTitle}>Please Wait ...</Text>
          <Text style={styles.headerSubTitle}>We are working to generate your guide.</Text>
       </View>
    </SafeAreaView>
  )
}

export default Generate

const styles = StyleSheet.create({
 
    safeArea : {
         flex:1,backgroundColor:colors.background
    },
    header: {
       justifyContent:"center",alignItems:"center",marginVertical:"auto"
    },
    headerTitle : {
        fontSize:fonts.middleHighFontSize,fontWeight:fonts.middleFontWeight
    },
    headerSubTitle : {
        fontSize:fonts.smallMidFontSize,fontWeight:fonts.smallFontWeight,color:colors.gray
    },
    lottiStyle  : {
         width:"100%",height:300,resizeMode:"contain"
    }

})