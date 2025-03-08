import useUserStore from "../managments/userStore";
import {BASE_URL} from "../secret"

const url = BASE_URL+"favorite/"
const {token,id} = useUserStore(state => state.user)

async function baseQuery({path,method="GET",body=null,isHaveBody=false}){
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

export async function saveFavGuide(guide){
        const result = await  baseQuery({path:"save",method:"POST",isHaveBody:true,body:guide})     
        return result.json();
}

export async function getOwnerFavGuides(mod){
      const result = await baseQuery({path:"user/"+id+"?mod="+mod})
      return result.json()
}