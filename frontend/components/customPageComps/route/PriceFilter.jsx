import { StyleSheet,View } from 'react-native'
import paidIcon from "../../../assets/icons/paid.png"
import freeIcon from "../../../assets/icons/free.png"
import FilterCard from './FilterCard'

const PriceFilter = ({activeValue="Free",onPress = (key,value) => {}}) => {


    return (
      <View style={styles.wrapper}>
        <FilterCard icon={freeIcon} text='Free' onPress={() => onPress("price","Free")} isActive={activeValue === "Free"} />
        <FilterCard icon={paidIcon} text='Paid' onPress={() => onPress("price","Paid")} isActive={activeValue === "Paid"}  />
      </View>
    )
  }
  
  const styles = StyleSheet.create({
      wrapper : {
         height:"100%",justifyContent:"space-evenly"
      }
  })

 export default PriceFilter