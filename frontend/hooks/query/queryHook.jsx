import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { saveFavGuide,getOwnerFavGuides, getFavGuide } from "../../utils/querys"

export const useSaveFavGuide = (guide,client,token)=>{
   return  useMutation({
         mutationFn: () => saveFavGuide(guide,token),
         onSuccess:()=>{
              client.invalidateQueries({
                  predicate:(query) => query.queryKey[0] === "favorites"
              })
         }
   })

}

export const useGetOwnerFavGuides  = (id,mod,token) => {
    return  useQuery({
          queryKey:["favorites",mod],
          queryFn:() => getOwnerFavGuides(id,mod,token) 
    })
}


export const useGetFavGuide  = (id,token) => {
    return  useQuery({
          queryKey:["favorite",id],
          queryFn:() => getFavGuide(id,token) 
    })
}

export const useDeleteFavGuide  = (id,token) => {
    return  useMutation({
        mutationFn: () => deleteFavGuide(id,token),
        onSuccess:()=>{
            client.removeQueries({queryKey:["favorite",id]})
        }
  })
}