import { Image,StyleSheet, Text, View } from 'react-native'
import { useCallback, useState } from 'react'
import { router, useFocusEffect } from 'expo-router'
import { colors, fonts, spaces } from '../../../constands'
import {AutoCompletSearchInput, CircleTouchableIcon} from '../../../components'
import {useLocationStore} from '../../../managments'
import { dottedWayIcon,rightShortArrowIcon} from '../../../assets'
import BaseKeyboardWrapper from '../../../components/baseWrappers/BaseKeyboardWrapper'

const LocStart = () => {
  const {setStartDetails,setEndDetails,locationDetails : {endDetails,startDetails}} = useLocationStore(state => state)
  const initialValue = startDetails || {locationName:null,lat:null,lon:null}
  const [startData,setStartData] = useState(initialValue)
  const startDataReady = (startData.lat !== null && startData.lon !== null && startData.locationName !== null)

  useFocusEffect(
   useCallback(() => {
           const {lat,lon,locationName} = endDetails || {lat : null , lon : null , locationName : null}
           if(lat !== null || lon !== null || locationName !== null)
           {
              setEndDetails(null)
           }
                     },[endDetails]
              ))

  const handlePress = (data) => {
        setStartData(oldState => {
            return {...data}
        })
        setStartDetails({...data})
                                }

  const goNext = () => {
       router.push("/map/locDest")
                       }

  let locTextStyle = {...styles.title}

  if(!startDataReady)
  {
        locTextStyle = {...locTextStyle,...{color:colors.gray}}
  }

  return (
     <>
       <View
         style={styles.container}>
            <View style={styles.locDetailWrapper}>
              <View style={styles.locDetailContainer}>
               <Text style={{...locTextStyle}} numberOfLines={1} >{(startDataReady) ? "📍"+(startData.locationName) : "❌ Your Start Location"}</Text>
               <Image source={dottedWayIcon} style={styles.iconSty} />
               <Text style={{...styles.title,color:colors.gray}} numberOfLines={1}>❌ Your Destination Location</Text>
              </View>
              <CircleTouchableIcon icon={rightShortArrowIcon} isDisable={!startDataReady} onPress={goNext} /> 
            </View>
            <View style={{flex:1}}>
             <View style={{marginVertical:"auto"}}>
              <Text style={styles.autoSearchLabel}>Search Start Location</Text>
              <AutoCompletSearchInput onPress={handlePress} focusColor={colors.primary} infoCount={2} placeholder='İstanbul,London,Milano,Madrid,...' />
             </View>  
            </View>
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
    locDetailWrapper : {
        flexDirection:"row",alignItems:"center"
                       },
    locDetailContainer : {
       flex:1
    },
    title:{
       fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight
    },
    subTitle : {
        fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight,marginBottom:spaces.small,color:colors.darkGray
    },
    iconSty:{
       width:"30",
       height:"30",
       resizeMode:"contain"
    },
    autoSearchLabel : {
       paddingLeft:spaces.small,color:colors.gray
    }
})