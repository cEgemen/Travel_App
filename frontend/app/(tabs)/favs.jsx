
import {Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { Stack } from 'expo-router'
import { borderRadius, colors,fonts,spaces } from '../../constands'
import { BasePageWrapper, FavGuide , FavPlace, StackHeader } from '../../components'

const FavoriteGuides = () => {

  const [favSelectedState,setFavSelectedState] = useState(1)
  
  const handleSelectTap = (mod) => {
      if(favSelectedState !== mod)
      {
          setFavSelectedState(oldState => {
              return mod;
          })
      }
  }

  return (
    <BasePageWrapper wrapperStyle={styles.container}>
         <Stack.Screen
               options={{
                    headerShown:false
               }} 
         />
         <View style={{flex:1,paddingHorizontal:spaces.high}}>
         <StackHeader  title={"Favorite "+ (favSelectedState === 1 ? "Guides" : "Places")} />
         <View style={styles.selectTabWrapperStyle}>
           <View style={styles.selectTabContainerStyle}>
              <Pressable style={{flex:1,padding:spaces.middle,alignItems:"center",borderRadius:borderRadius.middleRadius,borderColor:favSelectedState === 1 ? colors.darkGray : colors.background,borderWidth:1}} onPress={() => handleSelectTap(1)}>
              <Text style={{fontSize:favSelectedState === 1 ? fonts.smallMidFontSize-2 : fonts.smallFontSize,fontWeight:favSelectedState === 1 ? fonts.middleFontWeight : fonts.smallFontWeight,opacity : favSelectedState === 1 ? 1 : .8}}>Guides</Text>
              </Pressable>
              <Pressable style={{flex:1,padding:spaces.middle,alignItems:"center",borderRadius:borderRadius.middleRadius,borderColor:favSelectedState === 2 ? colors.darkGray : colors.background,borderWidth:1}} onPress={() => handleSelectTap(2)}>
               <Text style={{fontSize:favSelectedState !== 1 ? fonts.smallMidFontSize : fonts.smallFontSize,fontWeight:favSelectedState !== 1 ? fonts.middleFontWeight : fonts.smallFontWeight,opacity : favSelectedState !== 1 ? 1 : .7}}>Places</Text>
              </Pressable>
           </View>
         </View> 
         {favSelectedState === 1 ? <FavGuide /> : <FavPlace />}
         </View>
    </BasePageWrapper>
  )
}

export default FavoriteGuides

const styles = StyleSheet.create({
    container : {
       flex:1,backgroundColor:colors.background
    },
    selectTabWrapperStyle : {
       width:"100%",flexDirection:"row",justifyContent:"center"
    },
    selectTabContainerStyle : {
       flexDirection:"row",width:"100%",borderColor:colors.darkGray,borderWidth:2,borderRadius:borderRadius.middleRadius,padding:spaces.middle,columnGap:spaces.middle
    },
  
})