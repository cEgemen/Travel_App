import React from 'react'
import { Stack } from 'expo-router'

const RouteLayout = () => {
  return (
     <Stack>
        <Stack.Screen name='customFilter'/>
        <Stack.Screen name='generate' options={{
            headerShown:false
        }} />
        <Stack.Screen name='main' options={{
              headerShown:false
        }} />
        <Stack.Screen name='routeDetail'/>
        <Stack.Screen name='placeDetail' />
        <Stack.Screen name='selectedRoute' options={{
              headerShown:false
        }} />
     </Stack>
  )
}

export default RouteLayout