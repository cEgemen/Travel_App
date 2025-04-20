
import { StyleSheet, View } from 'react-native'
import React from 'react'
import FilterCard from './FilterCard'
import forestIcon from "../../../assets/icons/forest.png"
import castleIcon from "../../../assets/icons/castle.png"
import museumIcon from "../../../assets/icons/museum.png"
import stadiumIcon from "../../../assets/icons/stadium.png"

const PlaceFilter = ({activeValue=["Tourism"],onPress = (key,value) => {}}) => {

    return (
      <View style={styles.wrapper}>
        <FilterCard icon={museumIcon} text='Tourism' onPress={() => onPress("places","Tourism")} isActive={activeValue.includes("Tourism")} />
        <FilterCard icon={forestIcon} text='Naturel' onPress={() => onPress("places","Naturel")} isActive={activeValue.includes("Naturel")}  />
        <FilterCard icon={castleIcon} text='Historic' onPress={() => onPress("places","Historic")} isActive={activeValue.includes("Historic")}  />
        <FilterCard icon={stadiumIcon} text='Amenity' onPress={() => onPress("places","Amenity")} isActive={activeValue.includes("Amenity")}  />
      </View>
    )
  }
  
const styles = StyleSheet.create({
      wrapper : {
         height:"100%",justifyContent:"space-evenly"
      }
})
  
export default PlaceFilter
