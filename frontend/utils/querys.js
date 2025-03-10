import {BASE_URL} from "../secret"

const url = BASE_URL+"favorite/"

async function baseQuery({path,method="GET",body=null,isHaveBody=false,token}){
        const headers  = {
             "Content-Type":"application/json",
             "Authorization":"Bearer "+token
        }
        return fetch(url+path,{
              headers,
              method,
              body : isHaveBody ? JSON.stringify(body) : null
        })
}

export async function saveFavGuide(guide,token){
        const result = await  baseQuery({path:"save",method:"POST",isHaveBody:true,body:guide,token})     
        return result.json();
}

export async function getOwnerFavGuides(id,mod,token){
      const result = await baseQuery({path:"user/"+id+"?mod="+mod,token})
      return result.json()
}

export async function getFavGuide(id,token){
      const result = await baseQuery({path:id,token})
      return result.json()
}

export async function deleteFavGuide(id,token){
      const result = await baseQuery({path:"delete/"+id,token})
      return result.json()
}