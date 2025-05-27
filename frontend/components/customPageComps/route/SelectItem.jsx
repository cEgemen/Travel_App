import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '../../../constands'

const SelectItem = ({item,isActive=false}) => {
 
  let activeItemWrapper = {}
  let activeItemText  = {}

  if(isActive && item.name !== undefined)
  {
     activeItemWrapper = {opacity:1}
     activeItemText  =  {fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight}
  }

  return (
    <View style={[styles.itemWrapper,activeItemWrapper]} >
      <Text style={[styles.itemText,activeItemText]}>{item.name}</Text>
    </View>
  )
}

export default SelectItem

const styles = StyleSheet.create({
      itemWrapper : {
         width:"100%",height:40,justifyContent:"center",alignItems:"center",opacity:.3
      } ,
      itemText : {
         fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight
      }
})