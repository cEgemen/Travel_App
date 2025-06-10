
import { StyleSheet, View } from 'react-native'
import FilterCard from './FilterCard'
import { castleIcon, forestIcon, museumIcon, stadiumIcon } from '../../../assets'


const PlaceFilter = ({activeValue=["tourism"],onPress = (key,value) => {}}) => {

    return (
      <View style={styles.wrapper}>
        <FilterCard icon={stadiumIcon} text='Amenity' onPress={() => onPress("places","amenity")} isActive={activeValue.includes("amenity")}  />
        <FilterCard icon={museumIcon} text='Tourism' onPress={() => onPress("places","tourism")} isActive={activeValue.includes("tourism")} />
        <FilterCard icon={castleIcon} text='Historic' onPress={() => onPress("places","historic")} isActive={activeValue.includes("historic")}  />
        
      </View>
    )
  }
  
const styles = StyleSheet.create({
      wrapper : {
         height:"100%",justifyContent:"space-evenly"
      }
})
  
export default PlaceFilter
