
import { Stack } from "expo-router";
import InitialContextWrapper from "../managments/initialManagment";

const RootLayout = () => {

  const options = {headerShown:false}

  return (
    <InitialContextWrapper>
        <Stack >
             <Stack.Screen name="index" options={options}/>
             <Stack.Screen name="(auth)" options={options} />
             <Stack.Screen name="(tabs)" options={options} />
        </Stack>
    </InitialContextWrapper>
  )
}

export default RootLayout


