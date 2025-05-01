
import { StyleSheet, View, Keyboard} from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, usePathname } from 'expo-router'
import {SelecterMap, TouchableIcon} from '../../../components'
import { borderRadius, colors, spaces } from '../../../constands'
import { leftShortArrowIcon } from '../../../assets'
import {useLocationStore} from '../../../managments'
import {CircleTouchableIcon} from '../../../components'

const MapLayout = () => {
  const [keyboardIsShow , setKeyboardIsShow] = useState(false)
  const setEndData = useLocationStore(state => state.setEndData)
  const setStartData = useLocationStore(state => state.setStartData)
  const path = usePathname()
  const onBack = () => {
     if(path === "/map/locDes")
     {
        setEndData(null)
     }
     else if(path === "/map/locStart")
     {
        setStartData(null)
     }
     router.back()    
  }

  let topWrapperHeight = "60%"
  let bottomWrapperHeight = "40%"
  
  if(keyboardIsShow)
  {
    topWrapperHeight = "52%"
    bottomWrapperHeight = "48%"
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
       <CircleTouchableIcon onPress={onBack} iconWrapperStyle={styles.iconWrapper} icon={leftShortArrowIcon} iconWidth={styles.icon.width} />
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
        position:"absolute",zIndex:5,top:spaces.middle,left:spaces.middle,opacity:0.9
    },
    icon : {
        width:30
    },
    topWrapper:{
         width:"100%",
         justifyContent:"center",alignItems:"center"
    },
    bottomWrapper:{
         width:"100%",
    }
})