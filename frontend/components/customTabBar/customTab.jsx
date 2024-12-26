

import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { fonts } from '../../constands/appConstand'

const CustomTab = ({focused,text,icon,color}) => {
  return (
    <View style={styles.tabWrapper}>
        <Image style={{...styles.tabIconStyle,...{tintColor: color,fontWeight:!focused ? fonts.smallFontWeight : fonts.middleFontWeight
}}} source={icon} />
        <Text style={{...styles.tabLabelStyle,...{color:color,fontWeight:!focused ? fonts.smallFontWeight : fonts.middleFontWeight
}}} >{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
          tabWrapper :  {
              justifyContent:"center",
              alignItems:"center"
          },
          tabIconStyle : {
              
               width:25,height:25,resizeMode:"cover",
               fontSize:fonts.smallFontSize
          },
          tabLabelStyle : {
               fontSize:fonts.smallFontSize
          }
})

export default CustomTab