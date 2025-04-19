
import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { router, Stack } from 'expo-router'
import { colors, fonts, spaces } from '../../../constands/appConstand'
import AutoCompletSearchInput from '../../../components/customPageComps/home/AutoCompletSearchInput'
import CustomTouchableButton from '../../../components/customButtons/CustomTouchableButton'
import useLocationStore from '../../../managments/locationStore'
import { SafeAreaView } from 'react-native-safe-area-context'

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
       <SafeAreaView style={styles.container}>
            <View>
              <Text style={styles.title} numberOfLines={1} >📍{startData.locationName ?? "E.g. Berlin, Paris, Istanbul"}</Text>
            </View>
            <AutoCompletSearchInput onPress={handlePress} focusColor={colors.primary} infoCount={2} /> 
            <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
             <CustomTouchableButton onPress={goNext} text={"Continue"} buttonStyle={styles.buttonStyle}  disabled={(startData.locationName === null || startData.lat === null || startData.lot === null)} />
            </View>
       </SafeAreaView> 
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
       fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight,marginBottom:spaces.high
    },
    subTitle : {
        fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight,marginBottom:spaces.small,color:colors.darkGray
    },
    buttonStyle:{
       backgroundColor:colors.primary,
       color:colors.background,
       width:"35%",alignSelf:"center",marginVertical:"auto"
    }
})