import { create } from "zustand";

const useRouteStore = create((set) => ({
         routeDatas : null,
         selectRoute : null,
         selectPlace: null,
         setRouteDatas : (routes) => {
              set(state => ({
                  routeDatas : routes
              }))
         },
         setSelectRoute : (route) => {
               set(state => ({
                   selectRoute : route
               })) 
         },
         setSelectPlace : (place) => {
              set(state => ({
                    selectPlace : place
              }))
         }
}))

export default useRouteStore