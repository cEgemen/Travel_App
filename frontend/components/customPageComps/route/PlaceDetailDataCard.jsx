
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { borderRadius, colors, fonts, spaces } from '../../../constands'
import { closeIcon , checkIcon } from '../../../assets'
import { useState } from 'react'

const PlaceDetailDataCard = ({labelText,dataDetail,isActiveClickable=false}) => {

  const [isClicked,setIsClicked] = useState(!isActiveClickable)  

  const handleClick = () => {
      setIsClicked(oldState => !oldState )
  }


  return (                                                          
    <View style={styles.detailCard}>                               
      <View style={{flexDirection:"row",alignItems:"center",columnGap:spaces.middle}}> 
       <Text style={styles.labelTextStyle}>{labelText}</Text>
       {isActiveClickable && <Pressable style={styles.btn} onPress={handleClick} >
         <Image style={styles.btnStyle} source={isClicked ? closeIcon : checkIcon} />
        </Pressable>} 
      </View>
      
      { isClicked  && (Array.isArray(dataDetail) 
                                ? 
                                  dataDetail.map((data,index) => {
                                      return <View style={{borderRadius:borderRadius.middleRadius,padding:spaces.small,borderColor:colors.darkGray,borderWidth:1}}>
                                              <Text style={styles.detailTextStyle} key={index}> {data}</Text>
                                             </View>
                                  })
                                :
                                  <Text style={styles.detailTextStyle}>
                                   {dataDetail}
                                  </Text>)

      }
    </View>
  )
}

export default PlaceDetailDataCard

const styles = StyleSheet.create({
    detailCard : {
       rowGap:spaces.small , marginBottom:spaces.high
    },
    btnStyle : {
        width:20,height:20,tintColor:colors.backgroundDark,borderColor:colors.primary,borderWidth:1
    },
    labelTextStyle : {
       fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight,color:colors.darkGray
    },
    detailTextStyle : {
       fontSize:fonts.smallMidFontSize-4,fontWeight:fonts.middleFontWeight
    },
})