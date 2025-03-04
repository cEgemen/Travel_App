import {BASE_URL} from "../secret"

const url = BASE_URL+"favorite/"
 

async function baseFetching({path,method="GET",body,isHaveBody=false,header}){
     
}

export async function saveFavGuide(guide,token){
        const result  =  await fetch(url+"save",{
              method:"POST",
              body:JSON.stringify(guide),
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+token
              }
        })
        return result.text();
}

export async function getOwnerFavGuides(id,token){
      const result = await fetch(url+"user/"+id,{
           method:"GET",
           headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+token
           }
      })
      const data = await result.json()
      return data
}