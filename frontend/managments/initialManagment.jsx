import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext,useState } from "react";

export const initialState = useContext(InitialContext)


const InitialContext = createContext({isFirst:true,token:null});


export default function InitialContextWrapper ({children}) {
     const [initialState,setInitalState] = useState({isFirst:true,token:null})
     const preState = async () => {
         const isFirst = await AsyncStorage.getItem("isFirst");
         console.log("isFirst : ",isFirst);
         const token  = await AsyncStorage.getItem("token");
         console.log("token : ",token)
         setInitalState(oldState => {
              return {...oldState ,isFirst,token}
         })
     }
     
      preState()

      return <InitialContext.Provider value={{isFirst:initialState.isFirst,token:initialState.token}} >
                      {children}
            </InitialContext.Provider>

}