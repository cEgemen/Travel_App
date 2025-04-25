
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import FilterCard from './FilterCard'
import carIcon from "../../../assets/icons/car.png"
import walkerIcon from "../../../assets/icons/walker.png"
import bikeIcon from "../../../assets/icons/bike.png"

const VehicelFilter = ({activeValue="car",onPress = (key,value) => {}}) => {


  return (
    <View style={styles.wrapper}>
      <FilterCard icon={carIcon} text='Car' onPress={() => onPress("vehicle","car")} isActive={activeValue === "car"} />
      <FilterCard icon={bikeIcon} text='Bicycle' onPress={() => onPress("vehicle","bicycle")} isActive={activeValue === "bicycle"}  />
      <FilterCard icon={walkerIcon} text='Pedestrian' onPress={() => onPress("vehicle","pedestrian")} isActive={activeValue === "pedestrian"}  />
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper : {
       height:"100%",justifyContent:"space-evenly"
    }
})

export default VehicelFilter