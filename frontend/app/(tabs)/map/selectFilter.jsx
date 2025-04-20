import { Pressable, StyleSheet, Text, View} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SelectFilterCard from '../../../components/customPageComps/map/SelectFilterCard'
import { borderRadius, colors, fonts, spaces } from '../../../constands/appConstand'
import useLocationStore from '../../../managments/locationStore'
import { router } from 'expo-router'

const SelectFilter = () => {
    const [selectFilter,setSelectFilter] = useState(0)
    const setFilters = useLocationStore(state => state.setFilters)
    const handleDefFilterPress = () => {
         setFilters({vehicle:"Car",price:"Free",places:["Tourism"]})
                                       }
    const handleCusFilterPress = () => {
          router.push("/route/customFilter")
                                       }
    return (
       <SafeAreaView style={styles.safeArea}>
             <Text style={styles.title}>Select Fiter Settings</Text>
             <View style={styles.content}>
             <View>
              <SelectFilterCard title='DEFAULT' isActive={0 === selectFilter} onPress={handleDefFilterPress} />  
              <Pressable style={{...styles.pressableCircleBtn,...{backgroundColor:selectFilter === 0 ? colors.primary : colors.gray}}} onPress={() => setSelectFilter(0)} />
             </View> 
             <View>
              <SelectFilterCard isCustom={true} title='CUSTOM' isActive={1 === selectFilter} onPress = {handleCusFilterPress} />  
              <Pressable style={{...styles.pressableCircleBtn,...{backgroundColor:selectFilter === 1 ? colors.primary : colors.gray}}} onPress={() => setSelectFilter(1)} />
             </View>         
             </View>      
       </SafeAreaView>
           )
}

const styles = StyleSheet.create({
     safeArea : {
          width:"100%",
          height:"100%",
          backgroundColor:colors.background,
          padding:spaces.small
     },
     title : {
        fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight,textAlign:"center"
     },
     content : {
          width:"100%",
          flex:1,
          flexDirection:"row",
          justifyContent:"space-around",
          alignItems:"center"
     },
     pressableCircleBtn : {
        width:30,height:30,borderRadius:borderRadius.circleRadius(30),borderColor:colors.darkGray,borderWidth:2,alignSelf:"center",marginTop:spaces.high 
  }
})

export default SelectFilter