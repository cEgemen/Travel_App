import {ScrollView ,Image,StyleSheet, Text, View, Pressable } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { borderRadius, colors, elevation, fonts, spaces } from '../../constands'
import { router } from 'expo-router'
import {useRouteStore,useLocationStore} from '../../managments'
import {StackHeader, BasePageWrapper } from '../../components'
import { carIcon, castleIcon, distanceIcon } from '../../assets'
import MapView, { Marker } from 'react-native-maps'
import dayjs from 'dayjs'
import { fetchPOIs } from '../../utils/scanRoute'
import RouteDetailHelpCard from '../../components/customPageComps/route/RouteDetailHelpCard'

const RouteDetail = () => {
  const mapRef = useRef(null)
  const {selectRoute,placesDatas,setPlacesDatas,setSelectMapRoute} = useRouteStore(state => state) 
  const [timeState,setTimeState] = useState({date:null,time:null})
  const [poiLoading , setPoiLoading] = useState(false)
  const {locationDetails,filters} = useLocationStore(state => state)
  const {startDetails,endDetails} = locationDetails
  const {routeData,routeNumber} = selectRoute
  const {cost,trafficLevel,distance,duration} = routeData
  
  useEffect(() => {

  const dayjsInfo = dayjs().format('DD/MM/YYYY HH:mm').split(" ");
  const date = dayjsInfo[0]
  const time = dayjsInfo[1]
  setTimeState({date,time})

  },[])

  useEffect(() => {
    
     const fetchData = async () => {
         if(!poiLoading)
         {
           setPoiLoading(true)
         }
         const poiResult =  await fetchPOIs({route:routeData,selectedCategories:filters.places})
         console.log("poiResult : ",poiResult)
         setPlacesDatas(poiResult)
         setPoiLoading(false)
     }
     if(placesDatas === null )
     {
      fetchData()
     }

  },[])

    const calculateTime = (timeStr,addTime) => {

         const time = dayjs(`2025-01-01T${timeStr}`);
         const updatedTime = time.add(addTime, 'minute');
         return updatedTime.format('HH:mm');

    }

    const handleMoveOtherPlaces = () => {
         router.push("/route/popularPlaces")
    }

    const handleBeforeMove = () => {
         setSelectMapRoute({cost,duration,distance,locationsData:placesDatas})
         router.push("/route/selectedRoute")
    }

  return (
     <>
      <BasePageWrapper wrapperStyle={styles.container}>
         <StackHeader isBack title={"Route "+routeNumber} backIconWrapperStyle={styles.iconWrapper} />
         <View style={styles.mapWrapper}>
             <MapView ref={mapRef}  onMapReady={() => {
                  mapRef.current.fitToCoordinates(
                  [
                     {latitude:parseFloat(startDetails.lat),longitude:parseFloat(startDetails.lon)},
                     {latitude:parseFloat(endDetails.lat),longitude:parseFloat(endDetails.lon)}
                  ],
                  {
                     edgePadding : { top: 50, right: 100, bottom: 50, left: 100 },   
                     animated:true
                  }
                                                  )
                  }} style={{width:"100%",height:"100%"}} initialRegion={{latitude:parseFloat(startDetails.lat),longitude:parseFloat(startDetails.lon),latitudeDelta:0.05,longitudeDelta:0.05}}>
                <Marker coordinate={{latitude:parseFloat(startDetails.lat),longitude:parseFloat(startDetails.lon)}}></Marker>
                <Marker coordinate={{latitude:parseFloat(endDetails.lat),longitude:parseFloat(endDetails.lon)}}></Marker>
             </MapView>
         </View>
         
         <View style={styles.topDetailWrapper}>
             <Text style={styles.valueText}>{timeState.date}  // {timeState.time}</Text>
             <Text style={styles.valueText}>${cost}</Text>
         </View> 
         
         <View style={{width:"100%",marginBottom:spaces.highx2}}>
           <View style={{flexDirection:"row",alignItems:"center",columnGap:spaces.middle}}>
             <View style={styles.iconWrapper}>
                <Image source={carIcon} style={{width:30,height:30,tintColor:colors.backgroundDark}} />
             </View>
             <View>
                <Text style={styles.subTitle}>{startDetails.locationName}</Text>
                <Text style={styles.valueText} >{timeState.time}</Text>
             </View>
           </View>
           <View style={{flexDirection:"row"}}>
             <View style={{marginLeft:(30/2)-1,height:50,borderLeftColor:colors.backgroundDark,borderLeftWidth:2,borderStyle:"dotted"}}></View>
             <View style={{width:"100%",paddingHorizontal:spaces.high,justifyContent:"center"}}>
                <Text style={styles.valueText}>{distance} km.</Text>
             </View>
           </View>
           <View style={{flexDirection:"row",alignItems:"center",columnGap:spaces.middle}}>
             <View style={styles.iconWrapper}>
                <Image source={carIcon} style={{width:30,height:30,tintColor:colors.backgroundDark}} />
             </View>
             <View>
                <Text style={styles.subTitle}>{endDetails.locationName}</Text>
                <Text style={styles.valueText}>{calculateTime(timeState.time,duration)}</Text>
             </View>
           </View>
         </View>

         <View style={{flex:1,rowGap:spaces.middle}}>
             <Text style={styles.title}>Route Help Options</Text>
             <ScrollView 
             contentContainerStyle={{flexGrow:1,flexWrap:"wrap",flexDirection:"row",gap:spaces.middle}}
             showsVerticalScrollIndicator={false}
             >
               
               <RouteDetailHelpCard isLoading={poiLoading} title='Populer Places' desc='Explore top spots and must-see destinations around you.' icon={castleIcon} pressableFunc={handleMoveOtherPlaces} />
               <RouteDetailHelpCard isLoading={poiLoading} title="Let's Go" desc="Let's go to the discovery of the routes to the goal" icon={distanceIcon} pressableFunc={handleBeforeMove} />

             </ScrollView>
         </View>

      </BasePageWrapper>
     </>
     
  )
}


export default RouteDetail

const styles = StyleSheet.create({
      container : {
          flex : 1,
          backgroundColor:colors.background,paddingRight:spaces.high,paddingLeft:spaces.high
      },
      mapWrapper : {
        width:"100%",height:250,marginBottom:spaces.middle,borderRadius:spaces.middle,overflow:"hidden"
                  },
       topDetailWrapper : {
        width:"100%",flexDirection:"row",justifyContent:"space-between",
        alignItems:"center",marginBottom:spaces.highx2
                          } ,      
      title : {
          fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight
      },
      subTitle : {
          fontSize:fonts.smallMidFontSize,fontWeight:fonts.smallFontWeight
      },
      valueText : {
          fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight,color:colors.primary
      },
        iconStyl : {
                   width:35,height:35,tintColor:colors.darkGray
               } ,             
              iconWrapper : {
                width:40,height:40,justifyContent:"center",alignItems:"center",
                borderRadius:borderRadius.middleRadius,backgroundColor:colors.lightGray
                         },
     
})