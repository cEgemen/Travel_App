
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { useUserStore } from '../managments'
import { useDeleteFavPlace, useGetFavPlace, useSaveFavPlace } from '../hooks/query/queryHook'
import { useQueryClient } from '@tanstack/react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import { borderRadius, colors, fonts, spaces } from '../constands'
import { CircleTouchableIcon, PlaceDetailDataCard, TouchableIcon } from '../components'
import { bookMarkIcon, fillBookMarkIcon, leftArrowIcon, leftShortArrowIcon, mapIcon } from '../assets'
import { useEffect, useState } from 'react'

const DynamicPlace = () => {
  const {placeId} = useLocalSearchParams()
  const {token} = useUserStore(state => state.user)
  const dummyToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMkBnbWFpbC5jb20iLCJleHAiOjE3NDc2NTA5ODB9.5ODmXrjt94NLBhfcYrflYaFWw_Fhr_V-6I5ND-cAY4I" 
  const {data,refetch} = useGetFavPlace(placeId,dummyToken,false)
  const [placeData , setPlaceData] = useState(null)
  const [isSaved , setIsSaved] = useState(true)
  const client = useQueryClient()
  const {mutate:savePlace,isPending:savePending} = useSaveFavPlace(dummyToken,client)
  const {mutate:deletePlace,isPending:deletePending} = useDeleteFavPlace(placeId,dummyToken,client)
  const {id,lat,lon,favOwner,imgUrl,activities,bestTimeToVisit,estimatedCost,localTips,location,name,summary} = placeData || {id:null,lat:null,lon:null,favOwner:null,imgUrl:null,activities : null,bestTimeToVisit:null,estimatedCost:null,localTips:null,location:null,name:null,summary:null}
  
  useEffect(() => {
           const fetchData = async () => {
              const {data} = await refetch()
              if(data.isSuccess !== null)
              {
                setPlaceData(data.ok_data.data)
              }
           }
                 fetchData()
  },[])

  const openMap = () => {
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`).catch(err => console.log("err : ",err))
  }

  const handleSave = () => {
      if(isSaved !== true)
      {
         savePlace({id,lat,lon,favOwner,imgUrl,activities,bestTimeToVisit,estimatedCost,localTips,location,name,summary})
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
         <View style={styles.headerContainer}>
           <TouchableIcon icon={leftArrowIcon} iconStyle={styles.headerIconStyl} onPress={handleBack} />
           <Text style={{fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight}}>Place ID # {placeId.substring(0,7)}</Text>
           {
              (savePending || deletePending) ? <ActivityIndicator size={"large"} color={colors.primary} /> : <CircleTouchableIcon icon={isSaved ? fillBookMarkIcon : bookMarkIcon} iconWrapperStyle={{...{backgroundColor:isSaved ? colors.background : colors.primary}}} iconStyle={{tintColor:isSaved ? colors.primary : colors.background}} onPress={handleSave} />
           }
         </View>
         { 
          placeData === null ? 
          <View style={styles.loadingContainer} >
           <ActivityIndicator size={"large"} color={colors.primary} />
          </View> : 
          <>
            <View style={styles.imgContainer}>
             <Image source={{uri:imgUrl
              }} style={styles.imgStyles} />
             <Text style={styles.headerTitle}>{name}</Text>
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


export default DynamicPlace

const styles = StyleSheet.create({
     safeAreaStyle : {
         flex:1,backgroundColor:colors.background,position:"relative"
     },
     headerContainer : {
         width:"100%",backgroundColor:"rgba(255,255,255,.8)",flexDirection:"row",justifyContent:"space-between",alignItems:"center",height:60,position:"absolute",top:0,zIndex:5,paddingHorizontal:spaces.small
     },
     headerIconStyl : {
         width:30,height:30,tintColor:colors.backgroundDark
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
        position:"absolute",bottom:spaces.small,left:spaces.middle,fontSize:fonts.middleHighFontSize,fontWeight:fonts.middleFontWeight,color:colors.gray
     },
     contentContainer : {
       flex:1,padding:spaces.middle
     },
})