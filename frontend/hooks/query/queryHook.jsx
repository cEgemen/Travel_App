import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { saveFavGuide,getOwnerFavGuides } from "../../utils/querys"

const client = useQueryClient()

export const useSaveFavGuide = (guide)=>{
 
   return  { mutate,isPending,isError } = useMutation({
         mutationFn:() => ()=> saveFavGuide(guide),
         onSuccess:()=>{
              client.invalidateQueries({
                  predicate:(query) => query.queryKey[0] === "favorites"
              })
         }
   })

}

export const useGetOwnerFavGuides  = (mod) => {
    return {data,isError,isLoading} = useQuery({
          queryKey:["favorites",mod],
          queryFn:()=> getOwnerFavGuides(mod) 
    })
}