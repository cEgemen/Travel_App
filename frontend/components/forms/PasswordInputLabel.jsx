
import {StyleSheet} from 'react-native'
import {useState} from 'react'
import InputWithLabel from './InputWithLabel'
import { closeEyeIcon, openEyeIcon } from '../../assets'


const PasswordInputLabel = ({value="",label="",placeholder="",onChange=(text)=> {},onEndEditing=()=>{},errors=[],inputContainerStyle={},editable=true}) => {
    const [isVisible , setIsVisible] = useState(true)
    const onHandleVisible = ()=>{
         setIsVisible(!isVisible)
    }
    return (
       <InputWithLabel 
       value={value} 
       label={label} 
       placeholder={placeholder} 
       onChange={onChange} 
       onEndEditing={onEndEditing} 
       errors={errors}
       keyboardType='numeric' 
       secureTextEntry={isVisible} 
       inputContainerStyle={inputContainerStyle} 
       icon={!isVisible ? closeEyeIcon : openEyeIcon} 
       iconPress={onHandleVisible}
       editable={editable}
        />
  )
}

export default PasswordInputLabel

const styles = StyleSheet.create({})