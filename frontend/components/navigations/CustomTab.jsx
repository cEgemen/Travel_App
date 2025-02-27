

import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../constands/appConstand'

const CustomTab = ({focused,text,icon}) => {
  const tintColor = focused ? colors.primary : colors.lightGray
  const color = focused ? colors.primary : colors.lightGray
  const fontWeight = !focused ? fonts.smallFontWeight : fonts.middleFontWeight
  return (
    <View style={styles.tabWrapper}>
        <Image style={{...styles.tabIconStyle,...{tintColor,fontWeight}}} source={icon} />
        <Text style={{...styles.tabLabelStyle,...{color,fontWeight}}} >{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
          tabWrapper :  {
              width:"100%",height:"100%",
              justifyContent:"center",alignItems:"center",
          },
          tabIconStyle : {
               width:25,height:25,resizeMode:"contains",
               fontSize:fonts.smallFontSize
          },
          tabLabelStyle : {
               fontSize:fonts.smallFontSize
          }
})

export default CustomTab