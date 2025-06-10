import { Image, Pressable, StyleSheet } from 'react-native'
import { borderRadius, colors } from '../../constands'

const CircleTouchableIcon = ({icon=null,iconWidth=25,iconWrapperWidth=40,iconStyle={},iconWrapperStyle={},onPress=() => {},isDisable = false}) => {
  return (
     <Pressable onPress={isDisable ? null : onPress} style={{...styles.iconWrapperStyl,...{width:iconWrapperWidth,height:iconWrapperWidth,borderRadius:borderRadius.circleRadius(iconWrapperWidth),opacity:isDisable ? .7 : 1},...iconWrapperStyle}} >
        <Image source={icon} style={{...styles.iconStyl,...{width:iconWidth,height:iconWidth,resizeMode:"contain"},...iconStyle}} />
     </Pressable>
  )
}

export default CircleTouchableIcon

const styles = StyleSheet.create({
     iconWrapperStyl : {
         backgroundColor:colors.primary,justifyContent:"center",alignItems:"center"
     },
     iconStyl : {
        width:5,height:5, tintColor:colors.background
     }
})