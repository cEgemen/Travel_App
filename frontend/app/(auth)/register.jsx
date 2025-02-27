import { View, Text, StyleSheet, ToastAndroid, Image, ScrollView, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { colors, fonts, spaces } from '../../constands/appConstand'
import { BASE_URL } from '../../secret'
import Animated, {FadeIn,FadeInDown,FadeInUp,} from "react-native-reanimated";
import authBack1 from "../../assets/images/authBack1.png"
import authBack2 from "../../assets/images/authBack2.png"
import InputWithLabel from '../../components/forms/InputWithLabel'
import CustomTouchableButton from '../../components/customButtons/customTouchableButton'
import { emailValid, passwordValid, userNameValid } from '../../utils/validations'

const Register = () => {
const [formState , setFormState ] = useState({username:"",email:"",password:""});
const [errorState,setErrorState] = useState({username:[],email:[],password:[],isReady:false})
const [keyboardState,setKeyboardState] = useState(false)

const goToRegister = () => {
    router.replace("/login")
}

 const onSubmit = () => {
    if(errorState.isReady)    
    {fetch(BASE_URL+"auth/register",{
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
          })}
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

 const inputValidate = (mod,value) => {
          if(mod === 1)
        {
            const andData = errorState.email.length === 0 && errorState.password.length === 0
            const result = userNameValid(value)
            const username = result.isValidated ?  {username:[],isReady:andData && true} : {username:Array.of(result.message),isReady:false}  
               setErrorState(oldState => {
                   return {...oldState,...username}
               })
       } 
        else if(mod === 2)
           {
                 const andData = errorState.username.length === 0 && errorState.password.length == 0
                 const result = emailValid(value)
                 const email = result.isValidated ?  {email:[],isReady:andData && true} : {email:Array.of(result.message),isReady:false}  
                    setErrorState(oldState => {
                        return {...oldState,...email}
                    })
           }
           else if(mod === 3)
           {   
                 const andData = errorState.email.length === 0 && errorState.username.length == 0
                 const result = passwordValid(value)
                 const password = result.isValidated ?  {password:[],isReady:andData && true} : {password:Array.of(result.message),isReady:false}  
                    setErrorState(oldState => {
                        return {...oldState,...password}
                    })
           }  
  }

  return (
    <ScrollView style={styles.safeArea} contentContainerStyle={{flex:1}}>
   <Image style={[styles.topBackImg,{height:!keyboardState ? "70%" : "54%"}]} source={authBack1}/>
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
         Register
       </Animated.Text>  
     </View> 

     <View style={styles.formContainerStyle}>
     <Animated.View
         entering={FadeInDown.duration(1000).springify()}
         style={{width:"100%"}}
       >
        <InputWithLabel  label='UserName' placeholder='Your User Name ...' onChange={(text) => setFormState(oldState => ({...oldState,username:text}))} value={formState.username} errors={errorState.username} onEndEditing={() => {inputValidate(1,formState.username)}} inputContainerStyle={{marginBottom:!keyboardState? spaces.middle :  spaces.small}}/>
       </Animated.View>
       <Animated.View
         entering={FadeInDown.duration(1000).springify()}
         style={{width:"100%"}}
       >
        <InputWithLabel keyboardType='email-addres' label='Email' placeholder='Your Email Address ...' onChange={(text) => setFormState(oldState => ({...oldState,email:text}))} value={formState.email} errors={errorState.email} onEndEditing={() => {inputValidate(2,formState.email)}} inputContainerStyle={{marginBottom:!keyboardState? spaces.middle :  spaces.small}}/>
       </Animated.View>
       <Animated.View
         entering={FadeInDown.delay(200).duration(1000).springify()}
         style={{width:"100%"}}
       >
         <InputWithLabel keyboardType='numeric' label='Password' placeholder='Your Password ...' onChange={(text) => setFormState(oldState => ({...oldState,password:text}))} value={formState.password} secureTextEntry={true} errors={errorState.password} onEndEditing={() => {inputValidate(3,formState.password)}} inputContainerStyle={{marginTop:!keyboardState? spaces.middle :  spaces.small}} />
       </Animated.View>
       <Animated.View
         entering={FadeInDown.delay(400).duration(1000).springify()}
         style={{width:"100%"}}
       >
        <CustomTouchableButton disabled={!errorState.isReady} text={"Login"} onPress={onSubmit} 
        buttonStyle={{...styles.btnStyle,...{marginTop:keyboardState ? spaces.high : spaces.highx2,marginBottom:!keyboardState ? spaces.high :  spaces.middle}}} />
       </Animated.View>
       <Animated.View
         entering={FadeInDown.delay(600).duration(1000).springify()}
         style={{flexDirection:"row",justifyContent:"center"}}
       >
         <Text> Already have an account? </Text>
         <TouchableOpacity onPress={goToRegister}>
           <Text style={{color:"rgb(121, 149, 206)"}}>Login</Text>
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
  backgroundColor:"rgb(121, 149, 206)"
},
})

export default Register