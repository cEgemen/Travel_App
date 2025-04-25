
import { StyleSheet, View } from 'react-native'
import React from 'react'
import FilterCard from './FilterCard'
import forestIcon from "../../../assets/icons/forest.png"
import castleIcon from "../../../assets/icons/castle.png"
import museumIcon from "../../../assets/icons/museum.png"
import stadiumIcon from "../../../assets/icons/stadium.png"

const PlaceFilter = ({activeValue=["tourism"],onPress = (key,value) => {}}) => {

    return (
      <View style={styles.wrapper}>
        <FilterCard icon={museumIcon} text='Tourism' onPress={() => onPress("places","tourism")} isActive={activeValue.includes("tourism")} />
        <FilterCard icon={forestIcon} text='Naturel' onPress={() => onPress("places","naturel")} isActive={activeValue.includes("naturel")}  />
        <FilterCard icon={castleIcon} text='Historic' onPress={() => onPress("places","historic")} isActive={activeValue.includes("historic")}  />
        <FilterCard icon={stadiumIcon} text='Amenity' onPress={() => onPress("places","amenity")} isActive={activeValue.includes("amenity")}  />
      </View>
    )
  }
  
const styles = StyleSheet.create({
      wrapper : {
         height:"100%",justifyContent:"space-evenly"
      }
})
  
export default PlaceFilter
