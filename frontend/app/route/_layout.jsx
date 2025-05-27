import { Stack } from 'expo-router'


const RouteLayout = () => {
  const baseOption = {headerShown:false}    
  return (
      <Stack>
        <Stack.Screen name='customFilter'/>
        <Stack.Screen name='generate' options={{...baseOption}} />
        <Stack.Screen name='main' options={{...baseOption}} />
        <Stack.Screen name='routeDetail' options={{...baseOption}}/>
        <Stack.Screen name='placeDetail' options={{
            ...baseOption
        }} />
        <Stack.Screen name='selectedRoute' options={{
             ...baseOption
        }} />
      </Stack>    

  )
}

export default RouteLayout