
import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { colors, fonts, spaces } from '../../constands/appConstand'

const GuideLayot = () => {
  
  const reversibleOption = {headerTransparent:true,headerTintColor:colors.text,headerTitle:""}
  

  const normalOption = {
       headerShown:false
  }

  return (
    <Stack >
         <Stack.Screen name='selectTravelPrice' options={reversibleOption} />
         <Stack.Screen name='selectTravelType' options={reversibleOption} />
         <Stack.Screen name='selectTravelDates' options={reversibleOption} />
         <Stack.Screen name='generateTravelGuide' options={normalOption}  />
         <Stack.Screen name='guideDetails' options={normalOption} />
    </Stack>
  )
}

export default GuideLayot