
export const popularCities = [{ city: "Tokyo", country: "Japan" },{ city: "New York", country: "USA" },{ city: "London", country: "UK" },{ city: "Rome", country: "Italy" },{ city: "Istanbul", country: "Turkey" },{ city: "Sydney", country: "Australia" },{ city: "Paris", country: "France" },{ city: "Bangkok", country: "Thailand" },{ city: "Dubai", country: "UAE" },{ city: "Barcelona", country: "Spain" },{ city: "Berlin", country: "Germany" },{ city: "Prague", country: "Czech Republic" },{ city: "Los Angeles", country: "USA" },{ city: "Rio de Janeiro", country: "Brazil" },{ city: "Cape Town", country: "South Africa" },{ city: "Hong Kong", country: "China" },{ city: "Singapore", country: "Singapore" },{ city: "Vienna", country: "Austria" },{ city: "Seoul", country: "South Korea" },{ city: "Athens", country: "Greece" },{ city: "Moscow", country: "Russia" },{ city: "Buenos Aires", country: "Argentina" }, { city: "Mexico City", country: "Mexico" },{ city: "Amsterdam", country: "Netherlands" },{ city: "Lisbon", country: "Portugal" },{ city: "Marrakech", country: "Morocco" },{ city: "Delhi", country: "India" },{ city: "Beijing", country: "China" },{ city: "Cairo", country: "Egypt" },{ city: "Toronto", country: "Canada" },{ city: "San Francisco", country: "USA" },{ city: "Venice", country: "Italy" },{ city: "Stockholm", country: "Sweden" },{ city: "Hanoi", country: "Vietnam" },{ city: "Kuala Lumpur", country: "Malaysia" },{ city: "Edinburgh", country: "UK" },{ city: "Florence", country: "Italy" },{ city: "Santiago", country: "Chile" },{ city: "Oslo", country: "Norway" },{ city: "Havana", country: "Cuba" },{ city: "Lima", country: "Peru" },{ city: "Jakarta", country: "Indonesia" },{ city: "Dublin", country: "Ireland" },{ city: "Brussels", country: "Belgium" },{ city: "Munich", country: "Germany" },{ city: "Budapest", country: "Hungary" }];
  
export const getGuidePromt = ({city,country,startDate,endDate,daysCount,nightsCount,type,price}) => {
     return `
      Generate a detailed **minute-by-minute travel itinerary** in **PURE JSON FORMAT ONLY**. Follow this structure exactly.

      **USER INPUTS:**
      - **Country**: ${country}
      - **City**: ${city}
      - **Start Date**: ${startDate}
      - **Last Date**: ${endDate}
      - **Total Duration**: ${daysCount} days, ${nightsCount} nights
      - **Travel Type**: ${type}
      - **Budget Class**: ${price}

      **RESPONSE FORMAT STRICTLY JSON**:{
   "metadata": {
      "country":  ${country},
      "city": ${city},
      "startDate": ${startDate},
      "lastDate": ${endDate},
      "totalDays": ${daysCount}, 
      "totalNights":${nightsCount},
      "travelType": ${type},
      "budgetClass": ${price}
   },
   "itinerary": [
      {
         "day": 1,
         "date": ${startDate},
         "timeline": [
            {
               "time": "08:00 - 09:00",
               "activity": "Breakfast at a local café",
               "locationName": "The Breakfast Club Soho",
               "address": "33 D'Arblay St, London W1F 8EU, UK",
               "details": "Enjoy a classic English breakfast with tea or coffee.",
               "cost": 15,
               "popularity": "8/10",
               "duration": "1 hour",
               "nextActivityTransition": {
                  "method": "Walking",
                  "estimatedTime": "10 minutes",
                  "nextLocation": "Buckingham Palace",
                  "nextAddress": "London SW1A 1AA, UK"
               }
            },
            {
               "time": "09:10 - 11:00",
               "activity": "Visit Buckingham Palace",
               "locationName": "Buckingham Palace",
               "address": "London SW1A 1AA, UK",
               "details": "Explore the iconic palace and witness the Changing of the Guard ceremony.",
               "cost": "Free",
               "popularity": "9/10",
               "duration": "1 hour 50 minutes",
               "nextActivityTransition": {
                  "method": "Walking",
                  "estimatedTime": "15 minutes",
                  "nextLocation": "The British Museum",
                  "nextAddress": "Great Russell St, London WC1B 3DG, UK"
               }
            },
            {
               "time": "11:15 - 13:00",
               "activity": "Explore the British Museum",
               "locationName": "The British Museum",
               "address": "Great Russell St, London WC1B 3DG, UK",
               "details": "One of the world's most famous museums with extensive historical artifacts.",
               "cost": "Free",
               "popularity": "9/10",
               "duration": "1 hour 45 minutes",
               "nextActivityTransition": {
                  "method": "Walking",
                  "estimatedTime": "10 minutes",
                  "nextLocation": "The Harp",
                  "nextAddress": "47 Chandos Pl, London WC2N 4HS, UK"
               }
            },
            {
               "time": "13:10 - 14:30",
               "activity": "Lunch at a traditional English pub",
               "locationName": "The Harp",
               "address": "47 Chandos Pl, London WC2N 4HS, UK",
               "details": "Enjoy classic fish and chips or a traditional meat pie with a pint.",
               "cost": 20,
               "popularity": "7/10",
               "duration": "1 hour 20 minutes",
               "nextActivityTransition": {
                  "method": "Walking",
                  "estimatedTime": "10 minutes",
                  "nextLocation": "South Bank of the Thames",
                  "nextAddress": "London SE1, UK"
               }
            },
            {
               "time": "14:40 - 17:00",
               "activity": "Walk along the South Bank",
               "locationName": "South Bank of the Thames",
               "address": "London SE1, UK",
               "details": "Enjoy street performers, book markets, and stunning river views.",
               "cost": "Free",
               "popularity": "8/10",
               "duration": "2 hours 20 minutes",
               "nextActivityTransition": {
                  "method": "Walking",
                  "estimatedTime": "10 minutes",
                  "nextLocation": "The National Gallery",
                  "nextAddress": "Trafalgar Square, London WC2N 5DN, UK"
               }
            },
            {
               "time": "17:10 - 19:30",
               "activity": "Visit the National Gallery",
               "locationName": "The National Gallery",
               "address": "Trafalgar Square, London WC2N 5DN, UK",
               "details": "Home to world-famous paintings from artists like Van Gogh and Monet.",
               "cost": "Free",
               "popularity": "9/10",
               "duration": "2 hours 20 minutes",
               "nextActivityTransition": {
                  "method": "Walking",
                  "estimatedTime": "10 minutes",
                  "nextLocation": "Dishoom Covent Garden",
                  "nextAddress": "12 Upper St Martin's Ln, London WC2H 9FB, UK"
               }
            },
            {
               "time": "19:40 - 21:00",
               "activity": "Dinner at a mid-range restaurant",
               "locationName": "Dishoom Covent Garden",
               "address": "12 Upper St Martin's Ln, London WC2H 9FB, UK",
               "details": "A popular restaurant offering delicious Indian cuisine in a stylish setting.",
               "cost": 30,
               "popularity": "9/10",
               "duration": "1 hour 20 minutes",
               "nextActivityTransition": {
                  "method": "Walking",
                  "estimatedTime": "5 minutes",
                  "nextLocation": "Lyceum Theatre",
                  "nextAddress": "21 Wellington St, London WC2E 7RQ, UK"
               }
            },
            {
               "time": "21:05 - 23:30",
               "activity": "Watch a West End show",
               "locationName": "Lyceum Theatre",
               "address": "21 Wellington St, London WC2E 7RQ, UK",
               "details": "Enjoy a world-class musical such as 'The Lion King'.",
               "cost": 50,
               "popularity": "9/10",
               "duration": "2 hours 25 minutes",
               "nextActivityTransition": {
                  "method": "Taxi",
                  "estimatedTime": "30 minutes",
                  "nextLocation": "London Heathrow Airport",
                  "nextAddress": "Longford TW6, UK"
               }
            },
            {
               "time": "00:00 - Departure",
               "activity": "Departure from London",
               "locationName": "London Heathrow Airport",
               "address": "Longford TW6, UK",
               "details": "Check-in for your flight and depart from London.",
               "duration":"?",
               "cost": "Varies",
               "popularity": "N/A",
               "nextActivityTransition": {
                  "method": "Varies",
                  "estimatedTime": "Varies",
                  "nextLocation": "Destination",
                  "nextAddress": "User's return location"
               }
            }
         ]
      }
   ]
}
`}
