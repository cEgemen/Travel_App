import { StyleSheet, View } from 'react-native'
import { SelecterMap, SwipeDetailCard } from '../../../components'

const LocsDetail = () => {

  return (
             <View style={[styles.container]}>
               <SelecterMap />
               <SwipeDetailCard />
             </View>
        )

}

export default LocsDetail

const styles = StyleSheet.create({

    container : {
        width:"100%",height:"100%"
    }

})