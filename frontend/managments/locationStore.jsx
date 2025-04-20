import { create } from "zustand";

const useLocationStore = create((set) => (
    {
        locationDetails : {startDetails:null,endDetails:null},
        filters : {vehicle:null,price:null,places:null,scan:5000},
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
                filters : {...state,...filterData}
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