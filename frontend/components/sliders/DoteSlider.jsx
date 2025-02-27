
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { borderRadius, colors, spaces } from '../../constands/appConstand';

const DoteSlider = ({doteSize=0,indexState={}}) => {
     
  const dotes = new Array(doteSize < 5 ? doteSize : 5 );

  const DoteSliderButton = ({label,onPress}) => <>
        <Pressable style={styles.doteButton} onPress={() => {
                onPress()
        }}>
             <Text>
                   {label}
             </Text>
        </Pressable>
  </>

  const Dote = ({index}) => {
   const isActive = (indexState.current.index % 5) ===index
   return  <>
         <View style={{width: isActive ? 55 : 25,height:25,backgroundColor:isActive ? colors.gray : colors.lightGray ,borderRadius:borderRadius.circleRadius(25)}}>
         </View>
   </>
  }
    
  return (
    <View style={styles.doteSliderWrapper}>
      <DoteSliderButton label={indexState.left.label} onPress={indexState.left.onPress} />
      <FlatList
         data={dotes}
         keyExtractor={(items,index) => index}
         horizontal={true}
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={styles.flatListContainerStyle}
         renderItem={({item,index}) => <Dote index={index}/>} 
      />
      <DoteSliderButton label={indexState.right.label} onPress={indexState.right.onPress}/>
    </View>
  )
}

export default DoteSlider

const styles = StyleSheet.create({
    doteSliderWrapper : {
         justifyContent:"space-between",flexDirection:"row",gap:spaces.small
    },
    doteButton : {
         width:60,height:30,borderRadius:borderRadius.middleRadius,justifyContent:"center",alignItems:"center",backgroundColor:colors.lightGray,borderWidth:1
    },
    flatListContainerStyle : {
         flex:1,alignItems:"center",justifyContent:"center",gap:spaces.middle
    }
})