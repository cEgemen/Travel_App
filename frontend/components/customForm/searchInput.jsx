import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import search from "../../assets/icons/search.png"
import { borderRadius, spaces } from '../../constands/appConstand'


const SearchInput = ({initialValue="",focusColor,placeholder,onClick=(value) => {},inputStyle}) => {
  const [isFocus,setIsFocus] = useState(false)
  const [value , setValue] = useState(initialValue)
  const onPasswordChangeType = () => {
        onClick(value)
  }
  return (
     <View style={{...style.wrapper,...{borderColor:isFocus ? focusColor : "transparent"},...inputStyle}}>
      <TextInput style={{...style.input}} 
      value={value}
      placeholder={placeholder} 
      placeholderTextColor={"rgba(0, 0, 0,.3)"} 
      secureTextEntry = {false}
      onChangeText={e => {setValue(e)}}
      onFocus={e => {setIsFocus(oldState => {return true})}}
      onBlur={e => setIsFocus(oldState => {return false})}      
       />

      <TouchableOpacity style={style.passwordIconWrapperStyle} onPress={onPasswordChangeType}>
        <Image style={style.passwordIconStyle} source={search} />
      </TouchableOpacity>   
    </View> 
  )
}

const style = StyleSheet.create({
      wrapper : {
           position:"relative",
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
export default SearchInput