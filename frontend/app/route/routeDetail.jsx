import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { borderRadius, colors, elevation, fonts, spaces } from '../../constands'
import { router } from 'expo-router'
import {useRouteStore,useLocationStore} from '../../managments'
import { fetchPOIs } from '../../utils/scanRoute'
import { RouteDetailCard,CustomTouchableButton, StackHeader } from '../../components'
import RouteDetailMainCard from '../../components/customPageComps/route/RouteDetailMainCard'

const RouteDetail = () => {
  const {selectRoute,setSelectMapRoute} = useRouteStore(state => state) 
  const [isLoading,setIsLoading] = useState(false)
  const [poiData,setPoiData] = useState(null)
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
         if(!poiData)
          {
            fetchData()
          }
  },[])
     
    const handleSelectRoute = () => {
        setSelectMapRoute({cost,distance,duration,locationsData : poiData})
        router.push("/route/selectedRoute")
  }

  return (
     <>
      <SafeAreaView style={styles.safeArea}>
         <StackHeader title={"Route "+routeNumber} />
         <RouteDetailMainCard routeData={{cost,distance,duration,startLocName:startDetails.locationName,destinationLocName:endDetails.locationName , optionRoute : "Route "+routeNumber}} />
         <View style={styles.cardContainer}>
          <Text style={styles.cardContainerTitle}>Places to visit</Text>
          {isLoading ? 
           <View style={{width:"100%",height:250,justifyContent:"center",alignItems:"center"}}>
            <ActivityIndicator size={"large"} color={colors.primary} />
           </View> : 
           <RouteDetailCard routesData={poiData}/>}
          <CustomTouchableButton disabled={isLoading} onPress={handleSelectRoute} text={"Select Route"} buttonStyle={styles.btnStyle} />
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