import React, { useState } from "react";
import {StyleSheet,Text,View,ScrollView,TouchableOpacity,Image,} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import { borderRadius, colors, spaces } from "../../constands/appConstand";
import { Stack } from "expo-router";
import useUserStore from "../../managments/userStore";
import PasswordInputLabel from "../../components/forms/PasswordInputLabel";
import InputWithLabel from "../../components/forms/InputWithLabel";
import emailIcon from "../../assets/icons/email.png"
import userIcon from "../../assets/icons/user.png"
import TouchableIcon from "../../components/customButtons/TouchableIconButton";
import restartIcon from "../../assets/icons/restart.png"
import CustomTouchableButton from "../../components/customButtons/CustomTouchableButton";

export default function Profile() {
  const navigation = useNavigation();
  const {id,username,password,email,token} = useUserStore(state => state.user)
  const [profileData, setProfileData] = useState({username,email,password});

  const handleInputChange = (field, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
      <ScrollView style={styles.container}>
        <Stack.Screen
            options={{
                headerShown:true,
                headerShadowVisible:false,
                headerTitleAlign:"center",
                title:"Profile",
                headerRight:() => {
                   return <TouchableIcon onPress={() => {}} icon={restartIcon} iconStyle={{marginRight:spaces.middle}}  />
                }

            }}
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
                  inputData = <PasswordInputLabel value={profileData[key]} onChange={(text) => handleInputChange(key,text)} placeholder={`Enter Your ${key}`} label={key.charAt(0).toUpperCase() + key.slice(1)} inputContainerStyle={{marginBottom:spaces.middle}} />
                }
                else
                {
                   inputData = <InputWithLabel value={profileData[key]} onChange={(text) => handleInputChange(key,text)} placeholder={`Enter Your ${key}`} label={key.charAt(0).toUpperCase() + key.slice(1)} editable={key !== "email"} keyboardType={key === "email" ? "email-address" : "default" } icon={key === "email" ? emailIcon : userIcon} inputContainerStyle={{marginBottom:spaces.middle}} />
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
         <CustomTouchableButton onPress={() => {}} text={"Save"} buttonStyle={styles.button} />
        </Animated.View>
      </ScrollView>
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