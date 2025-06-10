import { View, Text, StyleSheet, ToastAndroid, Image,TouchableOpacity} from 'react-native'
import {useState } from 'react'
import { router } from 'expo-router'
import { colors, fonts, spaces } from '../../constands'
import { BASE_URL } from '../../secret'
import Animated, {FadeInDown,FadeInUp,} from "react-native-reanimated";
import {InputWithLabel,CustomTouchableButton,PasswordInputLabel, BaseKeyboardWrapper, BasePageWrapper} from '../../components'
import { emailValid, passwordValid, userNameValid } from '../../utils/validations'
import { authBack1Img, authBack2Img, emailIcon, userIcon } from '../../assets'

const Register = () => {
const [isLoading,setLoading] = useState(false)  
const [formState , setFormState ] = useState({username:"",email:"",password:""});
const [errorState,setErrorState] = useState({username:[],email:[],password:[],isReady:false})

const goToRegister = () => {
  if(!isLoading)
  {
   router.replace("/login") 
  } 
}

 const onSubmit = () => {
    if(errorState.isReady)    
    {
      setLoading(true)
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
                 router.replace("/login")
              }
          })
          .catch(err => {
                 ToastAndroid.showWithGravity("Error occurred in the server.",ToastAndroid.LONG,ToastAndroid.BOTTOM)
          })
          .finally(() => {
                setLoading(false)
          })
        }
 } 


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
    <BasePageWrapper wrapperStyle={styles.container} >
     <BaseKeyboardWrapper >
        {({keyboardHeight,keyboardIsShow})  => (
            <View style={{marginBottom:keyboardHeight}}>
    <Image style={[styles.topBackImg,{height:!keyboardIsShow ? "70%" : "54%"}]} source={authBack1Img}/>
     { !keyboardIsShow ? <View style={styles.topBack2ImgWrapper}>
     <Animated.Image
        entering={FadeInUp.delay(200).duration(1000).springify()}
       style={{width:90,height:220}}
       source={authBack2Img}
     />
     <Animated.Image
       entering={FadeInUp.delay(400).duration(1000).springify()}
       style={{width:65,height:160}}
       source={authBack2Img}
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
        <InputWithLabel  label='UserName' placeholder='Your User Name ...' onChange={(text) => setFormState(oldState => ({...oldState,username:text}))} value={formState.username} errors={errorState.username} onEndEditing={() => {inputValidate(1,formState.username)}} inputContainerStyle={{marginBottom:!keyboardIsShow? spaces.middle :  spaces.small}} icon={userIcon} editable={!isLoading}/>
       </Animated.View>
       <Animated.View
         entering={FadeInDown.duration(1000).springify()}
         style={{width:"100%"}}
       >
        <InputWithLabel keyboardType='email-address' label='Email' placeholder='Your Email Address ...' onChange={(text) => setFormState(oldState => ({...oldState,email:text}))} value={formState.email} errors={errorState.email} onEndEditing={() => {inputValidate(2,formState.email)}} inputContainerStyle={{marginBottom:!keyboardIsShow? spaces.middle :  spaces.small}} icon={emailIcon} editable={!isLoading} />
       </Animated.View>
       <Animated.View
         entering={FadeInDown.delay(200).duration(1000).springify()}
         style={{width:"100%"}}
       >
         <PasswordInputLabel  label='Password' placeholder='Your Password ...' onChange={(text) => setFormState(oldState => ({...oldState,password:text}))} value={formState.password} errors={errorState.password} onEndEditing={() => {inputValidate(3,formState.password)}} inputContainerStyle={{marginTop:!keyboardIsShow? spaces.middle :  spaces.small}} editable={!isLoading} />
       </Animated.View>
       <Animated.View
         entering={FadeInDown.delay(400).duration(1000).springify()}
         style={{width:"100%"}}
       >
        <CustomTouchableButton disabled={!errorState.isReady || isLoading} text={"Register"} onPress={onSubmit} 
        buttonStyle={{...styles.btnStyle,...{marginTop:keyboardIsShow ? spaces.high : spaces.highx2,marginBottom:!keyboardIsShow ? spaces.high :  spaces.middle}}} isLoading={isLoading} />
       </Animated.View>
       <Animated.View
         entering={FadeInDown.delay(600).duration(1000).springify()}
         style={{flexDirection:"row",justifyContent:"center"}}
       >
         <Text> Already have an account? </Text>
         <TouchableOpacity onPress={goToRegister}>
           <Text style={{color:colors.primary}}>Login</Text>
         </TouchableOpacity>
       </Animated.View>
     </View>
   </View>
            </View>
        )}
     </BaseKeyboardWrapper>
    </BasePageWrapper>
  )
}

const styles = StyleSheet.create({
  container : {
    flex:1,backgroundColor:colors.background
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
    alignItems:"center",margin:spaces.middle
},
btnStyle:{
  backgroundColor:colors.primary
},
})

export default Register