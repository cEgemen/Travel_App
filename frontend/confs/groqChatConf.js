
import Groq from "groq-sdk";
import { GROQ_API_KEY } from "../secret";

const groq = new Groq({ apiKey:GROQ_API_KEY});

 function getGroqChatCompletion(history,newQuestion)  {
  console.log("history : ",history)
  console.log("newQuestion : ",newQuestion)  
  return groq.chat.completions.create({
    "messages": [
      {
        role:"system",
        content:"You are an assistant travel expert."
      },  
      ...history,
      {
        role: "user",
        content: newQuestion,
      },
    ],
    "model": "llama-3.3-70b-versatile",
  })
}

export async function chatResult(history,newQuestion) {
  
  try{
       const chatCompletion = await getGroqChatCompletion(history,newQuestion);
       return chatCompletion.choices[0]?.message?.content ? {data:chatCompletion.choices[0]?.message?.content,isSuccess:true} : {data:"An Error Occurred...",isSuccess:false};
     }
  catch(err)
  {
       return {data:"An Error Occurred...",isSuccess:false}
  }
}