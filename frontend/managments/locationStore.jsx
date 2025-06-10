import { create } from "zustand";

const useLocationStore = create((set) => (
    {
        /* locationDetails : {startDetails:{lat: "51.5074456", lon: "-0.1277653", locationName: "London, United Kingdom"},endDetails:{lat: "51.5080490", locationName: "London Bridge, United Kingdom", lon: "-0.0876715"}},
        filters : {vehicle:"car",price:"free",places:["amenity"],scan:5000}, */
        locationDetails : {startDetails:null,endDetails:null},
        filters : {vehicle:null,price:null,places:null,scan:5000},
        resetLocationAndFilter : () => {
            set(state => ({
                 locationDetails : {startDetails:null,endDetails:null},
                 filters : {vehicle:null,price:null,places:null,scan:5000}
            }))
        },
        setStartDetails : (startData) => {
             set(state => ({
                  locationDetails:{...state.locationDetails,startDetails:startData}
             }))
        },
        setEndDetails : (endData) => {
             set(state => ({
                  locationDetails : {...state.locationDetails,endDetails:endData}
             }))
        },
        setFilters:(filterData) => {
           set(state => ({
                filters : {...state.filters,...filterData}
           }))
        },
        resetLocationDetails : () => {
             set(state => ({
                 locationDetails : {startDetails:null,endDetails:null}
                           }))
        },
        resetFilters : () => {
           set(state => ({
                filters : {vehicle:null,price:null,places:null,scan:5000}
           }))
        }
    }
))

export default useLocationStore;