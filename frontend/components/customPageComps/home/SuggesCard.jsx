
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { borderRadius, colors, elevation, fonts, spaces } from '../../../constands';

const SuggesCard = ({suggesData,isLoading}) => {
  const {type,rate,description,location,name}  = suggesData;
  const opacity = isLoading ? 0.4 : 1 
  const justifyContent = isLoading ? "center" : "space-evenly"
  return (
    <View style={[styles.cardWrapper,{opacity,justifyContent}]}>
     { 
       !isLoading ? 
       <>
        <Text style={styles.title} numberOfLines={1} >{name}</Text>
        <Text style={styles.subTitle}>📍{location}</Text>
        <Text numberOfLines={3} style={styles.desc}>🔅{description}</Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.info}>🏛️ {type}</Text>
          <Text style={styles.info}>🔥{rate}</Text>
        </View>
       </>
           :
       <ActivityIndicator size={'large'} color={colors.primary} />
      }
    </View>
  )
}

export default SuggesCard

const styles = StyleSheet.create({
     cardWrapper : {
       width:250,height:180, backgroundColor:colors.lightGray,
       borderRadius:borderRadius.highRadius,padding:spaces.small,elevation:elevation.smallShadow
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