import { create } from "zustand";

const useRouteStore = create((set) => ({
         routeDatas : null,
         placesDatas : null,
         selectRoute : null,
         selectPlace: null,
         selectMapRoute:null,
         stationsRoutes:null,
         resetRoutes : () => {
            set(state => ({
 routeDatas : null,placesDatas : null,selectRoute : null,
 selectPlace: null,selectMapRoute:null,stationsRoutes:null
            }))
         },
         setStationsRoutes:(stationsRoutes) => {
             set(state => ({
                   stationsRoutes : stationsRoutes
             }))
         },
         setRouteDatas : (routes) => {
              set(state => ({
                  routeDatas : routes
              }))
         },
         setPlacesDatas : (placesDatas) => {
               set(state => ({
                   placesDatas : placesDatas
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
         },
         setSelectMapRoute : (selectMapRoute) => {
               set(state => ({
                  selectMapRoute : selectMapRoute   
               }))
         }

}))

export default useRouteStore