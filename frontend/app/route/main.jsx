import {BackHandler, StyleSheet, View } from 'react-native'
import MapView, {Marker, Polyline} from 'react-native-maps'
import { borderRadius, colors, elevation, spaces} from '../../constands'
import {useRouteStore,useLocationStore} from '../../managments'
import { useEffect, useRef, useState } from 'react'
import { BasePageWrapper,MainCard, SquareButton, StackHeader } from '../../components'
import { homeIcon } from '../../assets'
import { router } from 'expo-router'

const Main = () => {
  
  const {routeDatas ,resetRoutes} = useRouteStore(state => state)
  const {locationDetails,resetLocationAndFilter} = useLocationStore(state => state)
  const {startDetails,endDetails} = locationDetails
  const {routes} = routeDatas 
  const [currentIndex , setCurrentIndex] = useState(0)
  const mapRef = useRef(null)
  const routeColors  =  ["rgb(33, 211, 74)","rgb(36, 26, 187)","rgb(201, 76, 118)"]

  useEffect(() => {

       const handleBackPress = () => true
    
       const backHndl = BackHandler.addEventListener("hardwareBackPress",handleBackPress)
       
       return () => {
           backHndl.remove()
       } 

  },[])

  useEffect(() => {
      mapRef.current?.fitToCoordinates(routes[currentIndex].coordinates.map(coord => ({
        latitude: coord[0],
        longitude: coord[1]
      })), {
      edgePadding: { top: 100, right: 50, bottom: 300, left: 50},
      animated: true,
    });   
  },[currentIndex])

  const handleGoBack = () => {
    resetLocationAndFilter()
    resetRoutes()  
    router.replace("/home")
  }

  return (
     <BasePageWrapper wrapperStyle={styles.container}>
         {({top,left,right,bottom}) => (
              <>
          <StackHeader 
             headerWrapperStyle={{position:"absolute",top:(0+top),zIndex:2,paddingHorizontal:spaces.middle,backgroundColor:"transparent",elevation:elevation.middleShadow}}
             LeftComp={() => {
                  return <SquareButton icon={homeIcon}  contentStyle={{tintColor:colors.darkGray}} onClick={handleGoBack} />
             }}
           />
          <MapView 
            ref = {mapRef}
            onMapReady={() => {
                  mapRef.current?.fitToCoordinates(
        [{latitude : parseFloat(startDetails.lat),longitude : parseFloat(startDetails.lon)},{latitude:parseFloat(endDetails.lat),longitude:parseFloat(endDetails.lon)}],
        {
         edgePadding : {top:100,right:20,bottom:200,left:20}, 
         animated : true
        }
                                                  )
            }}
            style = {styles.map}
            initialRegion={
                {
                  latitude:  routes[0].coordinates[0][0],
                  longitude: routes[0].coordinates[0][1],
                  latitudeDelta: 0.2,
                  longitudeDelta: 0.2,
                }
                          }             
          >
           <Marker title={startDetails.locationName} description='Start Location' coordinate={{latitude:parseFloat(startDetails.lat),longitude:parseFloat(startDetails.lon)}} />
           <Marker title={endDetails.locationName} description='Destination Location' coordinate={{longitude:parseFloat(endDetails.lon),latitude:parseFloat(endDetails.lat)}} />

            {routes.slice(0,3).map((route,index) =>  { 
                     return <Polyline key={route.id}  
                             coordinates={route.coordinates.map(coord => ({
                                         latitude: coord[0],
                                         longitude: coord[1]
                                                                }))}
                             strokeColor={index === 0 ? routeColors[0] : index === 1 ? routeColors[1] : routeColors[2]}
                             strokeWidth={index === currentIndex ? 5 : 2 }     
                            />
            })}
          </MapView>
          <View style={[styles.cardWrapper,{bottom:(0 + bottom) , left:(0 + left)}]}>
              <MainCard routesData={routes.slice(0,3)} currentIndex={currentIndex} onChangeIndex={setCurrentIndex}  />
          </View>
              </>
         )}
     </BasePageWrapper>
  )
}

export default Main

const styles = StyleSheet.create({
    container : {
       flex:1     
    },
    map : {
       flex:1  
    },
     iconStyl : {
                       width:35,height:35,tintColor:colors.darkGray
                   } ,             
                  iconWrapper : {
                    width:40,height:40,justifyContent:"center",alignItems:"center",
                    borderRadius:borderRadius.middleRadius,backgroundColor:colors.lightGray
                             },
    cardWrapper : {
       position:"absolute",width:"100%",height:"auto",backgroundColor:colors.background
    }
})