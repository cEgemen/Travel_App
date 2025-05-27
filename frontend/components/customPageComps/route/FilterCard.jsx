import { Text, StyleSheet, View, Image, Pressable } from 'react-native'
import { borderRadius, colors, elevation, fonts, spaces } from '../../../constands';

const FilterCard = ({icon=null,text="",isActive=false,onPress = (key,value) =>{}}) =>  {
  
    let activeCard = {}
    let activePressableCircle = {}
    if(isActive)
    {
         activeCard = {opacity:1,borderColor:colors.darkGray,elevation:elevation.middleShadow}
         activePressableCircle = {backgroundColor:colors.primary}
    }

    return ( 
      <View style={styles.wrapper}>
       <View style={{...styles.contentWrapper,...activeCard}}>
        {icon === null ? <View style={{height:"100%",width:40,backgroundColor:"pink"}}>  </View> : <Image style={styles.iconStyle} source={icon} />}
        <Text style={styles.textStyle}>{text}</Text>
       </View>
       <Pressable style={{...styles.circleSelecter,...activePressableCircle}} onPress={onPress} ></Pressable> 
      </View>
           )
  
}

const styles = StyleSheet.create({
    wrapper:{
      width:"100%",height:"60",flexDirection:"row"
    },
    contentWrapper : {
      width:"85%",height:"100%",flexDirection:"row",backgroundColor:colors.lightGray,borderRadius:borderRadius.middleRadius,padding:spaces.middle,alignItems:"center",borderColor:colors.gray,borderWidth:1,opacity:.5
                     },
    iconStyle : {
         height:40,width:40,tintColor:colors.backgroundDark
    },
    textStyle : {
      fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight,marginHorizontal:"auto"
    },
    circleSelecter : {
       width:30,height:30,borderRadius:borderRadius.circleRadius(30),borderColor:colors.darkGray,borderWidth:2,alignSelf:"center",marginHorizontal:"auto",backgroundColor:colors.lightGray
    }
})

export default FilterCard;