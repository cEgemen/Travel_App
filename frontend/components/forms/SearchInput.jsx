import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import search from "../../assets/icons/search.png"
import { borderRadius, colors, elevation, spaces } from '../../constands'


const SearchInput = ({initialValue="",focusColor=colors.gray,placeholder="",onClick=(value) => {},onChangeCallback=(text)=>{},onEndEditing=(value)=>{},inputStyle={},isVisibleClickableIcon=true,clearText=false}) => {
  const [isFocus,setIsFocus] = useState(false)
  const [value , setValue] = useState(initialValue)
  const onSearch = () => {
        onClick(value)
  }
  
  useEffect(() => {
      if(clearText)
      {
         setValue("")
      }
  },[clearText])

  return (
     <View style={{...style.wrapper,...{borderColor:isFocus ? focusColor : colors.gray},...inputStyle}}>
      <TextInput style={{...style.input}} 
      onEndEditing={() => onEndEditing(value)}
      value={value}
      placeholder={placeholder} 
      placeholderTextColor={colors.gray} 
      secureTextEntry = {false}
      numberOfLines={1}
      onChangeText={text => {
        setValue(text)
        onChangeCallback(text)
        }}
      onFocus={e => {setIsFocus(true)}}
      onBlur={e => setIsFocus(false)}      
       />

      {isVisibleClickableIcon && <TouchableOpacity style={style.iconWrapperStyle} onPress={onSearch}>
        <Image style={style.iconStyle} source={search} />
      </TouchableOpacity> }  
    </View> 
  )
}

const style = StyleSheet.create({
      wrapper : {
           width:"100%",
           height:"auto",
           borderRadius:borderRadius.middleRadius,
           borderWidth:2,
           backgroundColor:colors.background,
           elevation:elevation.middleShhadow
                },
       iconWrapperStyle:{
             position:"absolute",
             right:5,
             top:8
       },         
       iconStyle : {
              width:25,
              height:25,
              resizeMode:"contain",
              tintColor:colors.darkGray
       },         
      input : {
          paddingRight:spaces.high*1.4
      }          

})
export default SearchInput