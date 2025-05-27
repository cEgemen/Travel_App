
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const BasePageWrapper = ({children,wrapperStyle={}}) => {
  
  const insets = useSafeAreaInsets();
 
  return (
    <View style={[
      wrapperStyle, 
      {
        paddingTop: insets.top,
        paddingRight: insets.right,
        paddingLeft: insets.left,
        paddingBottom: insets.bottom
      }
    ]}>
      {typeof children === 'function' ? children(insets) : children}
    </View>
  );

}

export default BasePageWrapper

const styles = StyleSheet.create({
   
})