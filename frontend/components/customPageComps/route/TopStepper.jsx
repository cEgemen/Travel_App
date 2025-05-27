
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { borderRadius, colors, elevation } from '../../../constands'

const TopStepper = ({activeIndex=0}) => {
  
  const Circle = ({text,isActive=false}) => {
     const activeStyle = {borderColor:colors.primary,elevation:elevation.middleShadow}
     let circleStyle = {...styles.circle}
     if(isActive)
     {
         circleStyle = {...circleStyle,...activeStyle}
     }
     return  <View style={{...circleStyle}}>
               <Text>{text}</Text>
              </View>
  }  

  const Line = ({isActive = false}) => {
    const activeStyle = {borderColor:colors.primary,elevation:elevation.middleShadow}
    let lineStyle = {...styles.line}
    if(isActive)
    {
        lineStyle = {...lineStyle,...activeStyle}
    }
      return <View style={lineStyle}></View>
  }

  return (
    <View style={styles.wrapper}>
      <Circle text="1" isActive={activeIndex >= 0}/>
      <Line isActive={activeIndex >= 1}/>
      <Circle text="2" isActive={activeIndex >= 1}/>
      <Line isActive={activeIndex >= 2}/>
      <Circle text="3" isActive={activeIndex >= 2}/>
    </View>
  )
}

export default TopStepper

const styles = StyleSheet.create({
     wrapper : {
        width:"100%",height:"auto",flexDirection:"row",justifyContent:"space-around",alignItems:"center"
               },
     circle :  {
        width:50,height:50,borderWidth:3,borderRadius:borderRadius.circleRadius(50),justifyContent:"center",alignItems:"center",backgroundColor:colors.background
               },
     line   :  {
        borderWidth:2,flex:1,backgroundColor:colors.backgroundDark
               },                    
})