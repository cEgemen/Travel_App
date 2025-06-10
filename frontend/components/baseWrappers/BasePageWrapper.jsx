
import { StyleSheet,View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const BasePageWrapper = ({children,wrapperStyle={}}) => {
  
  const insets = useSafeAreaInsets();
  const {paddingLeft,paddingTop,paddingRight,paddingBottom} = wrapperStyle
  return (
    <View style={[
      wrapperStyle, 
      {
        paddingTop: paddingTop ? (paddingTop + insets.top) : insets.top,
        paddingRight: paddingRight ? (paddingRight + insets.right) : insets.right,
        paddingLeft: paddingLeft ? (paddingLeft + insets.left) : insets.left,
        paddingBottom: paddingBottom ? (paddingBottom + insets.bottom) : insets.bottom,
      }
                ]}
     >
     {typeof children === 'function' ? children(insets) : children}
    </View>
  );

}

export default BasePageWrapper

const styles = StyleSheet.create({
   
})