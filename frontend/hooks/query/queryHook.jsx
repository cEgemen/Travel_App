import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { saveFavGuide,getOwnerFavGuides, getFavGuide,deleteFavGuide } from "../../utils/querys"

export const useSaveFavGuide = (guide,client,token,succesCallBack=()=>{},errorCallBack=()=>{})=>{
   return  useMutation({
         mutationFn: () => saveFavGuide(guide,token),
         onSuccess:()=>{
              client.invalidateQueries({
                  predicate:(query) => query.queryKey[0] === "favorites"
              })
              succesCallBack()
         },
         onError:()=> {
             errorCallBack()
         },
   })

}

export const useDeleteFavGuide  = (id,client,token,succesCallBack=()=>{},errorCallBack=()=>{}) => {
    return  useMutation({
        mutationFn: () => deleteFavGuide(id,token),
        onSuccess:()=>{
            client.removeQueries({queryKey:["favorite",id]})
            client.invalidateQueries({
                predicate:(query) => query.queryKey[0] === "favorites"
            })
            succesCallBack()
        },
        onError : () =>{
             errorCallBack()
        }
  })
}

export const useGetOwnerFavGuides  = (id,mod,token) => {
    return  useQuery({
          queryKey:["favorites",mod],
          queryFn:() => getOwnerFavGuides(id,mod,token) 
    })
}


export const useGetFavGuide  = (id,token,isEnable=true) => {
    return  useQuery({
          queryKey:["favorite",id],
          queryFn:() => getFavGuide(id,token),
          enabled:isEnable
    })
}

