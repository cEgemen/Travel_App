
import Groq from "groq-sdk";
import { GROQ_API_KEY } from "../secret";

const groq = new Groq({ apiKey:GROQ_API_KEY});

 function getGroqChatCompletion(placeName)  {
  return groq.chat.completions.create({
    "messages": [
        {
            "role": "system",
            "content": "You are a travel assistant. When a user provides a place name, respond ONLY with a JSON object in the following format: { \"name\": string, \"location\": string, \"summary\": string }. Keep the summary and informative. Do not include any extra text outside the JSON."
          },  
          {
            "role": "user",
            "content":`Give me a summary about ${placeName}.`
          }          
    ],
    "model": "llama-3.3-70b-versatile",
  })
}

export async function detailResult(placeName) {
  
  try{
       const chatCompletion = await getGroqChatCompletion(placeName);
       return chatCompletion.choices[0]?.message?.content ? {data:chatCompletion.choices[0]?.message?.content,isSuccess:true} : {data:"An Error Occurred...",isSuccess:false};
     }
  catch(err)
  {
       return {data:"An Error Occurred...",isSuccess:false}
  }
}