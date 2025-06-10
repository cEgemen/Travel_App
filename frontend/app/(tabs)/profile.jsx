import React, { useState } from "react";
import {StyleSheet,Text,View,ScrollView,TouchableOpacity,Image, ToastAndroid,} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import { borderRadius, colors, spaces } from "../../constands";
import { Stack } from "expo-router";
import {useUserStore} from "../../managments";
import {PasswordInputLabel,InputWithLabel,SquareButton,CustomTouchableButton,ModalWithButtons, StackHeader} from "../../components";
import emailIcon from "../../assets/icons/email.png"
import userIcon from "../../assets/icons/user.png"
import restartIcon from "../../assets/icons/restart.png"
import { passwordValid, userNameValid } from "../../utils/validations";
import { updateProfile } from "../../utils/querys";

export default function Profile() {
  const navigation = useNavigation();
  const [isVisible , setIsVisible] = useState({state:false,title:"",desc:"",confirm:() => {},cancel:()=>{}})
  const {user,setUser} = useUserStore(state => state);
  const {id,username,password,email,token} = user
  const [profileData, setProfileData] = useState({username,email,password});
  const [isLoading ,setIsLoading] = useState(false)
  const [errorState,setErrorState] = useState({username:[],password:[],isReady:true});
  
  const handleInputChange = (field, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleRes = () => {
      setProfileData(oldState => {
         return {username,email,password}
      })
  }

  const setModal = (mod,modalData={title:"",desc:"",confirm:()=>{},cancel:()=>{}}) => {
       mod === 1 ? setIsVisible({state:true,...modalData}) : setIsVisible({state:false,...modalData})
  }

  const inputValidation = (value , mod) => {
        if(mod === 1)
        {
          const username = userNameValid(value);
          const isReady = errorState.password.length === 0 && username.isValidated
          setErrorState(oldState => {
              const result = {...oldState,isReady,username:username.isValidated ? Array.of() :  Array.of(username.message)}
              return {...result}
          })
        }
        if (mod === 2)
        {
          const password = passwordValid(value);
          const isReady = errorState.username.length === 0 && password.isValidated
          setErrorState(oldState => {
              const result = {...oldState,isReady,password:password.isValidated ? Array.of() : Array.of(password.message)}
              return {...result}
          })
        }
  }

  const handeleSave = () => {
      setIsLoading(true)
      updateProfile(id,token,{username:profileData.username,email:profileData.email,password:profileData.password})
                                                      .then(data => {
                                                          const {ok_data,error_data} = data
                                                          if(ok_data !== null)
                                                          {
                                                             const {data} = ok_data;
                                                             setUser({...data})
                                                          }
                                                          else
                                                          {
                                                            ToastAndroid.showWithGravity(error_data.message,ToastAndroid.LONG,ToastAndroid.BOTTOM);
                                                          }
                                                          ToastAndroid.showWithGravity("Profile has successfully updated.",ToastAndroid.LONG,ToastAndroid.BOTTOM);
                                                      })
                                                      .catch(err => {
                                                        ToastAndroid.showWithGravity("There was an error in the update process..",ToastAndroid.LONG,ToastAndroid.BOTTOM);
                                                      })
                                                      .finally(() => {
                                                           setIsLoading(false)
                                                      })
  }

  const {state,title,desc,confirm,cancel} = isVisible

  return (
       <>
        <ModalWithButtons isVisible={state} title={title} desc={desc} confirm={confirm} cancel={cancel} closeVisible={() => {setModal(2)}}/>
        <ScrollView style={styles.container}>
        <Stack.Screen options={{headerShown:false}}/>
        <StackHeader
            title={"Profile"}
         />
        <Animated.View
          entering={FadeInUp.duration(1000).springify()}
          style={styles.avatarContainer}
        >
          <Image
            source={require("../../assets/icons/user.png")}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editIconWrapper}>
            <Icon name="edit-2" size={15} color={colors.background} style={styles.editIcon} />
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.formContainer}>
          {Object.keys(profileData).map((key, index) => {
                let inputData ;
                if(key === "password")
                {
                  inputData = <PasswordInputLabel value={profileData[key]} onChange={(text) => handleInputChange(key,text)} placeholder={`Enter Your ${key}`} label={key.charAt(0).toUpperCase() + key.slice(1)} inputContainerStyle={{marginBottom:spaces.middle}} onEndEditing={() => inputValidation(profileData.password,2)} errors={errorState.password} editable={!isLoading} />
                }
                else
                {
                   inputData = <InputWithLabel value={profileData[key]} onChange={(text) => handleInputChange(key,text)} placeholder={`Enter Your ${key}`} label={key.charAt(0).toUpperCase() + key.slice(1)} editable={key === "email" ? false : !isLoading} keyboardType={key === "email" ? "email-address" : "default" } icon={key === "email" ? emailIcon : userIcon} inputContainerStyle={{marginBottom:spaces.middle}} onEndEditing={() => {
                                if(key !== "emial")
                                {
                                   inputValidation(profileData.username,1)
                                }
                   }} errors={errorState[key]} />
                }
                return   <Animated.View key={key} entering={FadeInDown.delay(index * 200).duration(1000).springify()}
                          style={styles.inputContainer}>
                              {inputData}
                         </Animated.View>
          })}
        </View>

        <Animated.View
          entering={FadeInUp.duration(1000).springify()}
          style={styles.buttonContainer}
        >
         <CustomTouchableButton disabled={!errorState.isReady || isLoading} onPress={() => {setModal(1,{title:"Save Info",desc:"Are you sure to update your information?",confirm:handeleSave,cancel:()=>{setModal(2)}})}} text={"Save"} buttonStyle={styles.button} />
        </Animated.View>
      </ScrollView>
       </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spaces.high,backgroundColor:colors.background
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: spaces.middle,
    paddingBottom:spaces.high,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: borderRadius.circleRadius(120),
    borderWidth: 3,
    borderColor: colors.primary,
  },
  editIconWrapper: {
    width:30,
    height:30,
    position: "absolute",
    bottom: spaces.small,
    right: "38%",
    bottom:10,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.circleRadius(30),
    justifyContent:"center",alignItems:"center"
  },
  formContainer: {
     marginBottom:spaces.high
  },
  inputContainer: {
    marginBottom: spaces.high
  },
  buttonContainer: {
    alignItems:"center",
    marginTop:spaces.highx2
  },
  button: {
    backgroundColor: colors.primary,
    width: "80%",
  },
});