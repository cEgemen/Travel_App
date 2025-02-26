
import {View,Text,StyleSheet,Image} from 'react-native'
import React, {useContext} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import appIcon from "../../assets/images/appIcon.png"
import {colors,fonts,spaces} from '../../constands/appConstand'
import 'react-native-get-random-values';
import GoogleAutoSearch from '../../components/customForm/googleAutoSearch'

import {useRouter} from 'expo-router'

const Home = () => {
  const route = useRouter()
  
  return (
      <SafeAreaView style={styles.safeViewStyle}>
        <View style={styles.container}>
          <View style={styles.headerStyle}>
                <View style={styles.headerTextWrapperStyle}>
                  <Text style={styles.headerTitleTextStyle}>Welcome To</Text>
                  <Text style={styles.headerSubtitleTextStyle}>Travel Guide</Text>
                </View>
                <Image style={styles.headerIconStyle} source={appIcon} />
          </View>  
        </View>  
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
       safeViewStyle : {
            width:"100%",height:"100%"
       },
       container : {
          paddingVertical:spaces.high,paddingHorizontal:spaces.middle,
          width:"100%",height:"100%",backgroundColor:colors.background
       },
       headerStyle : {
            width:"100%",
            flexDirection:"row",
            alignItems:"center"
            ,marginBottom:spaces.middle
       },
       headerTextWrapperStyle : {
            paddingLeft:spaces.highx2,
            flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"
       },
       headerTitleTextStyle: {
            fontSize:fonts.smallFontSize,
            fontWeight:fonts.smallFontWeight,
            color : colors.text
       },
       headerSubtitleTextStyle: {
        fontSize:fonts.middleFontSize,
        fontWeight:fonts.middleFontWeight,
        color : colors.text
   },
       headerIconStyle : {
         width:50,height:50,resizeMode:"cover"
       },
       searchInputStyle : {
           height:150,
           marginBottom : spaces.high
       } 
})

export default Home