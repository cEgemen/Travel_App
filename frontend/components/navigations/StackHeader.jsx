
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { leftShortArrowIcon } from '../../assets'
import { colors, fonts, spaces } from '../../constands'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'

const StackHeader = ({title=null,isBack=false,LeftComp=() => <></>,backOnClick=null,RightComp=() => <></>,headerWrapperStyle = {},backIconStyle={},backIconWrapperStyle={}}) => {

  const [isCanBack,setIsCanBack] = useState(false)
 
  const handleBack = () => {
      router.back()  
  }
  
  useEffect(() => {
        if(router.canGoBack())
        {
           setIsCanBack(true)
        }
        else
        {
           setIsCanBack(false)
        }
  },[])


  return (
    <View style={[styles.headerWrapper,headerWrapperStyle]}>
      <View style={[styles.sideWrapper,{alignItems:"flex-start"}]}>
        {(isCanBack && isBack) ? (<Pressable onPress={backOnClick || handleBack} style={backIconWrapperStyle}>
        <Image style={{...styles.iconStyl,...backIconStyle}} source={leftShortArrowIcon} />
        </Pressable>) : <LeftComp />}
      </View>
      {<Text numberOfLines ={1} style={styles.textStyl} >{title}</Text>}
      <View style={[styles.sideWrapper,{alignItems:"flex-end"}]}>
          <RightComp />
      </View>
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

    sideWrapper : {
       width:100,height:"100%",overflow:"hidden",justifyContent:"center"
    },

    iconStyl : {
      width:30,height:30,resizeMode:"contain",tintColor:colors.backgroundDark
    },

    textStyl :  {
      fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight
    },
})