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
        const result = await baseQuery({path:"save/guide",method:"POST",isHaveBody:true,body:guide,token,url:favUrl})     
        return result.json();
}

export async function getOwnerFavGuides(id,mod,token){
      const result = await baseQuery({path:"user/guide/"+id+"?mod="+mod,token,url:favUrl})
      return result.json()
}

export async function getFavGuide(id,token){
      const result = await baseQuery({path:"guide/"+id,token,url:favUrl})
      return result.json()
}

export async function deleteFavGuide(id,token){
      const result = await baseQuery({path:"delete/guide/"+id,method:"DELETE",isHaveBody:false,token,url:favUrl})
      return result.json()
}


export async function saveFavPlace(place,token){
      const result = await baseQuery({path:"save/place",method:"POST",isHaveBody:true,token,body:place,url:favUrl}) 
      return result.json();
}

export async function deleteFavPlace(id,token){
      const result = await baseQuery({path:"delete/place/"+id,method:"DELETE",isHaveBody:false,token,url:favUrl})
      return result.json();
}

export async function getFavPlace(id,token){
      const result = await baseQuery({path:"place/"+id,token,url:favUrl,isHaveBody:false,method:"GET"})
      return result.json()
}

export async function getOwnerFavPlace(id,token,mod){
       const result = await baseQuery({path:"user/place/"+id+"?mod="+mod,token,url:favUrl,isHaveBody:false,method:"GET"})
       return result.json()
}

export async function updateProfile(id,token,newUserData) {
      const result = await baseQuery({path:"update/"+id,token,url:profileUrl,body:newUserData,isHaveBody:true,method:"PUT"});
      return result.json();
}