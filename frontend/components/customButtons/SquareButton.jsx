
import { Image, Pressable, StyleSheet, Text} from 'react-native'
import { borderRadius, colors } from '../../constands'

const SquareButton = ({icon=null,label=null,contentStyle={},iconWrapperStyle={},onClick=() => {}}) => {
  return (
    <Pressable style={[styles.iconWrapper,iconWrapperStyle]} onPress={onClick} >
      {icon !== null ? <Image source={icon} style={[styles.iconStyl,contentStyle]}/> : <Text numberOfLines={1} style={contentStyle}>{label}</Text>}
    </Pressable>
  )
}

export default SquareButton

const styles = StyleSheet.create({
             
      iconWrapper : {
         width:40,height:40,justifyContent:"center",alignItems:"center",
         borderRadius:borderRadius.middleRadius,backgroundColor:colors.lightGray
                    },
      iconStyl : {
         width:35,height:35
                 }
})