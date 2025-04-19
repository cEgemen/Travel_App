
import { Image, Pressable, StyleSheet, View, ScrollView, Keyboard} from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, usePathname } from 'expo-router'
import SelecterMap from '../../../components/customPageComps/map/SelecterMap'
import { borderRadius, colors, spaces } from '../../../constands/appConstand'
import leftArrowIcon from "../../../assets/icons/left_arrow.png"
import useLocationStore from '../../../managments/locationStore'

const MapLayout = () => {
  const [keyboardIsShow , setKeyboardIsShow] = useState(false)
  const setEndData = useLocationStore(state => state.setEndData)
  const setStartData = useLocationStore(state => state.setStartData)
  const path = usePathname()
  console.log("path : ",path)
  const onBack = () => router.back()
  /* const onBack = () => {
     if(path === "/map/locDes")
     {
        setEndData(null)
     }
     else if(path === "/map/locStart")
     {
        setStartData(null)
     }
     router.back()    
  } */

  let topWrapperHeight = "60%"
  let bottomWrapperHeight = "40%"
  
  if(keyboardIsShow)
  {
    topWrapperHeight = "50%"
    bottomWrapperHeight = "50%"
  }

  useEffect(()=> {
         const showDidKeyboard = Keyboard.addListener("keyboardDidShow",() => {
             setKeyboardIsShow(true)
         })
         const hiddenDidKeyboard = Keyboard.addListener("keyboardDidHide",() => {
             setKeyboardIsShow(false)
         })

         return () => {
             showDidKeyboard.remove()
             hiddenDidKeyboard.remove()
         }
  },[])

  return (
    <>
       <Stack.Screen 
            options={{
                headerShown:false
            }} 
       />
       <Pressable style={styles.iconWrapper} onPress={onBack}>
         <Image style={styles.icon} source={leftArrowIcon} />
       </Pressable>
       <View style={styles.container}>
        <View style={{...styles.topWrapper,...{height:topWrapperHeight}}}>
          <SelecterMap />
        </View>
        <View style={{...styles.bottomWrapper,...{height:bottomWrapperHeight}}}>
               <Stack>
                 <Stack.Screen 
                    name='locStart'
                    options={{
                         headerShown:false
                    }}
                 />
                 <Stack.Screen
                    name='locDest'
                    options={{
                        headerShown:false
                    }}
                 />
                 <Stack.Screen
                    name="selectFilter"
                    options={{
                        headerShown:false
                    }}
                 />
               </Stack>
        </View>
    </View> 
    </>
    
  )
}

export default MapLayout

const styles = StyleSheet.create({
    container : {
         flex:1
    },
    iconWrapper:{
        position:"absolute",zIndex:5,top:spaces.middle,left:spaces.middle,width:40,height:40,borderRadius:borderRadius.circleRadius(40),backgroundColor:colors.primary,justifyContent:"center",alignItems:"center",opacity:0.9
    },
    icon : {
        width:30,height:30,tintColor:colors.background,
    },
    topWrapper:{
         width:"100%",
         justifyContent:"center",alignItems:"center"
    },
    bottomWrapper:{
         width:"100%",
    }
})