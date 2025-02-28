
import Groq from "groq-sdk";
import { GROQ_API_KEY } from "../secret";

const groq = new Groq({apiKey:GROQ_API_KEY})

  
export default async function getSuggesPlaces () { 
    const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "system",
        "content": "YOU ARE A TRAVEL ASSISTANT.  \nRecommend 5 attractions in a popular city to the user for a random trip.  \nFor each location, provide the response in the following JSON format:\n\n{\n  \"city\": \"City Name\",\n  \"country\": \"Country\",\n  \"places\": [\n    {\n      \"name\": \"Place Name\",\n      \"location\": \"Location (city, country)\",\n      \"rate\",\"popularity rate (3/10,8/10,5/10,etc.)\",\n      \"type\":\"place type (cafe, restaurant, hotel, street, etc.)\",\n      \"description\": \"Short description\"\n    }\n  ]\n}"
      },
      {
        "role": "user",
        "content": "Can you recommend 5 different places to visit in a popular city for visiting?\n"
      },
      {
        "role": "assistant",
        "content": "{\n   \"city\": \"Paris\",\n   \"country\": \"France\",\n   \"places\": [\n     {\n       \"name\": \"The Eiffel Tower\",\n       \"location\": \"Paris, France\",\n       \"rate\": \"9/10\",\n       \"type\": \"Historic Landmark\",\n       \"description\": \"An iconic iron lattice tower with stunning city views\"\n     },\n     {\n       \"name\": \"The Louvre Museum\",\n       \"location\": \"Paris, France\",\n       \"rate\": \"8.5/10\",\n       \"type\": \"Museum\",\n       \"description\": \"A world-famous museum housing an impressive collection of art and artifacts\"\n     },\n     {\n       \"name\": \"Champs-Élysées\",\n       \"location\": \"Paris, France\",\n       \"rate\": \"8/10\",\n       \"type\": \"Shopping Street\",\n       \"description\": \"A famous avenue lined with upscale shops, cafes, and theaters\"\n     },\n     {\n       \"name\": \"Notre-Dame Cathedral\",\n       \"location\": \"Paris, France\",\n       \"rate\": \"9/10\",\n       \"type\": \"Historic Church\",\n       \"description\": \"A beautiful and historic Catholic cathedral that was built in the 12th century\"\n     },\n     {\n       \"name\": \"Montmartre\",\n       \"location\": \"Paris, France\",\n       \"rate\": \"8.5/10\",\n       \"type\": \"Neighborhood\",\n       \"description\": \"A charming and artistic neighborhood with narrow streets, charming cafes, and stunning views\"\n     }\n   ]\n}"
      }
    ],
    "model": "llama-3.3-70b-versatile",
    "temperature": 1,
    "max_completion_tokens": 1024,
    "top_p": 1,
    "stream": false,
    "response_format": {
      "type": "json_object"
    },
    "stop": null
  });
 
  return  chatCompletion.choices[0].message.content
}
