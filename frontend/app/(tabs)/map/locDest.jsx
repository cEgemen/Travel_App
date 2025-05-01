import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colors, fonts, spaces } from '../../../constands'
import {useLocationStore} from '../../../managments'
import {dottedWayIcon,rightShortArrowIcon} from "../../../assets"
import {AutoCompletSearchInput,CircleTouchableIcon} from '../../../components'
import { router } from 'expo-router'

const LocDest = () => {
  const {locationDetails,setEndDetails} = useLocationStore(state => state);
  const [endData,setEndData] = useState({locationName:null,lat:null,lon:null})
  const endDataReady = endData.lat !== null && endData.lon !== null && endData.locationName !== null
  
  const handleSelect = (data) => {
       setEndData(oldState => ({...data}))
       setEndDetails(data)
      }
  
  const goToSelectFilter = () => {
      router.push("/map/selectFilter")
  } 

  let locTextStyl = {...styles.title}
  
  if(!endDataReady)
  {
     locTextStyl = {...locTextStyl,color:colors.gray}
  }

  return (
    <View style={styles.container}>
     <View style={styles.locDetailWrapper}>
       <View style={styles.locDetailContainer}>
        <Text style={styles.title} numberOfLines={1} >📍{locationDetails.startDetails.locationName}</Text>
        <Image style={styles.icon} source={dottedWayIcon} />
        <Text style={[locTextStyl,{marginBottom:spaces.middle}]} numberOfLines={1} >{endDataReady ? "📍"+endData.locationName :  "❌ Your Destination Location"}</Text>
       </View>
       <CircleTouchableIcon icon={rightShortArrowIcon} isDisable={!endDataReady} onPress={goToSelectFilter} />
     </View>
     <View style={{flex:1}}>
      <View style={{marginVertical:"auto"}}>
       <Text style={styles.autoCompLabel} >Search Destination Location</Text>
       <AutoCompletSearchInput onPress={handleSelect} focusColor={colors.primary} infoCount={2} placeholder='İstanbul,London,Milano,Madrid,...' />  
      </View>
     </View>
    </View> 
  )
}

export default LocDest

const styles = StyleSheet.create({
        container : {
            backgroundColor:colors.background,
            flex:1,paddingVertical:spaces.small,paddingHorizontal:spaces.middle
        },
        locDetailWrapper : {
         flexDirection:"row",alignItems:"center"
                       },
        locDetailContainer : {
           flex:1
        },
        title:{
           fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight
        },
        icon:{
           width:25,height:25,resizeMode:"contain",marginLeft:spaces.small
        }, 
        autoCompLabel:{
         paddingLeft:spaces.small,
         color:colors.gray
                      }
})