import {Image,ScrollView , StyleSheet, Text, View, Linking } from 'react-native'
import { useEffect, useState } from 'react'
import { borderRadius, colors, fonts, spaces } from '../../constands'
import {bookMarkIcon, fillBookMarkIcon,loadingLottie,mapIcon} from "../../assets"
import {useLocationStore, useRouteStore, useUserStore} from '../../managments'
import { detailResult } from '../../confs/groqPlaceDetail'
import { BasePageWrapper, SquareButton, StackHeader } from '../../components'
import { useDeleteFavPlace, useSaveFavPlace } from '../../hooks/query/queryHook'
import { useQueryClient } from '@tanstack/react-query'
import LottieView from 'lottie-react-native'
import MapView, { Marker } from 'react-native-maps'
import { getFallbackImageForCategory } from '../../utils/scanRoute'

const PlaceDetail = () => {
  const {id,token} = useUserStore(state => state.user)
  const filters = useLocationStore(state => state.filters)
  const selectPlace = useRouteStore(state => state.selectPlace)
  const [placeDetail,setPlaceDetail] = useState(null)
  const [isSaved , setIsSaved] = useState(false)
  const client = useQueryClient()
  const {mutate:savePlace,data,isPending:savePending} = useSaveFavPlace(token,client)
  const placeId =data?.ok_data.placeId
  const {mutate:deletePlace,isPending:deletePending} = useDeleteFavPlace(placeId,token,client)

  const {location,historical_summary:summary} = placeDetail || {location:null,name:null,historical_summary:null}
  const {name,lat,lon,imgUrl} = selectPlace

  useEffect(() => {
    
      const fetchData = async () => {
         const result = await detailResult({name,lat,lon})
         console.log("detailResult : ",JSON.parse(result.data))
          setPlaceDetail(JSON.parse(result.data))
      }
     if(!placeDetail)
     {
      fetchData()
     } 
      
  },[])  

 
  const openMap = () => {
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`).catch(err => console.log("err : ",err))
  }

  const handleSave = () => {
      if(isSaved !== true)
      {
         savePlace({...placeDetail,favOwner:id,lat,lon,imgUrl,summary,filterType:filters.places[0]})
      }
      else
      {
         deletePlace()
      }
       setIsSaved(oldState => !oldState)
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
                  <Image source={imgUrl === -1 ? getFallbackImageForCategory(filters.places[0]) : {uri:imgUrl}} style={{width:"100%",height:"100%",resizeMode:"cover"}} />
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

export default PlaceDetail

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