import { create } from "zustand";

const useGuideStore = create((set)=>{
      return {
          guideInfo : {location:null,price:null,type:null,
                       dayData:{startDate:null,endDate:null,daysCount:null,nightsCount:null},nigtCount:null},
          setGuideInfo : (data) => {
               set(state => {
                   return {
                       guideInfo : {...state.guideInfo,[data]:data}
                   }
               })
          } , 
          resGuideInfo : () => {
            set({guideInfo:{location:null,price:null,type:null,dayData:{startDate:null,endDate:null,daysCount:null,nightsCount:null},nigtCount:null}}) 
          }
      }
})

export default useGuideStore;