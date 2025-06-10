import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { getBestRouteSteps } from '../../utils/generateRoute'
import { useLocationStore, useRouteStore } from '../../managments'
import { BasePageWrapper, SquareButton } from '../../components'
import MapView, { Marker, Polyline } from 'react-native-maps'
import * as Location from "expo-location"
import { borderRadius, colors, detailText, elevation, spaces, subTitle } from '../../constands'
import * as geolib from 'geolib';
import { Text } from 'react-native'
import { compassIcon, distanceIcon, homeIcon, mapIcon } from '../../assets'
import { router } from 'expo-router'

const directions = [
    'Kuzey', 'Kuzeydoğu', 'Doğu', 'Güneydoğu',
    'Güney', 'Güneybatı', 'Batı', 'Kuzeybatı'
  ];

const LiveRoute = () => { 
  const {stationsRoutes,resetRoutes} = useRouteStore(state => state)
  const resetLocationAndFilter = useLocationStore(state => state.resetLocationAndFilter)
  const {stations,stationsNumbers} = stationsRoutes
  const mapRef = useRef(null)
  const watchRef = useRef(null)
  const [steps , setSteps] = useState(null)
  const [stationStepIndex,setStationStepIndex] = useState(0)
  const [isDone , setIsDone]  = useState(false)
  const [isLoading,setIsLoading] = useState(true)
  const [stationIndex , setStationIndex] = useState(0)
  const [currentLocations,setCurrentLocations] = useState({startLoc:null,endLoc:null})

  const {startLoc,endLoc} = currentLocations

  for(let j = 0 ; j<stations.length ; j ++)
   {
       console.log(j+". station : ",stations[j])
   }
   for(let i = 0 ; i<stations.length ; i ++)
   {
       
       const s1 = i === 0 ? stations[0] : stations[i] 
       const e1 = stations[i+1] 
       console.log(i+". s1 : ",s1)
       console.log(i+". e1 : ",e1)
   }
  
  useEffect(() => {
      
      const getSteps = async () => {
        if(!isLoading)
        {
          setIsLoading(true)
          setCurrentLocations({startLoc:null,endLoc:null})
          setSteps(null)
          setStationStepIndex(0)
        }
        console.log("stationIndex : ",stationIndex)
        const startLocc = stationIndex === 0 ? stations[0] : stations[stationIndex] 
        const endLocc = stations[stationIndex+1] 
        console.log("startLocc : ",startLocc)
        console.log("endLocc : ",endLocc)
        const steps =  await getBestRouteSteps([parseFloat(startLocc.lat),parseFloat(startLocc.lon)],[parseFloat(endLocc.lat),parseFloat(endLocc.lon)])
        setCurrentLocations(oldState => ({startLoc:{lat:startLocc.lat,lon:startLocc.lon},endLoc:{lat:endLocc.lat,lon:endLocc.lon}}))
        setSteps(oldState => steps)
        setIsLoading(false)
      }
      
      getSteps()
        
  },[stationIndex])  

/*   useEffect(() => {
      const getPermissions = async () => {
          try{
              const {status} =  await Location.requestForegroundPermissionsAsync()
              if(status === "granted")
              {
                  const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High})
                  setCurrentLocation({lat:latitude,lon:longitude})
                  watchRef.current  = await Location.watchPositionAsync({
                                                         accuracy:Location.Accuracy.High,
                                                         distanceInterval : 10,
                                                         timeInterval:5000
                                                                        },(location) => {
                                                                          const {coords:{latitude,longitude}} = location
                                                                           setCurrentLocation({lat:latitude,lon:longitude})  
                                                                        })
              }
              else 
              {
                 console.log("izin onaylanmadı")
                 return
              }
          }
          catch(err)
          {
             console.log("err : ",err)
             return
          }
      }

      getPermissions()
     
      return () => {
          if(watchRef.current !== null)
          {
             watchRef.current.remove()
          }
      }

  },[]) 
  */

  useEffect(() => {

    if(steps) 
    { 
      const newDistance = geolib.getDistance({latitude:parseFloat(startLoc.lat),longitude:parseFloat(startLoc.lon)},{latitude:steps[stationStepIndex].location[0],longitude:steps[stationStepIndex].location[1]})
      console.log("newDistance : ",newDistance)
      if(newDistance <= 5)
      {
         console.log("stationStepIndex : ",stationStepIndex)
         if(stationStepIndex < steps.length - 1)
         {  
            setStationStepIndex(oldState => oldState + 1)
         }
         else
         {
           console.log("stationIndex : ",stationIndex)
            if(stationIndex < stationsNumbers.length - 1)
            {
                setStationIndex(oldState => oldState + 1)
            }
            else
            {
                setIsDone(true)
            }
         }
      }
    }  
  },[currentLocations])
  
  const handleBackHome = () => {
       resetLocationAndFilter()
       resetRoutes()
       router.dismissAll()
       router.replace("/home")
  }
  
  return (
    <BasePageWrapper wrapperStyle={{flex:1,backgroundColor:colors.background}}>
     <View style={{flex:1}}>
      { 
        isDone ?  
         <View style={{flex:1,backgroundColor:colors.background,justifyContent:"center",alignItems:"center",rowGap:spaces.middle}}>
             <Text>Hedefe Ulaştınız ...</Text>
             <SquareButton icon={homeIcon} contentStyle={{tintColor:colors.backgroundDark}} onClick={handleBackHome} />
         </View> :
         (isLoading || currentLocations.startLoc === null || currentLocations.endLoc === null ) ? 
       <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
       <ActivityIndicator size={"large"} color={colors.primary} />
       </View>       
                 :
        <>
          <View style={{width:"95%",alignSelf:"center",position:"absolute",top:0,zIndex:2,padding:spaces.middle,backgroundColor:colors.background,rowGap:spaces.middle,borderBottomLeftRadius:borderRadius.highRadius,borderBottomRightRadius:borderRadius.highRadius}}> 
             <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
              <View style={{flexDirection:"row",columnGap:spaces.small,alignItems:"center"}}>
                 <SquareButton icon={compassIcon} contentStyle={{tintColor:colors.backgroundDark}} />
                 <Text style={detailText}>
                 {directions[1]}</Text>
              </View>
              <SquareButton icon={distanceIcon} contentStyle={{tintColor:colors.backgroundDark}} />
             </View>
             <View style={{alignItems:"center"}}>
              <Text style={[subTitle,{flexShrink:1}]}>{steps[stationStepIndex].instruction.replace(/<[^>]*>/g, '')}</Text>
             </View>
          </View>
          <MapView 
       ref={mapRef}
       style={{flex:1}}
       showsUserLocation={true}
       followsUserLocation={true}
       initialRegion={{latitude:parseFloat(startLoc.lat),longitude:parseFloat(startLoc.lon),latitudeDelta:0.01,longitudeDelta:0.01}}
       onLongPress={(event) => {
           const {latitude,longitude} = event.nativeEvent.coordinate
           setCurrentLocations(oldState => {
               return {endLoc : oldState.endLoc , startLoc : {lat : latitude , lon : longitude} }
           })
       }}
      >
      <Marker coordinate={{latitude:parseFloat(startLoc.lat),longitude:parseFloat(startLoc.lon)}}></Marker>
      <Marker coordinate={{latitude:parseFloat(steps[stationStepIndex].location[0]),longitude:parseFloat(steps[stationStepIndex].location[1])}}></Marker>
      <Polyline lineDashPattern={[10, 5]} strokeWidth={5} strokeColor={"rgb(43, 28, 182)"}  coordinates={
         [ {latitude:parseFloat(startLoc.lat),longitude:parseFloat(startLoc.lon)},
          {latitude:parseFloat(steps[stationStepIndex].location[0]),longitude:parseFloat(steps[stationStepIndex].location[1])}]
      } />
      </MapView>
        </>
              
      }
     </View>
    </BasePageWrapper>
  )
}

export default LiveRoute

const styles = StyleSheet.create({})


