
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
  "summary": string,
  "bestTimeToVisit": [string],
  "activities": [string],
  "localTips": [string],
  "estimatedCost": string
      }

    Instructions:
  - Provide accurate and informative data.
  - "summary" should include cultural or historical significance if available.
  - "bestTimeToVisit" should be based on weather, festivals, tourist seasons,e.g.(max 4 and min 1)
  - "activities" should be unique or popular things to do in that location.(min 1)
  - "localTips" should include useful advice like avoiding crowds, local behavior, or lesser-known spots.(min 1)
  - "estimatedCost" should give only a rough cost range in USD for a typical day (e.g., "50-100 USD").

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