import { ActivityIndicator, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, elevation, fonts, spaces } from '../../constands'
import { router, Stack } from 'expo-router'
import leftArrowIcon from "../../assets/icons/left_arrow_short.png"
import {useRouteStore} from '../../managments'
import { detailResult } from '../../confs/groqPlaceDetail'
import { CustomTouchableButton } from '../../components'

const PlaceDetail = () => {
  const selectPlace = useRouteStore(state => state.selectPlace)
  const [data,setData] = useState(null)
  const handleBack = () => {
     router.back()
  }

  useEffect(() => {
      const fetchData = async () => {
       const result = await detailResult(selectPlace.name)
       console.log("result : ",JSON.parse(result.data))
       setData(JSON.parse(result.data))
                                   }
      fetchData()  
  },[])

  const handleSelectRoute = () => {
      router.push("/route/selectedRoute")
  }

  if(!data)
  {
     return <View style={{flex:1,backgroundColor:colors.background,justifyContent:"center",alignItems:"center"}}>
      <Stack.Screen options={{headerShown:false}} 
      />
               <ActivityIndicator size={"large"} color={colors.primary} />
            </View>
  }

  return (
    <>
      <Stack.Screen options={{headerTransparent:true,title:"",headerLeft:() => <>
                                                              <Pressable onPress={handleBack}>
                                                                <Image style={{width:30,height:30,tintColor:colors.backgroundDark}} source={leftArrowIcon} />
                                                              </Pressable>
                                                                               </>}} 
      />
      <SafeAreaView style={styles.safeArea}>
         <Image style={styles.placeImg} source={{uri:selectPlace.imageUrl}}/>
         <View style={styles.detailWrapper}>
          <Text style={styles.title}>{selectPlace.name}</Text>
          <View style={styles.descWrapper}>
           <Text style={styles.desc}>{data.summary}</Text>
          </View>
         </View>
         <CustomTouchableButton text={"Show In Map"} buttonStyle={styles.btnStyle} onPress={() => {handleSelectRoute}} />
     </SafeAreaView>
    </>
  )
}

export default PlaceDetail

const styles = StyleSheet.create({
    safeArea : {
      flex:1,backgroundColor:colors.background
    },
    placeImg : {
      width:"100%",resizeMode:"cover",
      height:"40%",borderBottomLeftRadius:spaces.high,borderBottomRightRadius:spaces.high,elevation:elevation.smallShadow
    },
    detailWrapper : {
      padding:spaces.middle
    },
    title : {
      fontSize:fonts.middleFontSize,fontWeight:fonts.middleFontWeight,marginBottom:spaces.high
    },
    descWrapper : {
      height:300,padding:spaces.high
    },
    desc : {
      fontSize:fonts.smallMidFontSize,fontWeight:fonts.smallFontWeight
    },
    btnStyle : {
      width:"50%",marginVertical:"auto",alignSelf:"center",backgroundColor:colors.primary
    }
})