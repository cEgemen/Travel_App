import {BASE_URL} from "../secret"

const favUrl = BASE_URL+"favorite/"
const profileUrl = BASE_URL+"profile/"

async function baseQuery({path,method="GET",body=null,isHaveBody=false,token,url}){
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
        const result = await  baseQuery({path:"save",method:"POST",isHaveBody:true,body:guide,token,url:favUrl})     
        return result.json();
}

export async function getOwnerFavGuides(id,mod,token){
      const result = await baseQuery({path:"user/"+id+"?mod="+mod,token,url:favUrl})
      return result.json()
}

export async function getFavGuide(id,token){
      const result = await baseQuery({path:id,token,url:favUrl})
      return result.json()
}

export async function deleteFavGuide(id,token){
      const result = await baseQuery({path:"delete/"+id,method:"DELETE",isHaveBody:false,token,url:favUrl})
      return result.json()
}

export async function updateProfile(id,token,newUserData) {
      const result = await baseQuery({path:"update/"+id,token,url:profileUrl,body:newUserData,isHaveBody:true,method:"PUT"});
      return result.json();
}