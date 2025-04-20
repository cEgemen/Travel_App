
import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const RouteLayout = () => {
  return (
     <Stack>
        <Stack.Screen name='customFilter'/>
     </Stack>
  )
}

export default RouteLayout