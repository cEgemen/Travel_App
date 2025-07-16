import { Stack } from 'expo-router'
import { colors} from '../../constands'

const GuideLayot = () => {
  
  const reversibleOption = {headerTransparent:true,headerTintColor:colors.text,headerTitle:""}
  

  const normalOption = {
       headerShown:false
  }

  return (
    <Stack >
         <Stack.Screen name='selectTravelPrice' options={{...reversibleOption,...normalOption}} />
         <Stack.Screen name='selectTravelType' options={{...reversibleOption,...normalOption}} />
         <Stack.Screen name='selectTravelDates' options={{...reversibleOption,...normalOption}} />
         <Stack.Screen name='generate' options={normalOption}  />
         <Stack.Screen name='guideDetails' options={normalOption} />
    </Stack>
  )
}

export default GuideLayot