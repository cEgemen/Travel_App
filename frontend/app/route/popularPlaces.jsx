
import { StyleSheet, ScrollView  } from 'react-native'
import { BasePageWrapper, PopularPlaceCard, StackHeader } from '../../components'
import { borderRadius, colors, spaces } from '../../constands'
import { useRouteStore } from '../../managments'

const PopularPlaces = () => {

  const placesDatas = useRouteStore(state => state.placesDatas)
  

  return (
        
        <BasePageWrapper wrapperStyle={styles.container} >
           <StackHeader isBack title={"Populer Places"} headerWrapperStyle={{paddingHorizontal:spaces.middle}} backIconWrapperStyle={styles.iconWrapper} />
           <ScrollView
               contentContainerStyle={{flexGrow:1,padding:spaces.middle,rowGap:spaces.middle}}
               showsVerticalScrollIndicator={false}
           >
             {
              placesDatas.map((value,index) => {
                      return  <PopularPlaceCard place={value} key={index} index={index} />   
              })
             }
           </ScrollView>
        </BasePageWrapper> 

  )
}

export default PopularPlaces

const styles = StyleSheet.create({
  
    container : { 
       backgroundColor:colors.background,flex:1
    },
    iconWrapper : {
       width:40,height:40,justifyContent:"center",alignItems:"center",
       borderRadius:borderRadius.middleRadius,backgroundColor:colors.lightGray
                  },

})