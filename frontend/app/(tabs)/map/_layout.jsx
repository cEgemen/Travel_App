
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import Map from '../../../components/customPageComps/map/Map'
import { borderRadius, colors, spaces } from '../../../constands/appConstand'
import leftArrowIcon from "../../../assets/icons/left_arrow.png"

const MapLayout = () => {
  
  const onBack = () => {
     router.back()    
  }

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
        <View style={styles.topWrapper}>
          <Map />
        </View>
        <View style={styles.bottomWrapper}>
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
         height:"60%",
         justifyContent:"center",alignItems:"center"
    },
    bottomWrapper:{
         width:"100%",
         height:"50%"
    }
})