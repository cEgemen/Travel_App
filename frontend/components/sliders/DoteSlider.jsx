
import { FlatList, StyleSheet, View } from 'react-native'
import uuid from "react-native-uuid"
import { borderRadius, colors, spaces } from '../../constands';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DoteSlider = ({doteSize=0,currentIndex=0}) => {
  const insets = useSafeAreaInsets()  
  const dotes = new Array(doteSize < 5 ? doteSize : 5 );
  const positionElements = {bottom:(0+insets.bottom),right:(0+insets.right)}
  const Dote = ({index}) => {
   const isActive = (currentIndex % 5) ===index
   return  <>
         <View style={{width: isActive ? 55 : 25,height:25,backgroundColor:isActive ? colors.gray : colors.lightGray ,borderRadius:borderRadius.circleRadius(25)}} key={uuid.v4()}>
         </View>
   </>
  }
    
  return (
    <View style={[styles.doteSliderWrapper,positionElements]}>
      <FlatList
         data={dotes}
         horizontal={true}
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={styles.flatListContainerStyle}
         renderItem={({item,index}) => <Dote index={index} />} 
      />
    </View>
  )
}

export default DoteSlider

const styles = StyleSheet.create({
    doteSliderWrapper : {
        position:"absolute",justifyContent:"space-between",flexDirection:"row",gap:spaces.small
    },
    doteButton : {
         width:60,height:30,borderRadius:borderRadius.middleRadius,justifyContent:"center",alignItems:"center",backgroundColor:colors.lightGray,borderWidth:1
    },
    flatListContainerStyle : {
         flex:1,alignItems:"center",justifyContent:"center",gap:spaces.middle,paddingVertical:spaces.middle
    }
})