
import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { borderRadius, colors, fonts, spaces } from '../../constands/appConstand'

const InputWithLabel = ({label="",value="",placeholder="",keyboardType="default",secureTextEntry=false,
    onChange=(text)=>{},onEndEditing=()=>{} , errors=[],inputContainerStyle = {} }) => {
  return (
    <View style={[styles.inputContainer,inputContainerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={[styles.input,{borderColor:errors.length !== 0 ? colors.error : colors.lightGray,borderWidth:1}]} value={value} keyboardType={keyboardType} placeholder={placeholder} onChangeText={(text) => onChange(text)} onEndEditing={onEndEditing} secureTextEntry={secureTextEntry} numberOfLines={1}/>
      {
        errors.length !== 0 && <>
                                 <Text style={styles.error}>{errors[0]}</Text>
                               </>
      }
    </View>
  )
}

export default InputWithLabel

const styles = StyleSheet.create({
     inputContainer : {
        width:"100%",gap:spaces.small
           },
     input : {
      backgroundColor:colors.secondary,borderRadius:borderRadius.highRadius,paddingHorizontal:spaces.middle
     },
     error : {
        fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight,color:colors.error,paddingHorizontal:spaces.small
     },
     label : {
      fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight,paddingHorizontal:spaces.small
     }
})