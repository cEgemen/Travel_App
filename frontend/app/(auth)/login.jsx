
import { View, Text, StyleSheet, ToastAndroid, Image, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { colors, fonts, spaces } from '../../constands/appConstand'
import { BASE_URL } from '../../secret'
import useUserStore from '../../managments/userStore'
import Animated, {FadeIn,FadeInDown,FadeInUp,} from "react-native-reanimated";
import authBack1 from "../../assets/images/authBack1.png"
import authBack2 from "../../assets/images/authBack2.png"
import emailIcon from "../../assets/icons/email.png"
import InputWithLabel from '../../components/forms/InputWithLabel'
import CustomTouchableButton from '../../components/customButtons/customTouchableButton'
import { emailValid, passwordValid } from '../../utils/validations'
import PasswordInputLabel from '../../components/forms/PasswordInputLabel'
 

const Login = () => {
 const [isLoading,setLoading] = useState(false)
 const [formState , setFormState ] = useState({email:"",password:""});
 const [errorState,setErrorState] = useState({email:[],password:[],isReady:false})
 const [keyboardState,setKeyboardState] = useState(false)
 const setUser = useUserStore(state => state.setUser)

 const goToRegister = () => {
    if(!isLoading)
     {
      router.push("/register")
     }
 }

 useEffect(() => {
   const open =  Keyboard.addListener("keyboardDidShow",() => {
      setKeyboardState(true)
   })
   
   const close = Keyboard.addListener("keyboardDidHide",() => {
       setKeyboardState(false)
   })

   return () => {
       open.remove()
       close.remove()
   }

 })
 
 const onSubmit = () => {
  if(errorState.isReady)
  { 
    setLoading(true)
    fetch(BASE_URL+"auth/login",{
      method:"POST",
      headers:{
         "Content-Type":"application/json"
      },
      body:JSON.stringify({...formState})
    })
    .then(result => {
        return result.json();
    })
    .then(data => {
        const {ok_data,isSucces} = data;
        if(!isSucces)
        {
           ToastAndroid.showWithGravity("Registration process fails.",ToastAndroid.LONG,ToastAndroid.BOTTOM)
        }
        else
        {
          const {username , token,email,password,role} = ok_data;
          setUser({username,token,email,password,role})
          router.replace("/home")
        }
    })
    .catch(err => {
        console.log("err : ",err)
    })
    .finally(() => {
        setLoading(false)
    })
   }
 } 

 const inputValidate = (mod,value) => {
          if(mod === 1)
          {
                const andData = errorState.password.length === 0
                const result = emailValid(value)
                const email = result.isValidated ?  {email:[],isReady:andData && true} : {email:Array.of(result.message),isReady:false}  
                   setErrorState(oldState => {
                       return {...oldState,...email}
                   })
          }
          else if(mod === 2)
          {   
                const andData = errorState.email.length === 0
                const result = passwordValid(value)
                const password = result.isValidated ?  {password:[],isReady:andData && true} : {password:Array.of(result.message),isReady:false}  
                   setErrorState(oldState => {
                       return {...oldState,...password}
                   })
          }  
 }

  return (
   <ScrollView style={styles.safeArea} contentContainerStyle={{flex:1}}>
   <Image style={[styles.topBackImg,{height:!keyboardState ? "85%" : "55%"}]} source={authBack1}/>
 { !keyboardState ? <View style={styles.topBack2ImgWrapper}>
     <Animated.Image
        entering={FadeInUp.delay(200).duration(1000).springify()}
       style={{width:90,height:220}}
       source={authBack2}
     />
     <Animated.Image
       entering={FadeInUp.delay(400).duration(1000).springify()}
       style={{width:65,height:160}}
       source={authBack2}
     />
   </View> :  null 
   }

   <View style={styles.contentWrapper}>
    <View style={{alignItems:"center"}}>
       <Animated.Text
         entering={FadeInUp.duration(1000).springify()}
         style={{color:colors.background,fontSize:fonts.highFontSize,fontWeight:fonts.highFontWeight}}
       >
         Login
       </Animated.Text>  
     </View> 

     <View style={styles.formContainerStyle}>
       <Animated.View
         entering={FadeInDown.duration(1000).springify()}
         style={{width:"100%"}}
       >
        <InputWithLabel keyboardType='email-addres' label='Email' placeholder='Your Email Address ...' onChange={(text) => setFormState(oldState => ({...oldState,email:text}))} value={formState.email} errors={errorState.email} onEndEditing={() => {inputValidate(1,formState.email)}} inputContainerStyle={{marginBottom:spaces.middle}} editable={!isLoading} icon={emailIcon}  />
       </Animated.View>
       <Animated.View
         entering={FadeInDown.delay(200).duration(1000).springify()}
         style={{width:"100%"}}
       >
         <PasswordInputLabel label='Password' placeholder='Your Password ...' onChange={(text) => setFormState(oldState => ({...oldState,password:text}))} value={formState.password} errors={errorState.password} onEndEditing={() => {inputValidate(2,formState.password)}} inputContainerStyle={{marginVertical:spaces.middle}} editable={!isLoading} />
       </Animated.View>
       <Animated.View
         entering={FadeInDown.delay(400).duration(1000).springify()}
         style={{width:"100%"}}
       >
        <CustomTouchableButton disabled={!errorState.isReady} text={"Login"} onPress={onSubmit} buttonStyle={styles.btnStyle} isLoading={isLoading} />
       </Animated.View>
       <Animated.View
         entering={FadeInDown.delay(600).duration(1000).springify()}
         style={{flexDirection:"row",justifyContent:"center"}}
       >
         <Text> Don't have an account? </Text>
         <TouchableOpacity onPress={goToRegister}>
           <Text style={{color:"rgb(121, 149, 206)"}}>Sign Up</Text>
         </TouchableOpacity>
       </Animated.View>
     </View>
   </View>
 </ScrollView>
  )
}

const styles = StyleSheet.create({
        safeArea : {
            flex:1
        },
        topBackImg:{
            width:"100%",position:"absolute"
                  }, 
        topBack2ImgWrapper : {
          flexDirection:"row",position:"absolute",width:"100%",justifyContent:"space-around"
        },
        contentWrapper : {
          height:"100%",width:"100%",justifyContent:"space-around"
        },
        formContainerStyle:{
            alignItems:"center",margin:spaces.small
        },
        btnStyle:{
          backgroundColor:"rgb(121, 149, 206)",marginTop:spaces.highx2,marginBottom:spaces.high
        },
})

export default Login