
import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import InputWithLabel from './InputWithLabel'
import closeEyeIcon from "../../assets/icons/closeEye.png"
import openEyeIcon from "../../assets/icons/openEye.png"

const PasswordInputLabel = ({value="",label="",placeholder="",onChange=(text)=> {},onEndEditing=()=>{},errors=[],inputContainerStyle={},editable=true}) => {
    const [isVisible , setIsVisible] = useState(true)
    const onHandleVisible = ()=>{
         setIsVisible(!isVisible)
    }
    return (
       <InputWithLabel 
       value={value} 
       label={label} 
       placeholder={placeholder} 
       onChange={onChange} 
       onEndEditing={onEndEditing} 
       errors={errors}
       keyboardType='numeric' 
       secureTextEntry={isVisible} 
       inputContainerStyle={inputContainerStyle} 
       icon={!isVisible ? closeEyeIcon : openEyeIcon} 
       iconPress={onHandleVisible}
       editable={editable}
        />
  )
}

export default PasswordInputLabel

const styles = StyleSheet.create({})