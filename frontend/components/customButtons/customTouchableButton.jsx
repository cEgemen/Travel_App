
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'

const CustomTouchableButton = (
      {
      text,onPress,buttonStyle={},
      textStyle={},disabled=false,isLoading=false,indicatorColor="white"
      }
                              ) => {
  const opacity = buttonStyle.opacity === undefined ? (disabled ? 0.7 : 1) : (disabled ? 0.7 : buttonStyle.opacity)                                   
  return (
      <TouchableOpacity disabled={disabled} activeOpacity={0.5} style={{...styles.btn,...buttonStyle,opacity}} onPress={onPress}>
            {isLoading ? <ActivityIndicator size={"large"} color={indicatorColor} /> : <Text style={{...styles.txt,...textStyle}}>{text}</Text>} 
      </TouchableOpacity>
         )
}

const styles = StyleSheet.create({
      btn : {
            backgroundColor:"orange",
            borderRadius:10,
            display:"flex",
            justifyContent:"center",
            width:"100%",
            height:"50",
      },
      txt : {
          textAlign:"center",
          alignContent:"center",
          fontSize:20,
          fontWeight:400,
          color:"white"
      }
});

export default CustomTouchableButton