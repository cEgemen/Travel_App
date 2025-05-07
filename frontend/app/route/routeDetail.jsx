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
import RouteDetailMainCard from '../../components/customPageComps/route/RouteDetailMainCard'

const RouteDetail = () => {
  const selectRoute = useRouteStore(state => state.selectRoute) 
  const [isLoading,setIsLoading] = useState(false)
  const [poiData,setPoiData] = useState([])
  const locationDetails = useLocationStore(state => state.locationDetails)
  // const {startDetails,endDetails} = locationDetails
  //const {routeData,routeNumber} = selectRoute
  //const {cost,trafficLevel,distance,duration} = routeData

  const tmpRoute =  {"routeData": {"coordinates": [[Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array], [Array]], "cost": 0, "distance": "3.9", "distanceMeters": 3875, "duration": 21, "durationSeconds": 1283, "id": "route-0-1746632098476", "isPaid": false, "steps": [[Object], [Object], [Object], [Object], [Object], [Object], [Object]], "trafficLevel": 1}, "routeNumber": 1}

  const {routeData,routeNumber} = tmpRoute
  const {cost,distance,duration} = routeData
  const startDetails =   {locationName:"Londan Bridge,UK"}
  const endDetails   =   {locationName:"London,UK"}

  const tmpPoi = [{"id": 13799212, "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Holborn_library.jpg", "lat": 51.5210756, "lon": -0.1156142, "name": "Holborn Library", "score": 6, "type": "library"}, {"id": 25474641, "imageUrl": "https://live.staticflickr.com/66/186808499_aae71d60fc_b.jpg", "lat": 51.5197763, "lon": -0.0937556, "name": "Barbican Centre (Cinema)", "score": 6, "type": "cinema"}, {"id": 26573161, "imageUrl": "https://live.staticflickr.com/1164/749325735_512b6f6833_b.jpg", "lat": 51.5102139, "lon": -0.1290844, "name": "Odeon Mezzanine", "score": 6, "type": "cinema"}, {"id": 26573168, "imageUrl": "https://live.staticflickr.com/934/42183256820_1317bc81b8_b.jpg", "lat": 51.5109335, "lon": -0.1304091, "name": "Cineworld Leicester Square", "score": 6, "type": "cinema"}, {"id": 26573173, "imageUrl": "https://live.staticflickr.com/1395/543072191_82da42ee17_b.jpg", "lat": 51.5112449, "lon": -0.1293677, "name": "Vue Leicester Square", "score": 6, "type": "cinema"}, {"id": 252524762, "imageUrl": "https://live.staticflickr.com/8389/8527960504_34be8b62dd_b.jpg", "lat": 51.5301768, "lon": -0.0800915, "name": "Shoreditch Library", "score": 6, "type": "library"}, {"id": 261269886, "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/6/6a/LondonBuddhistCentre.jpg", "lat": 51.5280326, "lon": -0.0512545, "name": "London Buddhist Centre", "score": 6, "type": "place_of_worship"}, {"id": 275402349, "imageUrl": "https://live.staticflickr.com/2038/1553496872_c2a8bfefca.jpg", "lat": 51.487979, "lon": -0.137889, "name": "Pimlico Library", "score": 6, "type": "library"}, {"id": 299597608, "imageUrl": "https://upload.wikimedia.org/wikipedia/en/b/b6/AlmeidaTheatreLogo.jpg", "lat": 51.5394403, "lon": -0.1030764, "name": "Almeida Theatre", "score": 6, "type": "theatre"}, {"id": 301068236, "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/1/11/True_Jesus_Church_Olive_Garden_Training_Centre.jpg", "lat": 51.5324661, "lon": -0.0828566, "name": "True Jesus Church", "score": 6, "type": "place_of_worship"}]
 
  useEffect(() => {
      /*    const fetchData = async () => {
            if(!isLoading) 
               {
                setIsLoading(true)
               }
             
            const result = await fetchPOIs({route:routeData})
            setPoiData(result)
            setIsLoading(false)
         }
         fetchData() */
  },[])

  return (
     <>
      <Stack.Screen options={{
           headerShadowVisible:false,
           headerTitleAlign:"center",
           title:"Route "+routeNumber
      }} />
      <SafeAreaView style={styles.safeArea}>
         <RouteDetailMainCard routeData={{cost,distance,duration,startLocName:startDetails.locationName,destinationLocName:endDetails.locationName , optionRoute : "Route "+routeNumber}} />
         <View style={styles.cardContainer}>
          <Text style={styles.cardContainerTitle}>Places to visit</Text>
          {isLoading ? 
           <View style={{width:"100%",height:250,justifyContent:"center",alignItems:"center"}}>
            <ActivityIndicator size={"large"} color={colors.primary} />
           </View> : 
           <RouteDetailCard routesData={tmpPoi}/>}
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