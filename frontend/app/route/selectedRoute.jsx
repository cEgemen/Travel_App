import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { borderRadius, colors, fonts, spaces } from '../../constands'
import {useRouteStore,useLocationStore} from '../../managments'
import leftArrowIcon from "../../assets/icons/left_arrow_short.png"
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { CustomTouchableButton } from '../../components'
import { router } from 'expo-router'


const SelectedRoute = () => {
  const mapRef = useRef(null)
  const locationDetails = useLocationStore(state => state.locationDetails)
  const {startDetails,endDetails} = locationDetails
  const selectRoute = useRouteStore(state => state.selectRoute)
  const {routeData,routeNumber} = selectRoute
  const {cost,trafficLevel,distance,duration} = routeData

  const handleBack = () => {
     router.back()  
  }

  return (
     <SafeAreaView style={styles.safeArea} >
        <Pressable style={styles.backBtnWrapper} onPress={handleBack}>
          <Image style={styles.backBtnStyle} source={leftArrowIcon} />
        </Pressable>
        <MapView
         ref={mapRef}
         style={{flex:1}}
         provider={PROVIDER_GOOGLE}
         initialRegion={{
            latitude: parseFloat(startDetails.lat),
            longitude:parseFloat(startDetails.lon),
            latitudeDelta: 0.25,
            longitudeDelta: 0.25,
                       }}
        >
          <Marker title={startDetails.locationName} description='Start Location' coordinate={{latitude:parseFloat(startDetails.lat),longitude:parseFloat(startDetails.lon)}} />
          <Marker title={endDetails.locationName} description='Destination Location' coordinate={{longitude:parseFloat(endDetails.lon),latitude:parseFloat(endDetails.lat)}} />  
        </MapView>
        <View style = {styles.bottomContainer}>
            <Text style={styles.title}>Current Route : Route {routeNumber}</Text>
            <View style={{flexDirection:"row",justifyContent:"space-around",width:"100%"}}>
               <View>
                  <Image/>
                  <Text>{distance}</Text>
               </View>
               <View>
                  <Image/>
                  <Text>{duration}</Text>
               </View>
               <View>
                  <Image/>
                  <Text>{trafficLevel} Lvl</Text>
               </View>
               <View>
                  <Image/>
                  <Text>{cost} $</Text>
               </View>
            </View>
            <CustomTouchableButton buttonStyle={styles.btnStyle} text={"Let's Go"} />
        </View>
     </SafeAreaView>
  )
}

export default SelectedRoute

const styles = StyleSheet.create({
      safeArea : {
         flex:1,backgroundColor:colors.background
      },
      backBtnWrapper : {
         position:"absolute",top:spaces.small,left:spaces.small,backgroundColor:colors.primary,width:40,height:40,borderRadius:borderRadius.circleRadius(40),opacity:.9,justifyContent:"center",alignItems:"center",zIndex:2
      },
      backBtnStyle : {
         width:30 , height: 30,
      },
      bottomContainer: {
         position:"absolute",bottom:0,width:"100%",height:150,padding:spaces.middle,backgroundColor:"rgba(255,255,255,.6)",
         justifyContent:"center",alignItems:"center",rowGap:spaces.middle
      },
      btnStyle : {
         width:"50%",height:40,backgroundColor:colors.primary
      },
      title: {
         fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight 
      }
})