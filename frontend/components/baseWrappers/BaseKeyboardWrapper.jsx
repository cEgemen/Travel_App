
import { useEffect, useState } from 'react'
import { Keyboard,StyleSheet, View} from 'react-native'

const BaseKeyboardWrapper = ({children,wrapperStyle={},onChangeCallback = (keyboardHeight) => {}}) => {
  const [keyboardIsShow,setKeyboardIsShow] = useState(false)
  const [keyboardHeight,setKeyboardHeight] = useState(0)

   useEffect(()=> {
           const showDidKeyboard = Keyboard.addListener("keyboardDidShow",(event) => {
               setKeyboardHeight(oldState => event.endCoordinates.height)
               onChangeCallback(oldState =>  event.endCoordinates.height)
               setKeyboardIsShow(oldState => true)
           })
           const hiddenDidKeyboard = Keyboard.addListener("keyboardDidHide",(event) => {
               setKeyboardHeight(oldState =>  event.endCoordinates.height)
               onChangeCallback(oldState =>  event.endCoordinates.height)
               setKeyboardIsShow(oldState =>  false)
           })
  
           return () => {
               showDidKeyboard.remove()
               hiddenDidKeyboard.remove()
           }
    },[])

  return (
        <View style={{flex:1,...wrapperStyle}}>
         {typeof children === 'function' ? children({keyboardIsShow,keyboardHeight}) : children}
        </View>
        )
}

export default BaseKeyboardWrapper

const styles = StyleSheet.create({
    
})