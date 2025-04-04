import { create } from "zustand";

const useLocationStore = create((set) => (
    {
        locationDetails : {startDetails:null,endDetails:null},
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
        resetLocationDetails : () => {
             set(state => ({
                 locationDetails : {startDetails:null,endDetails:null}
                           }))
        }
    }
))

export default useLocationStore;