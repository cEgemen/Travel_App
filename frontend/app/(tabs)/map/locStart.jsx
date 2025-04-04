
import { ActivityIndicator,ScrollView, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { router, Stack } from 'expo-router'
import { colors, fonts, spaces } from '../../../constands/appConstand'
import AutoCompletSearchInput from '../../../components/customPageComps/home/AutoCompletSearchInput'
import CustomTouchableButton from '../../../components/customButtons/CustomTouchableButton'
import useLocationStore from '../../../managments/locationStore'

const LocStart = () => {
  const [startData,setStartData] = useState({locationName:null,lat:null,lot:null})
  const setStartDetails = useLocationStore(state => state.setStartDetails)
  const handlePress = (data) => {
        setStartData(oldState => {
            return {...data}
        })
        setStartDetails({...data})
  }

  const goNext = () => {
       router.push("/map/locDest")
  }

  return (
     <>
       <View style={styles.container}>
            <View>
              <Text style={styles.title} numberOfLines={1} >📍{startData.locationName ?? "E.g. Berlin, Paris, Istanbul"}</Text>
            </View>
            <AutoCompletSearchInput onPress={handlePress} focusColor={colors.primary} infoCount={2} /> 
            <CustomTouchableButton onPress={goNext} text={"Continue"} buttonStyle={styles.buttonStyle}  disabled={(startData.locationName === null || startData.lat === null || startData.lot === null)} />
       </View> 
     </>
  )
}

export default LocStart

const styles = StyleSheet.create({
    container : {
        backgroundColor:colors.background,
        flex:1,paddingVertical:spaces.small,paddingHorizontal:spaces.middle
    },
    title:{
       fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight,marginTop:spaces.small,marginBottom:spaces.high
    },
    buttonStyle:{
       backgroundColor:colors.primary,
       color:colors.background,
       width:"60%",alignSelf:"center",marginVertical:"auto"
    }
})