import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { borderRadius, colors, elevation, fonts, spaces } from '../../constands'
import { router, Stack } from 'expo-router'
import {useRouteStore,useLocationStore} from '../../managments'
import freeIcon from "../../assets/icons/free.png"
import clockIcon from "../../assets/icons/clock.png"
import trafficIcon from "../../assets/icons/trafficLight.png"
import distanceIcon from "../../assets/icons/distance.png"
import dottedWay from "../../assets/icons/dottedWay.png"
import { fetchPOIs } from '../../utils/scanRoute'
import { RouteDetailCard,CustomTouchableButton } from '../../components'

const RouteDetail = () => {
  const selectRoute = useRouteStore(state => state.selectRoute) 
  const [isLoading,setIsLoading] = useState(true)
  const [poiData,setPoiData] = useState([])
  const locationDetails = useLocationStore(state => state.locationDetails)
  const {startDetails,endDetails} = locationDetails
  const {routeData,routeNumber} = selectRoute
  const {cost,trafficLevel,distance,duration} = routeData
 
  useEffect(() => {
         const fetchData = async () => {
            if(!isLoading) 
               {
                setIsLoading(true)
               }
             
            const result = await fetchPOIs({route:routeData})
            setPoiData(result)
            setIsLoading(false)
         }
         fetchData()
  },[])

  return (
     <>
      <Stack.Screen options={{
           headerShadowVisible:false,
           headerTitleAlign:"center",
           title:"Route "+routeNumber
      }} />
      <SafeAreaView style={styles.safeArea}>
         <View style={styles.detailCard}>
             <Text style={styles.detailCardTitle}>Route Details</Text>
             <View style={styles.locationWrapper}>
               <Text style={styles.subTitle}>📍{startDetails.locationName}</Text>
               <View style={{flexDirection:"row"}}>
                <Image style={{left:spaces.small,width:25,height:45,resizeMode:"contain"}} source={dottedWay} />  
                <View style={{flex:1}}>
                <View style={{flexDirection:"row",justifyContent:"space-around",marginRight:spaces.middle}}>
                 <View style={styles.detailWrapper}>
                  <Image style={styles.detailIcon} source={distanceIcon} /> 
                  <Text  style = {styles.subTitle} >{distance}</Text>
                 </View>
                 <View style={styles.detailWrapper}>
                  <Image style={styles.detailIcon} source={freeIcon} /> 
                  <Text  style = {styles.subTitle} >{cost} $</Text>
                 </View>
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-around"}}>   
                 <View style={styles.detailWrapper}>
                  <Image style={styles.detailIcon} source={clockIcon} /> 
                  <Text  style = {styles.subTitle} >{duration}</Text>
                 </View> 
                 <View style={styles.detailWrapper}>
                  <Image style={styles.detailIcon} source={trafficIcon} /> 
                  <Text  style = {styles.subTitle} >{trafficLevel} Lvl</Text>
                 </View>
                </View> 
               </View>
               </View>
               <Text style={styles.subTitle}>📍{endDetails.locationName}</Text>
             </View>
         </View>
         <View style={styles.cardContainer}>
          <Text style={styles.cardContainerTitle}>Places to visit</Text>
          {isLoading ? 
           <View style={{width:"100%",height:250,justifyContent:"center",alignItems:"center"}}>
            <ActivityIndicator size={"large"} color={colors.primary} />
           </View> : 
           <RouteDetailCard routesData={poiData}/>}
          <CustomTouchableButton onPress={() => {router.push("/route/selectedRoute")}} text={"Select Route"} buttonStyle={styles.btnStyle} />
         </View>
         
      </SafeAreaView>
     </>
     
  )
}

export default RouteDetail

const styles = StyleSheet.create({
      safeArea : {
          flex : 1,
          backgroundColor:colors.background,
          padding:spaces.high
      },
      detailCard : {
          width:"100%",
          height:250,
          backgroundColor:colors.lightGray,
          padding:spaces.middle,
          borderRadius:borderRadius.highRadius,
          elevation:elevation.smallShadow,
          rowGap:spaces.middle
      },
      detailCardTitle : {
         textAlign:"center",fontSize:fonts.middleFontSize,fontWeight:fonts.middleFontWeight
      },
      detailWrapper : {
          flexDirection:"row",alignItems:"center",columnGap:spaces.middle
      },
      locationWrapper : {
         flex:1,justifyContent:"center",rowGap:spaces.middle
      },
      subTitle : {
           fontSize:fonts.smallFontSize,fontWeight:fonts.highFontWeight
      },
      detailIcon : {
         width:25, height:25 , tintColor:colors.backgroundDark
      },
      cardContainer : {
          flex:1,paddingTop:spaces.high
      },
      cardContainerTitle: {
          fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight
      },
      btnStyle:{marginVertical:"auto",backgroundColor:colors.primary,width : "50%",alignSelf:"center"}
})