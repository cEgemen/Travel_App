
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../constands/appConstand'

const DynamicGuide = () => {
  const {id} = useLocalSearchParams()
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
            <Stack.Screen options={{
                  headerShadowVisible:false,
                  headerTitleAlign:"center",
                  title:"Guide ID #"+id.substring(0,7)
            }}/>
    </SafeAreaView>
  )
}

export default DynamicGuide

const styles = StyleSheet.create({
     safeAreaStyle : {
         flex:1,backgroundColor:colors.background
     }
})