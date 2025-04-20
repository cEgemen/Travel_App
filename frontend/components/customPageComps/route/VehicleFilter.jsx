
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import FilterCard from './FilterCard'
import carIcon from "../../../assets/icons/car.png"
import walkerIcon from "../../../assets/icons/walker.png"
import bikeIcon from "../../../assets/icons/bike.png"

const VehicelFilter = ({activeValue="Car",onPress = (key,value) => {}}) => {


  return (
    <View style={styles.wrapper}>
      <FilterCard icon={carIcon} text='Car' onPress={() => onPress("vehicle","Car")} isActive={activeValue === "Car"} />
      <FilterCard icon={bikeIcon} text='Bicycle' onPress={() => onPress("vehicle","Bicycle")} isActive={activeValue === "Bicycle"}  />
      <FilterCard icon={walkerIcon} text='Walker' onPress={() => onPress("vehicle","Walker")} isActive={activeValue === "Walker"}  />
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper : {
       height:"100%",justifyContent:"space-evenly"
    }
})

export default VehicelFilter