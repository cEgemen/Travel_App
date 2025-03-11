import React, { useState } from "react";
import {StyleSheet,Text,View,TextInput,TouchableOpacity,Image,} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import { borderRadius, colors, spaces } from "../../constands/appConstand";
import { Stack } from "expo-router";
import useUserStore from "../../managments/userStore";
import PasswordInputLabel from "../../components/forms/PasswordInputLabel";
import InputWithLabel from "../../components/forms/InputWithLabel";

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
      <View style={styles.container}>
        <Stack.Screen
            options={{
                headerShown:false
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
            <Icon name="edit-2" size={20} color={colors.background} style={styles.editIcon} />
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.formContainer}>
          {Object.keys(profileData).map((key, index) => {
                let inputData ;
                if(key === "password")
                {
                  inputData = <PasswordInputLabel value={profileData[key]} onChange={(text) => handleInputChange(key,text)} placeholder={`Enter Your ${key}`} label={key.charAt(0).toUpperCase() + key.slice(1)} />
                }
                else
                {
                   inputData = <InputWithLabel value={profileData[key]} onChange={(text) => handleInputChange(key,text)} placeholder={`Enter Your ${key}`} label={key.charAt(0).toUpperCase() + key.slice(1)} editable={key !== "email"} keyboardType={key === "email" ? "email-address" : "default" } />
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
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spaces.high,
  },
  avatarContainer: {
    alignItems: "center",
    marginVertical: spaces.small,
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
    width:40,
    height:40,
    position: "absolute",
    bottom: spaces.small,
    right: "35%",
    backgroundColor: colors.primary,
    borderRadius: borderRadius.circleRadius(40),
    justifyContent:"center",alignItems:"center"
  },
  formContainer: {
    marginBottom: spaces.highx2,
  },
  inputContainer: {
    marginBottom: spaces.high,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});