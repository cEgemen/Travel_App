
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { leftShortArrowIcon } from '../../assets'
import { colors, fonts, spaces } from '../../constands'
import { router } from 'expo-router'

const StackHeader = ({title=null,leftIcon=null,rightIcon=null,leftIconOnPress=null,rightIconOnPress=() => {},headerWrapperStyle = {}}) => {
  
  const handleBack = () => router.back()  

  return (
    <View style={[styles.headerWrapper,headerWrapperStyle]}>
      <Pressable onPress={leftIconOnPress || handleBack}>
        <Image style={styles.iconStyl} source={leftIcon || leftShortArrowIcon} />
      </Pressable>
      {<Text numberOfLines={1} style={styles.textStyl} >{title}</Text>}
      <Pressable onPress={rightIconOnPress}>
        <Image style={styles.iconStyl} source={rightIcon} />
      </Pressable>
    </View>
  )
}

export default StackHeader

const styles = StyleSheet.create({
    headerWrapper : {
         width:"100%",
         height:"60",
         backgroundColor:colors.background,
         flexDirection:"row",
         justifyContent:"space-between",
         alignItems:"center",
         paddingVertical:spaces.small,
         marginBottom:spaces.small
    },
    iconStyl : {
      width:30,height:30,resizeMode:"contain",tintColor:colors.backgroundDark
    },
    textStyl :  {
      fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight
    },
})