import { create } from "zustand";

const useUserStore = create((set) => ({
     user:{id:null,username:null,password:null,email:null,token:null,role:null},
     setUser:(userData) => {
           set((state) => ({
                 user:{...state.user,...userData}
           }))
     }
})) 

export default useUserStore;