import { useMutation, useQuery } from "@tanstack/react-query"
import { saveFavGuide,getOwnerFavGuides, getFavGuide,deleteFavGuide, getFavPlace, deleteFavPlace, saveFavPlace, getOwnerFavPlace } from "../../utils/querys"

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
            client.removeQueries({queryKey:["favoriteGuide",id]})
            client.invalidateQueries({
                predicate:(query) => query.queryKey[0] === "favoriteGuides"
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
          queryKey:["favoriteGuides",mod],
          queryFn:() => getOwnerFavGuides(id,mod,token) 
    })
}


export const useGetFavGuide  = (id,token,isEnable=true) => {
    return  useQuery({
          queryKey:["favoriteGuide",id],
          queryFn:() => getFavGuide(id,token),
          enabled:isEnable
    })
}

export const useSaveFavPlace = (token,client) => {
     return useMutation({
         mutationFn : (place) => saveFavPlace(place,token),
         onSuccess : () => {
             client.invalidateQueries({
                 predicate : (query) => query.queryKey[0] === "favoritePlaces"
             })
         }
     })
}

export const useGetOwnerFavPlace = (id,token,mod) => {
    return useQuery({
          queryKey:["favoritePlaces",mod],
          queryFn:() => getOwnerFavPlace(id,token,mod)
    })
}

export const useGetFavPlace = (id,token,isEnable=true) => {
     return useQuery({
         queryKey : ["favoritePlace",id],
         queryFn : () => getFavPlace(id,token),
         enabled : isEnable
     })
}

export const useDeleteFavPlace = (id,token,client) => {
     return useMutation({
         mutationFn : () => deleteFavPlace(id,token),
         onSuccess : () => {
              client.removeQueries({queryKey:["favoritePlace",id]})
              client.invalidateQueries({
                 predicate : (query) => query.queryKey[0] === "favoritePlaces"
               })
         }
     })
}