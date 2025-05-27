
import { StyleSheet, View, Keyboard, KeyboardAvoidingView, Platform, ScrollView} from 'react-native'
import { useEffect, useState } from 'react'
import { router, Stack, usePathname } from 'expo-router'
import {BasePageWrapper, SelecterMap} from '../../../components'
import { colors, spaces } from '../../../constands'
import { leftShortArrowIcon } from '../../../assets'
import {useLocationStore} from '../../../managments'
import {CircleTouchableIcon} from '../../../components'
import BaseKeyboardWrapper from '../../../components/baseWrappers/BaseKeyboardWrapper'

const MapLayout = () => {
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

  return (
    <>
       <Stack.Screen 
          options={{
              headerShown:false
          }}
       />
       <BasePageWrapper wrapperStyle={styles.container}>
          {({top,left,right,bottom}) => (
              <BaseKeyboardWrapper>
                {({keyboardHeight,keyboardIsShow}) => (
                     <>
                 <CircleTouchableIcon icon={leftShortArrowIcon} iconWrapperStyle={{...styles.iconWrapper,...{top:(spaces.small + top),left:(spaces.small + left)}}} onPress={onBack} />
                 <View style={{height:keyboardIsShow ? "35%" : "60%"}}>
                    <SelecterMap />
                 </View>
                 <View style={{flex:1,paddingBottom:keyboardHeight}}>
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
                     </>
                )}
              </BaseKeyboardWrapper>
          )}
       </BasePageWrapper>
    </>
    
  )
}

export default MapLayout

const styles = StyleSheet.create({
    container : {
         flex:1,backgroundColor:colors.background
    },
    iconWrapper:{
        position:"absolute",zIndex:5,opacity:0.9
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