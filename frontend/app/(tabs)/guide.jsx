
import { StyleSheet,FlatList, ActivityIndicator, View, Text, Pressable, Image  } from 'react-native'
import { useState } from 'react'
import {  SafeAreaView } from 'react-native-safe-area-context'
import { colors, fonts, spaces } from '../../constands'
import { router, Stack } from 'expo-router'
import {AutoCompletSearchInput,BasePageWrapper,FavGuideCard, StackHeader} from '../../components'
import {useGuideStore,useUserStore} from '../../managments'
import downIcon from "../../assets/icons/downArrow.png"
import upIcon from "../../assets/icons/upArrow.png"
import { useGetOwnerFavGuides } from '../../hooks/query/queryHook'
import favImg from "../../assets/images/fav.png"


const Guide = () => {
  const [orderState,setOrderState] = useState(1)  
  const setGuideInfo = useGuideStore(state => state.setGuideInfo)
  const {id,token} = useUserStore(state => state.user)
  const selectLocation = (location) => {
          setGuideInfo({type:"location",data:location.locationName})
          router.push("/guide/selectTravelDates")
    }

   const {data,isError,isLoading} = useGetOwnerFavGuides(id,orderState,token)
   const handleSort = (mod)=> {
       setOrderState(mod)
   } 
   const flatData = isLoading ? [" "] : data.ok_data.data
  return (
      <BasePageWrapper wrapperStyle={styles.container}>
         {({bottom}) => {
             return <>
                           <Stack.Screen 
             options={{
                headerShown:false
             }}
          />
         <View style={{flex:1 ,paddingHorizontal:spaces.high}}>
             <StackHeader title={"Trip Guide"} />
             <AutoCompletSearchInput onPress={(data) => {
                selectLocation(data)
             }} focusColor={colors.primary} placeholder='Enter Location ...' searchWrapperStyle={{marginBottom:spaces.small}} />
             <View style={styles.flatHeaderWrapper}>
                <Text style={styles.flatHeaderText}>Favorite Guides</Text>
                  <View style={styles.flatHeaderIconButtonsContainer}>
                  <Pressable onPress={() => handleSort(1)}>
                    <Image style={[styles.flatHeaderIcon,{elevation:orderState === 1 ? 4 : 0,borderColor:orderState === 1 ? colors.primary : colors.gray,tintColor:orderState === 1 ? colors.primary : colors.gray}]} source={upIcon} />
                  </Pressable>
                  <Pressable onPress={() => {handleSort(2)}}>
                    <Image  style={[styles.flatHeaderIcon,{elevation:orderState === 2 ? 4 : 0,borderColor:orderState === 2 ? colors.primary : colors.gray,tintColor:orderState === 2 ? colors.primary : colors.gray}]} source={downIcon} />
                  </Pressable>
                  </View>
             </View>
               { 
              <FlatList 
                    data={flatData}
                    keyExtractor={(item,index) => index}
                    contentContainerStyle={{flexGrow:1}} 
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => {
                                  return <View style={styles.flatEmptyWrapper}>
                                                <Image style={styles.emptyImage} source={favImg} />
                                          </View>
                              }}
                   renderItem={({item,index}) => {
                        const content = isLoading ?  <View style={{height:"100%",justifyContent:"center",alignItems:"center"}}>
                <ActivityIndicator size={"large"} color={colors.primary} />
              </View> : <FavGuideCard guide={item} />
                          return content;
                   }}
              />}
         </View> 
                    </>
         }}
         
      </BasePageWrapper>
  )
}

export default Guide

const styles = StyleSheet.create({
     container : {
         flex:1,backgroundColor:colors.background
     },
     flatContainerStyle:{
        gap:spaces.small
     },
     flatHeaderWrapper:{
         marginBottom:spaces.middle,marginTop:spaces.high,flexDirection:"row",justifyContent:"space-between",alignItems:"center"
     },
     flatHeaderText:{
       fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight,color:colors.gray
     },
     flatHeaderIconButtonsContainer:{
        flexDirection:"row",justifyContent:"center",gap:spaces.middle
     },
     flatHeaderIcon:{
         width:25,height:25,resizeMode:"contain",borderWidth:1,backgroundColor:colors.background
     },
     flatEmptyWrapper:{
         flex:1
    },
    emptyImage : {
        width:"100%",height:"500",resizeMode:"cover"
     },
})