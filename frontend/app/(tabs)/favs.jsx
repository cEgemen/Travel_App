
import {Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import { borderRadius, colors,spaces } from '../../constands'
import { useGetOwnerFavGuides } from '../../hooks/query/queryHook'
import {useUserStore} from '../../managments'
import dayjs from 'dayjs'
import FavGuide from '../../components/customPageComps/guideDetails/FavGuide'
import FavPlace from '../../components/customPageComps/guideDetails/FavPlace'

const FavoriteGuides = () => {

  const [favSelectedState,setFavSelectedState] = useState(1)
  
  const format =  'DD/MM/YYYY'
  const dateFormat = (date) => {
           const newDate = dayjs(date).format(format)
           return newDate;
  }
  
  const handleSelectTap = (mod) => {
      if(favSelectedState !== mod)
      {
          setFavSelectedState(oldState => {
              return mod;
          })
      }
  }

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
         <Stack.Screen
               options={{
                    headerShadowVisible:false,
                    headerTitleAlign:"center",
                    title:"Favorite "+ (favSelectedState === 1 ? "Guides" : "Places")
               }} 
         />
         <View style={styles.selectTabWrapperStyle}>
           <View style={styles.selectTabContainerStyle}>
              <Pressable style={{flex:1,padding:spaces.middle,alignItems:"center",borderRadius:borderRadius.middleRadius,borderColor:favSelectedState === 1 ? colors.darkGray : colors.background,borderWidth:1}} onPress={() => handleSelectTap(1)}>
              <Text>Guides</Text>
              </Pressable>
              <Pressable style={{flex:1,padding:spaces.middle,alignItems:"center",borderRadius:borderRadius.middleRadius,borderColor:favSelectedState === 2 ? colors.darkGray : colors.background,borderWidth:1}} onPress={() => handleSelectTap(2)}>
               <Text>Places</Text>
              </Pressable>
           </View>
         </View> 
         {favSelectedState === 1 ? <FavGuide /> : <FavPlace/>}
    </SafeAreaView>
  )
}

export default FavoriteGuides

const styles = StyleSheet.create({
    safeAreaStyle : {
       flex:1,backgroundColor:colors.background
    },
    selectTabWrapperStyle : {
       width:"100%",flexDirection:"row",justifyContent:"center",padding:spaces.middle
    },
    selectTabContainerStyle : {
       flexDirection:"row",width:"100%",borderColor:colors.darkGray,borderWidth:2,borderRadius:borderRadius.middleRadius,padding:spaces.middle,columnGap:spaces.middle
    },
  
})