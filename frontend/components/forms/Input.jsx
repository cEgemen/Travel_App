
import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { borderRadius, colors, fonts, spaces } from '../../constands/appConstand'

const Input = ({label="",value="",placeholder="",keyboardType="default",secureTextEntry=false,
    onChange=(text)=>{},onEndEditing=()=>{} , errors=[] }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} value={value} keyboardType={keyboardType} placeholder={placeholder} onChangeText={(text) => onChange(text)} onEndEditing={onEndEditing} secureTextEntry={secureTextEntry} numberOfLines={1}/>
      {
        errors.length === 0 && <>
                                 <Text style={styles.error}>{errors[0]}</Text>
                               </>
      }
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
     inputContainer : {
        width:"100%",gap:spaces.middle
     },
     input : {
      backgroundColor:colors.secondary,borderRadius:borderRadius.middleRadius,paddingHorizontal:spaces.middle
     },
     error : {
        fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight,color:"red"
     },
     label : {
      fontSize:fonts.smallSize,fontWeight:fonts.smallWeight
     }
})