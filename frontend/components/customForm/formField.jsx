
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import openEye from "../../assets/icons/openEye.png"
import closeEye from "../../assets/icons/closeEye.png"
import { borderRadius, spaces } from '../../constands/appConstand'


const FormField = ({value,labelText="",focusColor,placeholder,keyboardType,onChange,containerStyle,inputStyle,textInputStyle}) => {
  const [isFocus,setIsFocus] = useState(false)
  const [isPasswordOpen , setIsPasswordOpen] = useState(false)
  const onPasswordChangeType = () => {
       setIsPasswordOpen(oldState => {
              return !oldState
       })
  }
  return (
    <View style={{...style.container,...containerStyle}}>
     <Text style={{...style.labelStyle,...textInputStyle}}>{labelText}</Text>
     <View style={{...style.wrapper,...{borderColor:isFocus ? focusColor : "transparent"},...inputStyle}}>
      <TextInput style={{...style.input}} 
      value={value}
      placeholder={placeholder} 
      placeholderTextColor={"rgba(0, 0, 0,.3)"} 
      keyboardType={keyboardType}
      secureTextEntry = {labelText.toUpperCase() === "PASSWORD" ? isPasswordOpen : false}
      onChangeText={e => onChange(e)}
      onFocus={e => {setIsFocus(oldState => {return true})}}
      onBlur={e => setIsFocus(oldState => {return false})}      
       />

    {labelText.toUpperCase() === "PASSWORD" && <TouchableOpacity style={style.passwordIconWrapperStyle} onPress={onPasswordChangeType}>
        <Image style={style.passwordIconStyle} source={isPasswordOpen ? openEye : closeEye} />
      </TouchableOpacity> }
       
    </View> 
    </View>
    
  )
}

const style = StyleSheet.create({
      container : {
        width:"100%",
        position:"relative"
      },
      labelStyle:{
         color:"rgba(0,0,0,.8)",
         width:"100%",
         marginBottom:spaces.small
      }, 
      wrapper : {
           width:"100%",
           height:50,
           backgroundColor:"rgb(202, 208, 226)", 
           borderRadius:borderRadius.middleRadius,
           borderWidth:2,
                },
       passwordIconWrapperStyle:{
             position:"absolute",
             right:5,
             top:12.5
       },         
       passwordIconStyle : {
              width:25,
              height:25,
              resizeMode:"contain",
              tintColor:"rgba(0,0,0,.8)"
       },         
      input : {
          height:"100%",
          paddingRight:30
      }          

})

export default FormField