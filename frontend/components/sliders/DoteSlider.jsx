
import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import { borderRadius, colors, spaces } from '../../constands/appConstand';

const DoteSlider = ({doteSize=0,currentIndex=0}) => {
     
  const dotes = new Array(doteSize < 5 ? doteSize : 5 );


  const Dote = ({index}) => {
   const isActive = (currentIndex % 5) ===index
   return  <>
         <View style={{width: isActive ? 55 : 25,height:25,backgroundColor:isActive ? colors.gray : colors.lightGray ,borderRadius:borderRadius.circleRadius(25)}}>
         </View>
   </>
  }
    
  return (
    <View style={styles.doteSliderWrapper}>
      <FlatList
         data={dotes}
         keyExtractor={(items,index) => index}
         horizontal={true}
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={styles.flatListContainerStyle}
         renderItem={({item,index}) => <Dote index={index}/>} 
      />
    </View>
  )
}

export default DoteSlider

const styles = StyleSheet.create({
    doteSliderWrapper : {
        position:"absolute",bottom:0,left:0, justifyContent:"space-between",flexDirection:"row",gap:spaces.small
    },
    doteButton : {
         width:60,height:30,borderRadius:borderRadius.middleRadius,justifyContent:"center",alignItems:"center",backgroundColor:colors.lightGray,borderWidth:1
    },
    flatListContainerStyle : {
         flex:1,alignItems:"center",justifyContent:"center",gap:spaces.middle,paddingVertical:spaces.middle
    }
})