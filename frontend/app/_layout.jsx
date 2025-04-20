
import { Stack } from "expo-router";
import {QueryClientProvider,QueryClient} from "@tanstack/react-query"

const RootLayout = () => {
  const client = new QueryClient({})
  const options = {headerShown:false}

  return (
       <QueryClientProvider client={client}>
         <Stack > 
             <Stack.Screen name="index"  options={options} />
             <Stack.Screen name="(auth)" options={options} />
             <Stack.Screen name="(tabs)" options={options} />
             <Stack.Screen name="guide"  options={options} />
             <Stack.Screen name="chat"   options={options} />
             <Stack.Screen name="route"  options={options} />
         </Stack>
       </QueryClientProvider>
         
  )
}

export default RootLayout


