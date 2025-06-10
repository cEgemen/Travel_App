
import Groq from "groq-sdk";
import { GROQ_API_KEY } from "../secret";

const groq = new Groq({ apiKey:GROQ_API_KEY});

 function getGroqChatCompletion({name,lat,lon})  {
  return groq.chat.completions.create({
    "messages":  [
      {
        role: "system",
        content: `
      You are a travel assistant. When a user provides a place name , lat and lon values, respond ONLY with a JSON object in the following format:

      {
  "name": string,
  "location": string,
  "historical_summary": string,
      }

    Instructions:
  - Provide accurate and informative data.
  - "historical_summary" should include cultural or historical significance if available(A post of short length).

    DO NOT include any extra explanation outside the JSON object.
        `.trim()
      },
      {
        role: "user",
        content: `Tell me details about ${name}(lat:${lat},lon:${lon})`
      }
    ],
    "model": "llama-3.3-70b-versatile",
  })
                                              }

export async function detailResult({name,lat,lon}) {
  
  try{
       const chatCompletion = await getGroqChatCompletion({name,lat,lon});
       return chatCompletion.choices[0]?.message?.content ? {data:chatCompletion.choices[0]?.message?.content,isSuccess:true} : {data:"An Error Occurred...",isSuccess:false};
     }
  catch(err)
  {
       return {data:"An Error Occurred...",isSuccess:false}
  }
}