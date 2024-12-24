
import { Stack } from "expo-router";
import InitialContextWrapper from "../managments/initialManagment";

const RootLayout = () => {
  return (
    <InitialContextWrapper>
        <Stack >
             <Stack.Screen name="index" options={{headerShown:false}}/>
             <Stack.Screen name="(auth)" options={{headerShown:false}} />
             <Stack.Screen name="(tabs)" options={{headerShown:false}} />
        </Stack>
    </InitialContextWrapper>
  )
}

export default RootLayout


