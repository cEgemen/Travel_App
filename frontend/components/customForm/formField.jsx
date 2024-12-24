
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import openEye from "../../assets/icons/openEye.png"
import closeEye from "../../assets/icons/closeEye.png"


const FormField = ({value,labelText="",placeholder,keyboardType,onChange,containerStyle,textInputStyle}) => {
  const [isFocus,setIsFocus] = useState(false)
  const [isPasswordOpen , setIsPasswordOpen] = useState(false)
  const onPasswordChangeType = () => {
       setIsPasswordOpen(oldState => {
              return !oldState
       })
  }
  return (
    <View style={{...style.container,...containerStyle}}>
     <Text style={style.labelStyle}>{labelText}</Text>
     <View style={{...style.wrapper,...{borderColor:isFocus ? "orange" : "transparent"},...textInputStyle}}>
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
         color:"rgb(2, 2, 2)",
         width:"100%"
      }, 
      wrapper : {
           width:"100%",
           height:50,
           backgroundColor:"rgb(215, 206, 206)", 
           borderRadius:8,
           borderWidth:2,
           marginBottom:10
                },
       passwordIconWrapperStyle:{
             position:"absolute",
             right:5,
             top:12.5
       },         
       passwordIconStyle : {
              width:25,
              height:25,
              resizeMode:"contain"
       },         
      input : {
          height:"100%",
          paddingRight:30
      }          

})

export default FormField