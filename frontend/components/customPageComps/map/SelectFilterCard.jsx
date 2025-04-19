import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { borderRadius, colors, elevation, fonts, spaces } from '../../../constands/appConstand'
import checkIcon from "../../../assets/icons/check.png"
import closeIcon from "../../../assets/icons/close.png"
import rightArrowShort from "../../../assets/icons/right_arrow_short.png"

const SelectFilterCard = ({title="",isCustom=false,onPress=() => {},isActive=false}) => {
  
  const TypeWrapper = ({text="",custom=false}) => {
      return  <View style={styles.typeWrapper}>
               <Text style={{flex:1}}>{text}</Text> 
               <View style={{...styles.iconWrapper,...{backgroundColor:custom ? "rgb(208, 81, 81)" : "rgb(118, 210, 121)"}}}>
                <Image style={styles.icon} source={custom ? closeIcon : checkIcon }/> 
               </View>
              </View>
  }

  let wrapperStyle = {borderColor:colors.gray,borderWidth:1,elevation:elevation.smallShadow,opacity:0.5}

  if(isActive)
  {
     wrapperStyle = {borderColor:colors.darkGray,borderWidth:2,elevation:elevation.middleShhadow,opacity:1}
  }

  return (
     <View style={{...styles.card,...wrapperStyle}}>
       <View style={styles.headerWrapper}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
       </View>
       <View style={styles.content}>
        <TypeWrapper custom={isCustom} text={"Vehicle Type"} />
        <TypeWrapper custom={isCustom} text={"Price Type"} />
        <TypeWrapper custom={false} text={"Field Scan"} />
        <TypeWrapper custom={isCustom} text={"Place Type"} />
       </View>  
       <Pressable style={styles.cardPressBtnStyle} onPress={isActive ? onPress : null} >
        <Image style={styles.cardPressBtnIconStyle} source={rightArrowShort} />
       </Pressable>
    </View>
  )
}

export default SelectFilterCard

const styles = StyleSheet.create({

       card : {
          width:140, height:200,
           backgroundColor:colors.lightGray ,
           borderRadius:borderRadius.middleRadius,
       },
       headerWrapper : {
           textAlign:"center"
       },
       title : {
         fontSize:fonts.smallMidFontSize,fontWeight:fonts.smallFontWeight, textAlign:"center"
       },
       content:{
         justifyContent:"space-around",paddingHorizontal:spaces.middle,rowGap:spaces.small
       },
       typeWrapper : {
          flexDirection:"row",alignItems:"center"
       },
       iconWrapper:{
          width:"25",height:"25",justifyContent:"center",alignItems:"center",borderRadius:borderRadius.circleRadius(25)
       },
       icon : {
         width:"20",height:"20",tintColor:colors.lightGray
       },
       cardPressBtnStyle : {
          width:40,height:40,borderRadius:borderRadius.circleRadius(40),backgroundColor:"black",margin:"auto"
       },
       cardPressBtnIconStyle: {
          width:40,height:40
       },

})