
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { borderRadius, colors, fonts, spaces } from '../../constands/appConstand'
import closeIcon from "../../assets/icons/close.png"
import { auto } from 'groq-sdk/_shims/registry.mjs'

const CustomModal = ({isVisible=false,closeVisible=()=>{},title="",CenterContent=null,centerContentWrapper={},
                      BottomContent=null,bottomContentWrapper={}}) => {

  const handleClose = () => {
      closeVisible()
  }

  return (
    <Modal 
       visible = {isVisible} 
       animationType='fade'
       onRequestClose={handleClose}
       transparent={true}
    >
      <View style={styles.contentWrapper}>
         <View style={styles.contentContainer}>
             <View style={styles.headerWrapper}>
                 <Text numberOfLines={1} style={styles.headerTitle}>{title}</Text>
                 <Pressable onPress={handleClose}> 
                   <Image style={styles.headerIcon} source={closeIcon} />
                 </Pressable>
             </View>
            {CenterContent ? <View style={[styles.centerContent,centerContentWrapper]}>
                <CenterContent/>
             </View> : null}
             {BottomContent ?  <View style={[styles.bottomContent,bottomContentWrapper]} >
                <BottomContent/>
             </View> : null}
         </View>
      </View>
    </Modal>
  )
}

export default CustomModal

const styles = StyleSheet.create({

    contentWrapper : {
        height:"100%",
        backgroundColor:"rgba(0,0,0,0.4)",
        paddingHorizontal:spaces.middle,
        justifyContent:"center",alignItems:"center"
    },
    contentContainer : {
        width:"100%",
        minHeight:"auto",borderRadius:borderRadius.middleRadius,
        backgroundColor:colors.background
    },
    headerWrapper : {
      justifyContent:"space-between",alignItems:"center",flexDirection:"row",borderBottomColor:colors.lightGray,borderBottomWidth:1,padding:spaces.small
    },
    headerTitle : {
      fontSize:fonts.middleFontSize,fontWeight:fonts.middleFontWeight,flexShrink:1
    },
    headerIcon : {
       width:20,height:20,tintColor:colors.backgroundDark
    },
    centerContent:{
     paddingHorizontal:spaces.small,paddingVertical:spaces.middle
    },
    bottomContent:{
      borderTopColor:colors.lightGray,borderTopWidth:1,padding:spaces.small
    }

})