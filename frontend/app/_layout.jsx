
import { Stack } from "expo-router";
import InitialContextWrapper from "../managments/initialManagment";
import LocationManagmentWrapper from "../managments/locationManagment";

const RootLayout = () => {

  const options = {headerShown:false}

  return (
    <InitialContextWrapper>
      <LocationManagmentWrapper>
         <Stack >
             <Stack.Screen name="index" options={options}/>
             <Stack.Screen name="(auth)" options={options} />
             <Stack.Screen name="(tabs)" options={options} />
             <Stack.Screen name="guide" options={options} />
        </Stack>
      </LocationManagmentWrapper>
    </InitialContextWrapper>
  )
}

export default RootLayout


