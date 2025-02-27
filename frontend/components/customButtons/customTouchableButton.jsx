
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'

const CustomTouchableButton = (
      {
      text,onPress,buttonStyle={},
      textStyle={},disabled=false,isLoading=false,indicatorColor="white"
      }
                              ) => {
  return (
      <TouchableOpacity disabled={disabled} activeOpacity={0.7} style={{...styles.btn,...buttonStyle}} onPress={onPress}>
            {isLoading ? <ActivityIndicator size={"large"} color={indicatorColor} /> : <Text style={{...styles.txt,...textStyle}}>{text}</Text>} 
      </TouchableOpacity>
         )
}

const styles = StyleSheet.create({
      btn : {
            backgroundColor:"orange",
            borderRadius:10,
            display:"flex",
            justifyContent:"center",
            width:"100%",
            height:"50",
      },
      txt : {
          textAlign:"center",
          alignContent:"center",
          fontSize:20,
          fontWeight:400,
          color:"white"
      }
});

export default CustomTouchableButton