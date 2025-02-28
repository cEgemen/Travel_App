
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { borderRadius, colors, fonts } from '../../../constands/appConstand';

const SuggesCard = ({suggesData}) => {
  const {type,rate,description,location,name}  = suggesData;
  return (
    <View style={styles.cardWrapper}>
      <Text style={styles.title} numberOfLines={1} >{name}</Text>
      <Text style={styles.subTitle}>📍{location}</Text>
      <Text style={styles.desc}>🔅{description}</Text>
      <View style={styles.infoWrapper}>
          <Text style={styles.info}>🏛️ {type}</Text>
          <Text style={styles.info}>🔥{rate}</Text>
      </View>
    </View>
  )
}

export default SuggesCard

const styles = StyleSheet.create({
     cardWrapper : {
       width:250,height:180, backgroundColor:colors.lightGray,opacity:.6,
       borderRadius:borderRadius.highRadius,justifyContent:"space-evenly"
     },
     title:{
        fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight,textAlign:"center"
     },
     subTitle:{
        fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight 
     },
     infoWrapper:{flexDirection:"row",justifyContent:"space-around"},
     info : {
        fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight 
     },
     desc : {
        fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight
     }
})