import { StyleSheet,View } from 'react-native'
import FilterCard from './FilterCard'
import { freeIcon, paidIcon } from '../../../assets'

const PriceFilter = ({activeValue="free",onPress = (key,value) => {}}) => {


    return (
      <View style={styles.wrapper}>
        <FilterCard icon={freeIcon} text='Free' onPress={() => onPress("price","free")} isActive={activeValue === "free"} />
        <FilterCard icon={paidIcon} text='Paid' onPress={() => onPress("price","paid")} isActive={activeValue === "paid"}  />
      </View>
    )
  }
  
  const styles = StyleSheet.create({
      wrapper : {
         height:"100%",justifyContent:"space-evenly"
      }
  })

 export default PriceFilter