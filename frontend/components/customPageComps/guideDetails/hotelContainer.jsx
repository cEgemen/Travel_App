


import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HotelCard from './hotelCard'
import { borderRadius, spaces } from '../../../constands/appConstand'

const HotelContainer = ({hotels}) => {
  return (
  <View style={styles.flat}>
   
    <FlatList 
         data={hotels}
         showsHorizontalScrollIndicator={false}
         horizontal={true}
         keyExtractor={((item,index) => index)}
         renderItem={({item}) => {
             return <HotelCard hotel={item} />
                                }}
     />
  </View>
  )
}

export default HotelContainer

const styles = StyleSheet.create({
     
     flat : {
           marginBottom : spaces.high
     }
      
})