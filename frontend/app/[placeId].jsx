
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { useUserStore } from '../managments'
import { useDeleteFavPlace, useGetFavPlace, useSaveFavPlace } from '../hooks/query/queryHook'
import { useQueryClient } from '@tanstack/react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import { borderRadius, colors, fonts, spaces } from '../constands'
import { BasePageWrapper, CircleTouchableIcon, PlaceDetailDataCard, SquareButton, StackHeader, } from '../components'
import { bookMarkIcon, fillBookMarkIcon, leftArrowIcon, leftShortArrowIcon, loadingLottie, mapIcon } from '../assets'
import { useEffect, useState } from 'react'
import LottieView from 'lottie-react-native'
import { getFallbackImageForCategory } from '../utils/scanRoute'
import MapView, { Marker } from 'react-native-maps'

const DynamicPlace = () => {
  const {placeId} = useLocalSearchParams()
  const {token} = useUserStore(state => state.user)
  const {data,refetch} = useGetFavPlace(placeId,token,false)
  const [placeDetail , setPlaceDetail] = useState(null)
  const [isSaved , setIsSaved] = useState(true)
  const client = useQueryClient()
  const {mutate:savePlace,isPending:savePending} = useSaveFavPlace(token,client)
  const {mutate:deletePlace,isPending:deletePending} = useDeleteFavPlace(placeId,token,client)
  const {id,lat,lon,favOwner,imgUrl,filterType,location,name,summary} = placeDetail || {id:null,lat:null,lon:null,favOwner:null,imgUrl:null,filterType:null,location:null,name:null,summary:null}
  
  useEffect(() => {
           const fetchData = async () => {
              const {data} = await refetch()
              if(data.isSuccess !== null)
              {
                setPlaceDetail(data.ok_data.data)
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
           savePlace({...placeDetail,favOwner:id,lat,lon,imgUrl,filterType:filters.places[0]})
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
        <BasePageWrapper wrapperStyle={[styles.container]}>
          {({top,bottom,right,left}) => (
                    
          (placeDetail === null ? 
          
          <View style={styles.loadingContainer} >
           <LottieView source={loadingLottie} loop autoPlay style={{width:"90%",height:"100%"}} />
          </View> : 

          <>
   
               <View style={{width:"100%",height:250}} >
                  <StackHeader 
                  headerWrapperStyle={styles.stackHeaderWrapperStyle} 
                  isBack
                  backIconWrapperStyle={styles.iconWrapper}
                  RightComp={() =>   <SquareButton
                                      icon={isSaved ? fillBookMarkIcon : bookMarkIcon} 
                                      contentStyle={{tintColor:isSaved ? colors.primary : colors.darkGray}}
                                      onClick={handleSave}
                                     />
                  }
                  />
                  <Image source={parseInt(imgUrl) === -1 ? getFallbackImageForCategory(filterType) : {uri:imgUrl}} style={{width:"100%",height:"100%",resizeMode:"cover"}} />
               </View>

               <ScrollView style={styles.scrollContentSty} showsVerticalScrollIndicator={false}>
                  <View style={styles.detailWrapper}>
                   <Text style={styles.title}>{name}</Text>  
                   <Text style={styles.subTitle} >{location}</Text> 
                  </View>
                  <View style={styles.detailWrapper} >
                     <Text style={styles.title}>About This Spot</Text>
                     <Text style={styles.subTitle}>
                      {summary}
                     </Text>
                  </View>
                  <View style={{...styles.detailWrapper,marginBottom:0}}>
                     <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                        <Text style={styles.title}>Location</Text>
                        <SquareButton icon={mapIcon} onClick={openMap} contentStyle={{tintColor:colors.darkGray}} />
                     </View>
                     <View style={styles.mapWrapper}>
                        <MapView 
                         style={{width:"100%",height:"100%"}} 
                         initialRegion={{
                           latitude:lat,latitudeDelta:0.003,
                           longitude:lon,longitudeDelta:0.003  
                                        }}>
                        <Marker coordinate={{latitude:lat,longitude:lon}}></Marker>                  
                                        </MapView> 
                     </View>
                  </View>
               </ScrollView>


          </>)
         
          )}
        </BasePageWrapper> 
    </>
  )
}


export default DynamicPlace

const styles = StyleSheet.create({
     container : {
         flex:1,backgroundColor:colors.background,position:"relative"
     },
     loadingContainer : {
         flex:1,justifyContent:"center",alignItems:"center"
      },
     stackHeaderWrapperStyle : {
      width:"100%",height:"auto",position:"absolute",
      top:0,zIndex:1,backgroundColor:"transparent",paddingHorizontal:spaces.middle
                              },
      scrollContentSty : {
        flexGrow:1,padding:spaces.middle
      }  ,     
      detailWrapper : {
         rowGap:spaces.small,marginBottom:spaces.high
       }  ,        
      iconWrapper : {
          width:40,height:40,justifyContent:"center",alignItems:"center",
          borderRadius:borderRadius.middleRadius,backgroundColor:colors.lightGray
               },     
       mapWrapper : {
         width:"100%",height:250
        },
      title : {
          fontSize:fonts.middleFontSize,fontWeight:fonts.middleFontWeight
      },
      subTitle : {
          fontSize:fonts.smallMidFontSize-2,fontWeight:fonts.smallFontWeight
      },
})