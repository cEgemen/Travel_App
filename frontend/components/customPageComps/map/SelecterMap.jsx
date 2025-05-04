import React, {useEffect, useRef, useState } from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {useLocationStore} from '../../../managments';

const SelecterMap = () => {
  const {startDetails,endDetails} =  useLocationStore(state => state.locationDetails)
  const [mapState , setMapState] = useState({startReady : false,endReady:false})
  console.log("startDetails : ",startDetails)
  const mapRef = useRef(null);
  useEffect(()=>{
       if(startDetails !== null)
       {
           mapRef.current.animateToRegion({
             latitude :parseFloat(startDetails.lat),
             longitude:parseFloat(startDetails.lon),
             latitudeDelta:0.1,
             longitudeDelta:0.1
           },1000)
           setTimeout(() => {
                  setMapState(oldState => {
                      return {...oldState,startReady:true}
                  })
           },1100)
       }
       else 
       {
          setMapState(oldState => {
              return {...oldState , startReady : false}
          })
       }
       if(endDetails !== null)
       {
           mapRef.current.animateToRegion({
               latitude:parseFloat(endDetails.lat),
               longitude:parseFloat(endDetails.lon),
               latitudeDelta:0.1,
               longitudeDelta:0.1
           },1000)
           setTimeout(()=> {
                 setMapState(oldState => ({...oldState,endReady:true}))
           },1100)
       }
       else{
           setMapState(oldState => (
               {...oldState,endReady : false}
           ))
       }
  },[startDetails,endDetails])

  useEffect(() => {
      if(mapState.startReady !== false && mapState.endReady !== false)
      {
         setTimeout(() => {
               mapRef.current.fitToCoordinates(
                  [
                     {latitude:parseFloat(startDetails.lat),longitude:parseFloat(startDetails.lon)},
                     {latitude:parseFloat(endDetails.lat),longitude:parseFloat(endDetails.lon)}
                  ],
                  {
                     edgePadding : { top: 50, right: 50, bottom: 50, left: 50 },   
                     animated:true
                  }
               )
         },2000)
      }
  },[mapState])

  return (
 
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
          showsUserLocation
          showsMyLocationButton
          followsUserLocation
        >
         {
           (mapState.startReady && startDetails) ? 
            <Marker title={startDetails.locationName} description='Start Location' coordinate={{latitude:parseFloat(startDetails.lat),longitude:parseFloat(startDetails.lon)}} /> : 
            null
         }
         {
           (mapState.endReady && endDetails) ? 
            <Marker title={endDetails.locationName} description='Destination Location' coordinate={{longitude:parseFloat(endDetails.lon),latitude:parseFloat(endDetails.lat)}} /> :
            null
         }
        </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width:"100%",height:"100%"
  }
});

export default SelecterMap;