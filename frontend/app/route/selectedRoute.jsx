import { Image,Text, Pressable, SafeAreaView, StyleSheet,View,FlatList, FlatListComponent} from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { borderRadius, colors, elevation, fonts, spaces } from '../../constands'
import {useRouteStore,useLocationStore} from '../../managments'
import leftArrowIcon from "../../assets/icons/left_arrow_short.png"
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import { router } from 'expo-router'
import { CustomTouchableButton, SelectItem, StackHeader } from '../../components'
import { restartIcon } from '../../assets'

const SelectedRoute = () => {
  const mapRef = useRef(null)
  const [selectLocation , setSelectLocation] = useState({index:0,isStart:false})
  
   const locationDetails = useLocationStore(state => state.locationDetails)
  const {startDetails,endDetails} = locationDetails
  const selectMapRoute = useRouteStore(state => state.selectMapRoute)
  const {cost,distance,duration,locationsData} = selectMapRoute


  useEffect(() => {
        mapRef.current.fitToCoordinates(
         [
           { latitude: parseFloat(startDetails.lat), longitude: parseFloat(startDetails.lon) },
           { latitude: parseFloat(endDetails.lat), longitude: parseFloat(endDetails.lon) }
         ], {
        edgePadding: {
          top: 200,
          right: 50,
          bottom: 200,
          left: 50,
        },
        animated: true,
      });
  },[])

  useEffect(() => {
     if(selectLocation.isStart && mapRef.current !== null)
     {
       mapRef.current.animateToRegion({
           latitude: locationsData[selectLocation.index].lat,
           longitude: locationsData[selectLocation.index].lon,
           latitudeDelta: 0.01,
           longitudeDelta: 0.01,
                                      }, 800);

     }
  },[selectLocation])

  const handleChangeLocation = (index) => {
      if(selectLocation.index !== index)
      {
          setSelectLocation(oldState => {
             return {isStart:true,index:index}
          })
      }
  }

  const handleMapRestart = () => {
          mapRef.current.fitToCoordinates(
         [
           { latitude: parseFloat(startDetails.lat), longitude: parseFloat(startDetails.lon) },
           { latitude: parseFloat(endDetails.lat), longitude: parseFloat(endDetails.lon) }
         ], {
        edgePadding: {
          top: 200,
          right: 50,
          bottom: 200,
          left: 50,
        },
        animated: true,
      });
  }

  const handleStart = () => {
     
  }

  return (
     <SafeAreaView style={styles.safeArea} >
        <StackHeader headerWrapperStyle={{position:"absolute",top:0,zIndex:2,opacity:.8}} title={locationsData[selectLocation.index].name} rightIcon={restartIcon} rightIconOnPress={handleMapRestart} />
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
          {locationsData.map((loc,index) => {
                 return <Marker key={index} title={loc.name} description={`${loc.name} Location`} coordinate={{longitude:parseFloat(loc.lon) , latitude : parseFloat(loc.lat)}} />
          })}
          <Polyline   
                    coordinates={locationsData.map(loc => ({
                                         latitude:  parseFloat(loc.lat),
                                         longitude: parseFloat(loc.lon)
                                                                }))}
                     strokeColor={colors.primary}
                     strokeWidth={2}     
                            />
        </MapView>
        <View style={styles.flatWrapper}>
             <View style={{height:"70%"}}>
             <FlatList
             data={[{},...locationsData,{}]}
             style={{flexGrow:1}}
             onScroll={(event) => {
                  const index = Math.floor(event.nativeEvent.contentOffset.y / 46)
                  if(index !== -1 && index <= locationsData.length -1)
                  {
                     handleChangeLocation(index)
                  }
                 
             }}
             scrollEventThrottle={16}
             keyExtractor={(item,index) => item.id || index}
             showsVerticalScrollIndicator={false}
             contentContainerStyle={styles.flatContainerWrapper}
             renderItem={({item,index}) => {
                 
                 return <SelectItem item={item}  isActive={index === selectLocation.index + 1}  />
             }}
          />
          </View>         
          <CustomTouchableButton buttonStyle={styles.bottomBtnStyl} text={"Let's Gooo"} onPress={handleStart} />
        </View> 
     </SafeAreaView>
  )
}

export default SelectedRoute

const styles = StyleSheet.create({
      safeArea : {
         flex:1,backgroundColor:colors.background,position:"relative"
      },
      backBtnWrapper : {
         position:"absolute",top:spaces.small,left:spaces.small,backgroundColor:colors.primary,width:40,height:40,borderRadius:borderRadius.circleRadius(40),opacity:.9,justifyContent:"center",alignItems:"center",zIndex:2
      },
      backBtnStyle : {
         width:30 , height: 30,
      },
      btnStyle : {
         width:"50%",height:40,backgroundColor:colors.primary
      },
      title: {
         fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight 
      },
      flatContainerWrapper : {
       gap:spaces.middle,borderRightColor:colors.darkGray,borderLeftColor:colors.darkGray,borderRightWidth:2,borderLeftWidth:2,borderStyle:"dashed",marginHorizontal:spaces.high
      },
      flatWrapper:{
        width:"100%",height:200,position:"absolute",bottom:0,backgroundColor:"rgba(255,255,255,.8)"
      },
      bottomBtnStyl : {
         marginVertical:"auto",height:"30",width:"auto",paddingHorizontal:spaces.high,backgroundColor:colors.primary,alignSelf:"center"
      }

})