import Groq from "groq-sdk";
import { GROQ_API_KEY } from "../secret";
import { popularCities } from "../constands/aiContand";

const groq = new Groq({apiKey:GROQ_API_KEY})

export  async function getSuggesPlaces () { 
    const index = Math.floor(Math.random()*popularCities.length)
    const {city,country} = popularCities[index]
    const chatCompletion = await groq.chat.completions.create({
      "messages": [
        {
          "role": "system",
          "content": `YOU ARE A TRAVEL ASSISTANT.  
          Recommend 5 attractions in ${city}, ${country} for a trip.  
          Ensure the response follows this JSON format:  
    
          {
            "city": "${city}",
            "country": "${country}",
            "places": [
              {
                "name": "Place Name",
                "location": "Location (city, country)",
                "rate": "popularity rate (3/10,8/10,5/10,etc.)",
                "type": "place type (cafe, restaurant, hotel, street, etc.)",
                "description": "Short description"
              }
            ]
          }`
        },
        {
          "role": "user",
          "content": `Can you recommend 5 places to visit in ${city}, ${country}?`
        }
      ],
       "model": "llama-3.3-70b-versatile" ,
        "temperature": 1,
        "max_completion_tokens": 1024,
        "top_p": 1,
        "stream": false,
        "response_format": { "type": "json_object" },
        "stop": null
    });
 
  return  chatCompletion.choices[0].message.content
}

export async function getTripGuide({messages}) {
  const chatCompletion = await groq.chat.completions.create({
     "messages":messages,
     "model": "llama-3.3-70b-versatile" ,
     "temperature": 1,
     "temperature": 0.7,
     "max_tokens": 3000,
     "top_p": 0.9,
     "frequency_penalty": 0,
     "presence_penalty": 0.5,
     "stream": false,
     "response_format": {"type":"json_object"},
     "stop": null
  })
 
  return JSON.parse(chatCompletion.choices[0].message.content)
}