

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../../constands/appConstand'

const GenerateTravelGuide = () => {
  return (
    <SafeAreaView style={styles.safeView}>
        <View style={styles.container}>
           <Text>Please Wait ...</Text>
           <Text>We are working to generate your trim guide.</Text>
       </View>
    </SafeAreaView>
    
  )
}

export default GenerateTravelGuide

const styles = StyleSheet.create({
     safeView : {
          width:"100%",height:"100%"
     },
     container : {
          width:"100%",height:"100%",backgroundColor:colors.background
     }
})