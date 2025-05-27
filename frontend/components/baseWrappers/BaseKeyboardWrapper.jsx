
import { useEffect, useState } from 'react'
import { Keyboard,StyleSheet} from 'react-native'

const BaseKeyboardWrapper = ({children}) => {
  const [keyboardIsShow,setKeyboardIsShow] = useState(false)
  const [keyboardHeight,setKeyboardHeight] = useState(0)

   useEffect(()=> {
           const showDidKeyboard = Keyboard.addListener("keyboardDidShow",(event) => {
               setKeyboardHeight(event.endCoordinates.height)
               setKeyboardIsShow(true)
           })
           const hiddenDidKeyboard = Keyboard.addListener("keyboardDidHide",(event) => {
               setKeyboardHeight(event.endCoordinates.height)
               setKeyboardIsShow(false)
           })
  
           return () => {
               showDidKeyboard.remove()
               hiddenDidKeyboard.remove()
           }
    },[])

  return (
     <>
      {typeof children === 'function' ? children({keyboardIsShow,keyboardHeight}) : children}
     </>
  )
}

export default BaseKeyboardWrapper

const styles = StyleSheet.create({
    
})