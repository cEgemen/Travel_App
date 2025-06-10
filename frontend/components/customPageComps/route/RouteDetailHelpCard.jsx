
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { borderRadius, colors, elevation, fonts, spaces } from '../../../constands'

const RouteDetailHelpCard = ({isLoading=false,title="",desc="",icon=null,pressableFunc=() => {}}) => {
  return (
     <Pressable style={{...styles.helpCardContainer,opacity:!isLoading ? 1 : .6 , elevation:!isLoading ? elevation.  middleShadow : undefined }} onPress={!isLoading ? pressableFunc : () => {}}>
                      <View style={styles.iconWrapper} >
                        <Image source={icon} resizeMode='contain' style={{...styles.iconStyl,elevation:!isLoading ? elevation.smallShadow : undefined}} />
                      </View>
                      <Text numberOfLines={1} style={{textAlign:"center",...styles.subTitle}} >{title}</Text>
                      <Text style={{...styles.valueText,opacity:.8}}>{desc}</Text>
     </Pressable>
  )
}


export default RouteDetailHelpCard

const styles = StyleSheet.create({
       helpCardContainer : {
           width:170,height:170,padding:spaces.small,rowGap:spaces.middle,
           backgroundColor:colors.background,borderColor:colors.backgroundDark,
           borderWidth:1,borderRadius:borderRadius.middleRadius,
                          },
         iconStyl : {
             width:35,height:35,tintColor:colors.darkGray
         } ,             
        iconWrapper : {
          width:40,height:40,justifyContent:"center",alignItems:"center",
          borderRadius:borderRadius.middleRadius,backgroundColor:colors.lightGray
                   },  
        subTitle : {
                 fontSize:fonts.smallMidFontSize,fontWeight:fonts.smallFontWeight
             },
             valueText : {
                 fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight,color:colors.primary
             }                       
})