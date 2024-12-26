

import { View, Text, Image } from 'react-native'
import React from 'react'

const CustomTabBar = ({focused,text,icon,color}) => {
  return (
    <View>
        <Image  source={icon} />
    </View>
  )
}

export default CustomTabBar