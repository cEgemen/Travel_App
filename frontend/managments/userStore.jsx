import { create } from "zustand";

const useUserStore = create((set) => ({
     user:{username:null,password:null,email:null,token:null,role:null},
     setUser:(userData) => {
           set((state) => ({
                 user:{...userData}
           }))
     }
})) 

export default useUserStore;