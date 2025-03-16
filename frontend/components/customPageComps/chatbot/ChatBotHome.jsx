
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import chatRobotIcon from "../../../assets/icons/chatRobot.png"
import { borderRadius, colors, elevation, spaces } from '../../../constands/appConstand'
import TouchableIcon from '../../customButtons/TouchableIconButton'

const ChatBotHome = () => {
  return (
      <TouchableIcon icon={chatRobotIcon} iconStyle={styles.chatIcon} iconWrapperStyle={styles.chatIconWrapper}  /> 
  )
}

export default ChatBotHome

const styles = StyleSheet.create({
          chatIconWrapper : {
              width:50,aspectRatio:1,borderRadius:borderRadius.circleRadius(60),
              backgroundColor:colors.primary,elevation:elevation.middleShhadow,position:"absolute",zIndex:2,bottom:spaces.high,right:spaces.middle
           },
           chatIcon : {
                 tintColor:colors.background
           },
})