
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomTouchableButton from '../../components/customButtons/customTouchableButton'
import FormField from '../../components/customForm/formField'
import { Link, router } from 'expo-router'
import { colors, fonts, spaces } from '../../constands/appConstand'

const Login = () => {
 
const [formState , setFormState ] = useState({email:"",password:""});

 const onSubmit = () => {
   fetch("http://192.168.1.107:8080/api/auth/login",{
      method:"POST",
      headers:{
         "Content-Type":"application/json"
      },
      body:JSON.stringify({email:formState.email,password:formState.password})
    })
    .then(result => {
        return result.json();
    })
    .then(data => {
        console.log("data : ",data)
        router.replace("/home")
    })
    .catch(err => {
        console.log("err : ",err)
    })
 } 

  return (
    <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollVw}>
                <View style={styles.content}>
                      <Text style={styles.header}>Welcome Back</Text>
                      <Text style={styles.subTitle}>Sign in to access your account.</Text>
                      <FormField value={formState.email} labelText='E-mail' keyboardType="email-address" placeholder={"E-mail"} onChange={value => {setFormState(oldState => {
                         return {...oldState,email:value}
                      })}} containerStyle={styles.formContainerStyle} textInputStyle={styles.formLabelStyle} focusColor={colors.secondary}  />
                      <FormField value={formState.password} labelText='Password' keyboardType="numeric" placeholder={"Password"} onChange={value => {setFormState(oldState => {
                         return {...oldState,password:value}
                      })}}  containerStyle={styles.formContainerStyle} textInputStyle={styles.formLabelStyle} focusColor={colors.secondary}  />  
                     <Text style={styles.infoText}>Don't Have an Account ? <Link href={"/register"} style={{color:colors.secondary}}>Register</Link></Text> 
                      <CustomTouchableButton text="Login" onPress={onSubmit} buttonStyle={styles.btnStyle} textStyle={styles.btnTextStyle} />
                </View>
          </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
        safeArea : {
            minHeight : "100%"
        },
        scrollVw:{
             height:"100%",
             backgroundColor:colors.background,
             paddingVertical:spaces.high,
             paddingHorizontal:spaces.middle
        }, 
        content : {
            height:"100%",
            alignItems:"center",
        },
        header: {
           width:"100%",
           fontSize : fonts.highFontSize,
           fontWeight:fonts.highFontWeight,
           color:colors.text,
           marginBottom:spaces.small
        },
        subTitle: {
           width:"100%",
           fontSize:fonts.smallMidFontSize,
           fontWeight:fonts.middleFontWeight,
           color:colors.text,
           marginBottom:spaces.high 
        },
        formContainerStyle:{
            marginBottom:spaces.high
        },
        formLabelStyle:{
             color:colors.text
        },
        infoText:{
           textAlign:"right",
           width:"100%",
           color:colors.text,
           fontSize:fonts.smallFontSize,
           fontWeight:fonts.smallFontWeight,
           marginTop:spaces.high,
           marginBottom:spaces.high 
        },
        btnStyle:{
           backgroundColor:colors.secondary,
           marginTop:spaces.high
        },
        btnTextStyle:{
           color:colors.text
        }
})

export default Login