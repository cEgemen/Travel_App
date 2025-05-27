
import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import chatRobotIcon from "../../../assets/icons/chatRobot.png"
import { borderRadius, colors, elevation, spaces } from '../../../constands'
import TouchableIcon from '../../customButtons/TouchableIconButton'
import cld1Img from "../../../assets/images/cloud/cloud1.png"
import cld2Img from "../../../assets/images/cloud/cloud2.png"
import cld3Img from "../../../assets/images/cloud/cloud3.png"

const ChatBotHome = ({onClick=() => {}}) => {
  
  const [imgState , setImgState] = useState({first:false,second:false,third:false});

  const cld1Ref = useRef(null);const cld2Ref = useRef(null);
  const cld3Ref = useRef(null);const cld4Ref = useRef(null);

  useEffect(() => {
        cld1Ref.current = setInterval(() => {
              setImgState(oldState => {
                return {...oldState,first:true}
              })
        cld2Ref.current = setTimeout(() => {
              setImgState(oldState => {
                return {...oldState,second:true}
                                      })
        cld3Ref.current = setTimeout(() => {
              setImgState(oldState => {
                return {...oldState,third:true}
                                        })
        cld4Ref.current = setTimeout(() => {
              setImgState(oldState => {
                return {first:false,second:false,third:false}
                                      })
             },750)                           
            },750)                          
           },1000)  
        },3000)       
  
 return () => {
      if(cld1Ref.current !== null)
        {
          clearInterval(cld1Ref.current)
        }
      if(cld2Ref.current !== null)
        {
          clearTimeout(cld2Ref.current)
        }
      if(cld3Ref.current !== null)
        {
          clearTimeout(cld3Ref.current)
        }
      if(cld4Ref.current !== null)
        {
          clearTimeout(cld4Ref.current)
        }
 }

  },[])

  return (
      <>
        <TouchableIcon onPress={onClick} icon={chatRobotIcon} iconStyle={styles.chatIcon} iconWrapperStyle={styles.chatIconWrapper}  /> 
        {imgState.first ? <Image style={styles.cld1Style} source={cld1Img} /> : null}
        {imgState.second ? <Image style={styles.cld2Style} source={cld2Img} /> : null}
        {imgState.third ? <Image style={styles.cld3Style} source={cld3Img} /> : null}
      </>
      
  )
}

export default ChatBotHome

const styles = StyleSheet.create({
          chatIconWrapper : {
              width:50,aspectRatio:1,borderRadius:borderRadius.circleRadius(60),
              backgroundColor:colors.primary,elevation:elevation.middleShadow,position:"absolute",zIndex:2,bottom:spaces.high,right:spaces.middle
           },
           chatIcon : {
              tintColor:colors.background
           },
           cld1Style : {
            width:20,height:20,resizeMode:"contain", position:"absolute",zIndex:2,bottom:spaces.high+20,right:spaces.high+35
           },
           cld2Style : {
            width:40,height:40,resizeMode:"contain", position:"absolute",zIndex:2,bottom:spaces.high+30,right:spaces.high+45
           },
           cld3Style : {
            width:100,height:100,resizeMode:"contain",  position:"absolute",zIndex:2,bottom:spaces.high+40,right:spaces.high+65
           }
})