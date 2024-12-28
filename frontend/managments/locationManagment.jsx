import { createContext, useState } from "react";


export const LocationManagment = createContext();


export default function LocationManagmentWrapper ({children}) {
      const [locationState , setLocationState] = useState({})

      return <LocationManagment.Provider value={{locationState,setLocationState}} >
                  {children}
            </LocationManagment.Provider>

}