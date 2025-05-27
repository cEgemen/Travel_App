import { ActivityIndicator, Image,ScrollView , SafeAreaView, StyleSheet, Text, View, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack } from 'expo-router'
import { borderRadius, colors, elevation, fonts, spaces } from '../../constands'
import {bookMarkIcon, fillBookMarkIcon, leftShortArrowIcon,mapIcon} from "../../assets"
import {useRouteStore, useUserStore} from '../../managments'
import { detailResult } from '../../confs/groqPlaceDetail'
import { CircleTouchableIcon, CustomTouchableButton, PlaceDetailDataCard, TouchableIcon } from '../../components'
import { useDeleteFavPlace, useSaveFavPlace } from '../../hooks/query/queryHook'
import { useQueryClient } from '@tanstack/react-query'

const PlaceDetail = () => {
  const {id,token} = useUserStore(state => state.user)
  const selectPlace = useRouteStore(state => state.selectPlace)
  const [placeDetail,setPlaceDetail] = useState(null)
  const [isSaved , setIsSaved] = useState(false)
  const client = useQueryClient()
  const {mutate:savePlace,data,isPending:savePending} = useSaveFavPlace(token,client)
  const placeId =data?.ok_data.placeId
  const {mutate:deletePlace,isPending:deletePending} = useDeleteFavPlace(placeId,token,client)
  const {activities,bestTimeToVisit,estimatedCost,localTips,location,summary} = placeDetail || {activities : null,bestTimeToVisit:null,estimatedCost:null,localTips:null,location:null,name:null,summary:null}

  useEffect(() => {
    
      const fetchData = async () => {
         const result = await detailResult({name:selectPlace.name,lat:selectPlace.lat,lon:selectPlace.lon})
         console.log("result : ",result)
         setPlaceDetail(JSON.parse(result.data))
      }
     if(!placeDetail)
     {
      fetchData()
     } 
      
  },[])  

 
  const openMap = () => {
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${selectPlace.lat},${selectPlace.lon}`).catch(err => console.log("err : ",err))
  }

  const handleSave = () => {
      if(isSaved !== true)
      {
         savePlace({...placeDetail,favOwner:id,lat:selectPlace.lat,lon:selectPlace.lon,imgUrl:selectPlace.imageUrl})
      }
      else
      {
         deletePlace()
      }
       setIsSaved(oldState => !oldState)
  }

  const handleBack = () => {
     router.back()
  }

  return (
    <>
        <SafeAreaView style={styles.safeAreaStyle}>
         { 
          placeDetail === null ? 
          <View style={styles.loadingContainer} >
           <ActivityIndicator size={"large"} color={colors.primary} />
          </View> : 
          <>
            <CircleTouchableIcon icon={leftShortArrowIcon} iconWrapperStyle={styles.headerCircleBackBtnStyle} onPress={() => handleBack()} />
            <View style={{position:"absolute",top:spaces.small,right:spaces.small,zIndex:2}}>
              {(savePending || deletePending) ? <ActivityIndicator size={"large"} color={colors.primary} /> : <CircleTouchableIcon icon={isSaved ? fillBookMarkIcon : bookMarkIcon} iconWrapperStyle={{...{backgroundColor:isSaved ? colors.background : colors.primary}}} iconStyle={{tintColor:isSaved ? colors.primary : colors.background}} onPress={handleSave} />}
            </View>
            <View style={styles.imgContainer}>
             <Image source={{uri:selectPlace.imgUrl
              }} style={styles.imgStyles} />
             <View style={{width:"100%",height:"45",backgroundColor:"rgba(255,255,255,.7)",position:"absolute",bottom:0,left:0}}>
              <Text style={styles.headerTitle}>{selectPlace.name}</Text>
             </View>
            </View>
            <ScrollView style = {styles.contentContainer}>
            
             <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
              <PlaceDetailDataCard labelText={"📌 Location"} dataDetail={location} />
              <TouchableIcon icon={mapIcon} iconStyle={{tintColor:colors.primary}} iconWrapperStyle={{marginBottom:spaces.high}} onPress={openMap} />
             </View> 
             <PlaceDetailDataCard labelText={"📖 Summary"}  dataDetail={summary}   />
             <PlaceDetailDataCard labelText={"💰 Estimated Cost"} dataDetail={estimatedCost} />
             <PlaceDetailDataCard labelText={"💥 Activities"} dataDetail={activities} isActiveClickable />
             <PlaceDetailDataCard labelText={"⏰ Best Time to Visit"} dataDetail={bestTimeToVisit} isActiveClickable />
             <PlaceDetailDataCard labelText={"📓 Local Tips"} dataDetail={localTips} isActiveClickable />

            </ScrollView>
          </>
         }
        </SafeAreaView> 
    </>
  )
}

export default PlaceDetail

const styles = StyleSheet.create({
     safeAreaStyle : {
         flex:1,backgroundColor:colors.background,position:"relative"
     },
     loadingContainer : {
         flex:1,justifyContent:"center",alignItems:"center"
      },
     headerCircleBackBtnStyle : {
        opacity:.8,zIndex:2,
        position:"absolute",top:spaces.small,left:spaces.small  
     },
     imgContainer : {
         width:"100%",height:"40%",backgroundColor:colors.primary,borderBottomLeftRadius:borderRadius.highRadius*1.8,borderBottomRightRadius:borderRadius.highRadius*1.8,position:"relative",overflow:"hidden"
     },
     imgStyles : {
         width:"100%",height:"100%",resizeMode:"cover"
     },
     headerTitle : {
        position:"absolute",bottom:spaces.small,left:spaces.middle,fontSize:fonts.middleHighFontSize,fontWeight:fonts.middleFontWeight,color:colors.primary
     },
     contentContainer : {
       flex:1,padding:spaces.middle
     },
})