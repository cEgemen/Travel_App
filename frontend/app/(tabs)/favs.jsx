
import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import { colors, spaces } from '../../constands/appConstand'

const FavoriteGuides = () => {
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
         <Stack.Screen
               options={{
                    headerShadowVisible:false,
                    headerTitleAlign:"center",
                    title:"Favorite Guides"
               }} 
          />
         <FlatList 
           showsVerticalScrollIndicator={false}
           contentContainerStyle={styles.flatContentStyle}
         /> 
    </SafeAreaView>
  )
}

export default FavoriteGuides

const styles = StyleSheet.create({
    safeAreaStyle : {
       flex:1,backgroundColor:colors.background
    },
    flatContentStyle : {
       padding:spaces.middle
    }
})