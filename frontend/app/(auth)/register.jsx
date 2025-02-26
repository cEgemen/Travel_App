import { View, Text, ScrollView, StyleSheet, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomTouchableButton from '../../components/customButtons/customTouchableButton'
import FormField from '../../components/customForm/formField'
import { Link, router } from 'expo-router'
import { colors, fonts, spaces } from '../../constands/appConstand'
import { BASE_URL } from '../../secret'
import useUserStore from '../../managments/userStore'
import Input from '../../components/form/Input'


const Register = () => {
const user = useUserStore(state => state.user)
console.log("user : ",user)
const [formState , setFormState ] = useState({username:"",email:"",password:""});

 const onSubmit = () => {
          fetch(BASE_URL+"auth/register",{
            method:"POST",
            headers:{
               "Content-Type":"application/json"
            },
            body:JSON.stringify({...formState,role:"ROLE_USER"})
          })
          .then(result => {
              return result.json();
          })
          .then(data => {
              const {ok_data,isSucces}  = data 
              if(!isSucces)
              {
                ToastAndroid.showWithGravity("Registration process fails.",ToastAndroid.LONG,ToastAndroid.BOTTOM)
              }
              else
              {
                 router.back()
              }
          })
          .catch(err => {
              console.log("err : ",err)
          })
 } 

  return (
    <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollVw}>
                <View style={styles.content}>
                      <Text style={styles.header}>Join Us</Text>
                      <Text style={styles.subTitle}>Create an account to get started.</Text>
                      <Input value={formState.username} label='UserName'  placeholder="UserName" onChange={value => {setFormState(oldState => {
                         return {...oldState,username:value}
                      })}} />
                      <Input value={formState.email} label='E-mail' keyboardType="email-address" placeholder="E-mail" onChange={value => {setFormState(oldState => {
                         return {...oldState,email:value}
                      })}} />
                      <Input value={formState.password} secureTextEntry={true} label='Password' keyboardType="numeric" placeholder="Password" onChange={value => {setFormState(oldState => {
                         return {...oldState,password:value}
                      })}} />  
                     <Text style={styles.infoText}>Don't Have an Account ? <Link href={"/login"} style={{color:colors.secondary}}>Register</Link></Text> 
                      <CustomTouchableButton text="Register" onPress={onSubmit} buttonStyle={styles.btnStyle} textStyle={styles.btnTextStyle} />
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

export default Register