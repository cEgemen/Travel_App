
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomModal from './CustomModal'
import CustomTouchableButton from '../customButtons/CustomTouchableButton'
import { colors } from '../../constands/appConstand'

const ModalWithButtons = ({title="",desc="",confirm=()=>{},cancel=()=>{},isVisible=false,closeVisible=()=>{}}) => {

  const BottomContent = <>
                     <View style={styles.bottom}>
             <CustomTouchableButton buttonStyle={styles.button} text={"OK"} onPress={confirm} /> <CustomTouchableButton text={"Cancel"} onPress={cancel} buttonStyle={styles.button} />
                     </View>
                        </>

  const CenterContent = <>
                       <Text>{desc}</Text>
                        </>

  return (
     <CustomModal title={title} isVisible={isVisible} closeVisible={closeVisible} BottomContent={BottomContent} CenterContent={CenterContent} />
  )
}

export default ModalWithButtons

const styles = StyleSheet.create({
     bottom : {
         flexDirection:"row",justifyContent:"space-around"
     },
     button : {
          width:80,height:30,backgroundColor:colors.primary
     }
})