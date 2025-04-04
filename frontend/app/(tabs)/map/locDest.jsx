import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colors, fonts, spaces } from '../../../constands/appConstand'
import useLocationStore from '../../../managments/locationStore'
import dottedWayIcon from "../../../assets/icons/dottedWay.png"
import AutoCompletSearchInput from '../../../components/customPageComps/home/AutoCompletSearchInput'
import CustomTouchableButton from '../../../components/customButtons/CustomTouchableButton'

const LocDest = () => {
  const {locationDetails,setEndDetails} = useLocationStore(state => state);
  const [endData,setEndData] = useState({locationName:null,lat:null,lot:null})
  const handleSelect = (data) => {
       setEndData(oldState => ({...data}))
       setEndDetails({...data})
  }
  return (
    <View style={styles.container}>
     <View>
      <Text style={styles.title} numberOfLines={1} >📍{locationDetails.startDetails.locationName}</Text>
      <Image style={styles.icon} source={dottedWayIcon} />
      <Text style={[styles.title,{marginBottom:spaces.middle}]} numberOfLines={1} >📍{endData.locationName ?? "E.g. Berlin, Paris, Istanbul"}</Text>
     </View>
     <AutoCompletSearchInput onPress={handleSelect} focusColor={colors.primary} infoCount={2} /> 
     <CustomTouchableButton onPress={()=>{}} text={"Generate"} buttonStyle={styles.buttonStyle}  disabled={(endData.locationName === null || endData.lat === null || endData.lot === null)} />
</View> 
  )
}

export default LocDest

const styles = StyleSheet.create({
      container : {
            backgroundColor:colors.background,
            flex:1,paddingVertical:spaces.small,paddingHorizontal:spaces.middle
        },
        title:{
           fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight
        },
        icon:{
           width:25,height:25,resizeMode:"contain",marginLeft:spaces.small
        }, 
        buttonStyle:{
           backgroundColor:colors.primary,
           color:colors.background,
           width:"60%",alignSelf:"center",marginTop:spaces.high
        }
})