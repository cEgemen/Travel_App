
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { borderRadius, colors, fonts, spaces } from '../../constands/appConstand'

const InputWithLabel = ({label="",value="",placeholder="",keyboardType="default",secureTextEntry=false,editable=true,
    onChange=(text)=>{},onEndEditing=()=>{},iconPress=()=>{} , errors=[],inputContainerStyle = {},icon=null }) => {
  return (
    <View style={[styles.inputContainer,inputContainerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={[styles.input,{borderColor:errors.length !== 0 ? colors.error : colors.lightGray,borderWidth:1}]} 
      value={value} 
      keyboardType={keyboardType} 
      placeholder={placeholder} 
      placeholderTextColor={colors.lightGray}
      onChangeText={(text) => onChange(text)} 
      onEndEditing={onEndEditing} 
      secureTextEntry={secureTextEntry} 
      numberOfLines={1}
      editable={editable}  
      />
      {
        errors.length !== 0 && <>
                                 <Text style={styles.error}>{errors[0]}</Text>
                               </>
      }
      {
       icon !== null ? 
       <Pressable style={styles.iconWrapper} onPress={iconPress}>
        <Image style={[styles.icon]} source={icon} />
       </Pressable>
         : null
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
      backgroundColor:colors.background,borderRadius:borderRadius.highRadius,paddingRight:spaces.high*1.5
     },
     error : {
        fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight,color:colors.error,paddingHorizontal:spaces.small
     },
     label : {
      fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight,paddingHorizontal:spaces.small
     },
     iconWrapper : {
      position:"absolute",right:spaces.small,top:spaces.high*1.62
     },
     icon:{
      width:30,height:30,tintColor:colors.lightGray
     }
})