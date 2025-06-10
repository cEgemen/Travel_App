import {useEffect, useRef, useState } from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {useLocationStore} from '../../../managments';
import { colors, elevation, spaces } from '../../../constands';
import * as Location from "expo-location"
import SquareButton from '../../customButtons/SquareButton';
import { distanceIcon } from '../../../assets';

const SelecterMap = () => {

  const { setStartDetails ,locationDetails : {startDetails,endDetails}} =  useLocationStore(state => state)
  const mapRef = useRef(null);
  const timeoutRef = useRef(null)
  const startFlag =  useRef(false)
  const endFlag = useRef(false)
 
   useEffect(()=>{
       if(startDetails !== null)
       {
           mapRef.current?.animateToRegion({
             latitude :parseFloat(startDetails.lat),
             longitude:parseFloat(startDetails.lon),
             latitudeDelta:0.05,
             longitudeDelta:0.05
           },1000)
           startFlag.current =  true
       }

  },[startDetails])
 
  useEffect(() => {
       if(endDetails !== null)
       {
          setTimeout(() => {
            mapRef.current?.animateToRegion({
               latitude:parseFloat(endDetails.lat),
               longitude:parseFloat(endDetails.lon),
               latitudeDelta:0.05,
               longitudeDelta:0.05
            },1000)
         },(startFlag.current ? 3500 : 1000))
         endFlag.current = true
       }
  },[endDetails])

  useEffect(() => {

      if(startDetails !== null && endDetails !== null)
         {
            timeoutRef.current = setTimeout(() => { 
                 mapRef.current?.fitToCoordinates(  [
                     {latitude:parseFloat(startDetails.lat),longitude:parseFloat(startDetails.lon)},
                     {latitude:parseFloat(endDetails.lat),longitude:parseFloat(endDetails.lon)}
                  ],
                  {
                     edgePadding : { top: 50, right: 50, bottom: 50, left: 50 },   
                     animated:true
                  })              
                  startFlag.current =  false
                  endFlag.current = false
                },((startFlag.current && endFlag.current) ? 7000 : (startFlag.current || endFlag.current) ? 4500 : 1500)) 
         }
      else
      {
          if(timeoutRef.current !== null)
          {
              clearTimeout(timeoutRef.current)
          }
      }     

  },[startDetails,endDetails])

  const handleUserCurrentLoc = async () => {
       const {status} = await Location.requestForegroundPermissionsAsync()
       if(status === "granted")
       {
           const {coords} = await Location.getCurrentPositionAsync()
           const {latitude,longitude} = coords
           const res = await Location.reverseGeocodeAsync({latitude,longitude})
           const {region,country} = res[0]
           setStartDetails({lat:latitude,lon:longitude,locationName:region+","+country})
       }
  }

  return (
     
        <View style={styles.container}>
          <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 39.9208,
            longitude: 32.8541,
            latitudeDelta: 0.25,
            longitudeDelta: 0.25,
          }}
          onLongPress={(event) => {
              console.log("longPress event : ",event)
          }}
          
        >
         {
           (startDetails) ? 
            <Marker title={startDetails.locationName} description='Start Location' coordinate={{latitude:parseFloat(startDetails.lat),longitude:parseFloat(startDetails.lon)}} /> : 
            null
         }
         {
           (endDetails) ? 
            <Marker title={endDetails.locationName} description='Destination Location' coordinate={{longitude:parseFloat(endDetails.lon),latitude:parseFloat(endDetails.lat)}} /> :
            null
         }
        </MapView>
        <SquareButton icon={distanceIcon} iconWrapperStyle={{position:"absolute",top:spaces.middle,right:spaces.middle,elevation:elevation.middleShadow}}
        contentStyle={{tintColor:colors.darkGray}}  onClick={handleUserCurrentLoc} />
        </View>
  );
};

const styles = StyleSheet.create({
  container : {
   flex:1
  },
  map: {
    width:"100%",height:"100%"
  },
});

export default SelecterMap;