import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { borderRadius, colors, elevation, fonts, spaces } from '../../constands'

const CardSlider = ({cardData = {image:"",description:"",color:""},indexState={}}) => {
   
  const CurrentCard = () => <>
  <View style={[styles.sliderCurrentCardWrapper]}>
    <Image style={styles.cardImage} source={cardData[indexState.current.index].image} />
    <View style={styles.textWrapper}>
     <Text style={styles.cardDesc}>
          {cardData[indexState.current.index].description}
     </Text>
   </View>
  </View>
            </>

const LeftCard = () =>  <>
<View style={[styles.sliderPreLeftCardWrapper]}>
 <Image style={styles.preCardImage} source={cardData[indexState.left.index].image} />
</View>
          </>

const RightCard = () => {
     return <>
     <View style={[styles.sliderPreRightCardWrapper]}>
      <Image style={styles.preCardImage} source={cardData[indexState.right.index].image} />
     </View>
         </>          
}

  return (
       <View style={{width:"100%",height:"auto",flexDirection:"row",justifyContent:"center"}}>
            <LeftCard />
            <CurrentCard />
            <RightCard />
       </View>
  )
}

export default CardSlider

const styles = StyleSheet.create({
     sliderCurrentCardWrapper : {
      height:400,width:250,alignSelf:"center",borderRadius:borderRadius.middleRadius,backgroundColor:"rgba(255,255,255,.15)",elevation:elevation.smallShadow,shadowColor:"transparent"
                         },
    sliderPreRightCardWrapper : {
     height:260,width:250,borderRadius:borderRadius.middleRadius,padding:spaces.middle,alignSelf:"center",position:"absolute",right:-200,backgroundColor:"rgba(255,255,255,.15)",
                           },     
    sliderPreLeftCardWrapper : {
    position:"absolute",left:-200,height:260,width:250,alignSelf:"center",borderRadius:borderRadius.middleRadius,padding:spaces.middle,backgroundColor:"rgba(255,255,255,.15)",
                           },                                     
     cardImage :{
         width:"100%",height:"60%" ,resizeMode:"contain",marginVertical:spaces.middle
     },
     preCardImage :{
       width:"100%",height:"100%",resizeMode:"contain"
    },
     textWrapper: {
          flex:1,justifyContent:"center",paddingHorizontal:spaces.small
     },
     cardDesc : {
        fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight,color:colors.textSecondary,textAlign:"left"
     }
})