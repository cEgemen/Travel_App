
import { StyleSheet} from 'react-native'
import { router, Stack, usePathname } from 'expo-router'
import {BasePageWrapper} from '../../../components'
import { colors } from '../../../constands'
import {useLocationStore} from '../../../managments'

const MapLayout = () => {
  const {setEndDetails,setStartDetails} = useLocationStore(state => state)
  const path = usePathname()
  
  const onBack = () => {
     if(path === "/map/locDes")
     {
        setEndDetails(null)
     }
     else if(path === "/map/locStart")
     {
        setStartDetails(null)
     }
     router.back()    
  }


  return (
    <>
       <Stack.Screen 
          options={{
              headerShown:false
          }}
       />
       <BasePageWrapper wrapperStyle={styles.container} paddingBottom={"0"}>
          {({top,left,right,bottom}) => (
             
                     <>
                         <Stack>
                           <Stack.Screen 
                              name='locsDetail'
                              options={{headerShown:false}}
                            />
                         </Stack>
                     </>

          )}
       </BasePageWrapper>
    </>
    
  )
}

export default MapLayout

const styles = StyleSheet.create({
    container : {
         flex:1,backgroundColor:colors.background
    },
})