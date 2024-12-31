

import { FlatList, StyleSheet,View,Text, TouchableOpacity} from 'react-native'
import React from 'react'
import { borderRadius, colors, shadows, spaces } from '../../../constands/appConstand'

const DaysScroll = ({dayCount,onPress}) => {

  const days =  [...Array(dayCount).keys()].map(x => x + 1);

  return (
    <View style={styles.flatWrapper}>
   
    <FlatList 
         data={days}
         showsVerticalScrollIndicator={false}
         keyExtractor={((item,index) => index)}
         renderItem={({item}) => {
             return  <View style={styles.badge}> 
                        <TouchableOpacity onPress={() => {onPress(item)}}>
                            <Text style={styles.badgeText}>{item}</Text>
                        </TouchableOpacity>
                     </View>
                                }}
                                />
  </View>
  )
}

export default DaysScroll

const styles = StyleSheet.create({
     flatWrapper: {
             display:"flex",  marginBottom : spaces.high,
             aliginItems:"center",
         },
     badge:{
           width:80,height:30,backgroundColor:colors.secondary,elevation:shadows.smallShadow,borderRadius:borderRadius.middleRadius,justifyContent:"center",marginRight:spaces.small,alignItems:"center"
     },
     badgeText : {
            color:colors.text,textAlign:"center"
     }
})