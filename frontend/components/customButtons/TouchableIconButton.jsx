
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { borderRadius } from '../../constands/appConstand'


const TouchableIcon = ({icon=null,onPress=()=>{},iconStyle={},iconWrapperStyle={}}) => {
  return (
        <Pressable style={[styles.iconWrapper,iconWrapperStyle]} onPress={onPress}>
          <Image style={[styles.icon,iconStyle]} source={icon} />
        </Pressable>
         )
}

export default TouchableIcon

const styles = StyleSheet.create({
      iconWrapper : {
          justifyContent:"center",alignItems:"center"
      },
      icon : {
          width:30,height:30,borderRadius:borderRadius.circleRadius(30)
      }
})