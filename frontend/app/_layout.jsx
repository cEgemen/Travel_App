
import { Stack } from "expo-router";

const RootLayout = () => {

  const options = {headerShown:false}

  return (
         <Stack > 
             <Stack.Screen name="index" options={options}/>
             <Stack.Screen name="(auth)" options={options} />
             <Stack.Screen name="(tabs)" options={options} />
             <Stack.Screen name="guide" options={options} />
        </Stack>
  )
}

export default RootLayout


