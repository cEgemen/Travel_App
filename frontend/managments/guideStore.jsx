import { create } from "zustand";

const useGuideStore = create((set)=>{
      return {
          guideInfo : {location:null,price:null,type:null,
                       dayData:{startDate:null,endDate:null,daysCount:null,nightsCount:null}},
          setGuideInfo : (data) => {
               set(state => {
                   return {
                       guideInfo : {...state.guideInfo,[data]:data}
                   }
               })
          } , 
          resLocation  : () => {
              set(state => {
                  return {guideInfo : {...state.guideInfo,location:null}}
              })
          },
          resPrice  : () => {
            set(state => {
                return {guideInfo : {...state.guideInfo,price:null}}
            })
        },
        resType  : () => {
            set(state => {
                return {guideInfo : {...state.guideInfo,type:null}}
            })
        },
        resDayData  : () => {
            set(state => {
                return {guideInfo : {...state.guideInfo,dayData:{startDate:null,endDate:null,daysCount:null,nightsCount:null}}}
            })
        },
          resGuideInfo : () => {
            set({guideInfo:{location:null,price:null,type:null,dayData:{startDate:null,endDate:null,daysCount:null,nightsCount:null},nigtCount:null}}) 
          }
      }
})

export default useGuideStore;