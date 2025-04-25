import { Image, Pressable, SafeAreaView, StyleSheet, View } from 'react-native'
import MapView, {Marker, Polyline} from 'react-native-maps'
import { borderRadius, colors, elevation, spaces } from '../../constands/appConstand'
import leftIcon from "../../assets/icons/left_arrow_short.png"
import MainCard from '../../components/customPageComps/route/MainCard'
import useRouteStore from '../../managments/routeStore'
import { useEffect, useRef, useState } from 'react'
import useLocationStore from '../../managments/locationStore'

const Main = () => {
  const routeDatas = useRouteStore(state => state.routeDatas)
  const locationDetails = useLocationStore(state => state.locationDetails)
  const {startDetails,endDetails} = locationDetails
  const {routes} = routeDatas
  const [currentIndex , setCurrentIndex] = useState(0)
  const mapRef = useRef(null)
  const routeColors  =  ["rgb(105, 186, 136)","rgb(36, 26, 187)","rgb(201, 76, 118)"]

  useEffect(() => {
      mapRef.current?.fitToCoordinates(routes[currentIndex].coordinates.map(coord => ({
        latitude: coord[0],
        longitude: coord[1]
      })), {
      edgePadding: { top: 15, right: 15, bottom: 100, left: 15 },
      animated: true,
    });   
  },[currentIndex])

  return (
     <SafeAreaView style={styles.safeArea}>
          <Pressable style={styles.iconWrapper}>
            <Image source={leftIcon} style={styles.icon} />
          </Pressable>
          <MapView 
            ref={mapRef}
            style = {styles.map}
            initialRegion={
                {
                  latitude: routeDatas.routes[0].coordinates[0][0],
                  longitude: routeDatas.routes[0].coordinates[0][1],
                  latitudeDelta: 0.2,
                  longitudeDelta: 0.2,
                }
                          }             
          >
           <Marker title={startDetails.locationName} description='Start Location' coordinate={{latitude:parseFloat(startDetails.lat),longitude:parseFloat(startDetails.lon)}} />
           <Marker title={endDetails.locationName} description='Destination Location' coordinate={{longitude:parseFloat(endDetails.lon),latitude:parseFloat(endDetails.lat)}} />

            {routeDatas.routes.slice(0,3).map((route,index) =>  {
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
          <View style={styles.cardWrapper}>
              <MainCard routesData={routes.slice(0,3)} currentIndex={currentIndex} onChangeIndex={setCurrentIndex}  />
          </View>
     </SafeAreaView>
  )
}

export default Main

const styles = StyleSheet.create({
    safeArea : {
       flex:1     
    },
    map : {
       flex:1  
    },
    iconWrapper : {
      width:50,height:50,position:"absolute",left:spaces.small,top:spaces.small,backgroundColor:colors.primary,zIndex:2, borderRadius:borderRadius.circleRadius(50),justifyContent:"center",alignItems:"center",elevation:elevation.smallShadow,  opacity:.8
    },
    icon : {
      width:40,height:40
    },
    cardWrapper : {
       position:"absolute",bottom:0,left:0,width:"100%",height:"auto",backgroundColor:"rgba(255,255,255,.6)"
    }
})