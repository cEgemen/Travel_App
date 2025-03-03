
export const popularCities = [{ city: "Tokyo", country: "Japan" },{ city: "New York", country: "USA" },{ city: "London", country: "UK" },{ city: "Rome", country: "Italy" },{ city: "Istanbul", country: "Turkey" },{ city: "Sydney", country: "Australia" },{ city: "Paris", country: "France" },{ city: "Bangkok", country: "Thailand" },{ city: "Dubai", country: "UAE" },{ city: "Barcelona", country: "Spain" },{ city: "Berlin", country: "Germany" },{ city: "Prague", country: "Czech Republic" },{ city: "Los Angeles", country: "USA" },{ city: "Rio de Janeiro", country: "Brazil" },{ city: "Cape Town", country: "South Africa" },{ city: "Hong Kong", country: "China" },{ city: "Singapore", country: "Singapore" },{ city: "Vienna", country: "Austria" },{ city: "Seoul", country: "South Korea" },{ city: "Athens", country: "Greece" },{ city: "Moscow", country: "Russia" },{ city: "Buenos Aires", country: "Argentina" }, { city: "Mexico City", country: "Mexico" },{ city: "Amsterdam", country: "Netherlands" },{ city: "Lisbon", country: "Portugal" },{ city: "Marrakech", country: "Morocco" },{ city: "Delhi", country: "India" },{ city: "Beijing", country: "China" },{ city: "Cairo", country: "Egypt" },{ city: "Toronto", country: "Canada" },{ city: "San Francisco", country: "USA" },{ city: "Venice", country: "Italy" },{ city: "Stockholm", country: "Sweden" },{ city: "Hanoi", country: "Vietnam" },{ city: "Kuala Lumpur", country: "Malaysia" },{ city: "Edinburgh", country: "UK" },{ city: "Florence", country: "Italy" },{ city: "Santiago", country: "Chile" },{ city: "Oslo", country: "Norway" },{ city: "Havana", country: "Cuba" },{ city: "Lima", country: "Peru" },{ city: "Jakarta", country: "Indonesia" },{ city: "Dublin", country: "Ireland" },{ city: "Brussels", country: "Belgium" },{ city: "Munich", country: "Germany" },{ city: "Budapest", country: "Hungary" }];
  
export const getGuidePromt = ({city,country,startDate,endDate,daysCount,nightsCount,type,price}) => {
     return `
      Generate a detailed **minute-by-minute travel itinerary** in **PURE JSON FORMAT ONLY**. Follow this structure exactly.

      **USER INPUTS:**
      - **Country**: ${country}
      - **City**: ${city}
      - **Departure Date**: ${startDate}
      - **Return Date**: ${endDate}
      - **Total Duration**: ${daysCount} days, ${nightsCount} nights
      - **Travel Type**: ${type}
      - **Budget Class**: ${price}

      **RESPONSE FORMAT STRICTLY JSON**:
      { 
        "metadata": { 
          "location": "${city}, ${country}",
          "startDate": "${startDate}",
          "endDate": "${endDate}",
          "totalDays": ${daysCount},
          "totalNights": ${nightsCount},
          "currency": "$/€/₺",
          "emergencyContacts": ["local police: 155", "tourist hotline: 444 0 863"]
        },
   "itinerary": [
      {
         "day": 1,
         "theme": "Nature Trip",
         "date": "${startDate}",
         "timeline": [
            {
               "type": "Morning Routine",
               "time": "07:30-08:00",
               "activities": [
                  {
                     "name": "Wake-up & Breakfast",
                     "location": "Hotel Restaurant",
                     "details": "Enjoy a traditional English breakfast spread.",
                     "duration": "30 mins",
                     "cost": "Included in hotel stay",
                     "address": "Your hotel’s restaurant"
                  }
               ]
            },
            {
               "type": "Sightseeing",
               "time": "09:00-10:30",
               "activities": [
                  {
                     "name": "Visit Hyde Park",
                     "location": "Hyde Park",
                     "details": "Explore one of London's largest parks, including the Serpentine Lake and Diana Memorial Fountain.",
                     "duration": "1.5 hours",
                     "cost": "Free",
                     "address": "Hyde Park, London"
                  }
               ]
            },
            {
               "type": "Lunch",
               "time": "11:00-12:30",
               "activities": [
                  {
                     "name": "Lunch at a local pub",
                     "location": "The Spaniards Inn",
                     "details": "Try traditional English cuisine at a historic pub.",
                     "duration": "1.5 hours",
                     "cost": "£15-20 per person",
                     "address": "The Spaniards Inn, Spaniards Rd, London"
                  }
               ]
            },
            {
               "type": "Afternoon Activity",
               "time": "13:30-15:00",
               "activities": [
                  {
                     "name": "Visit Kew Gardens",
                     "location": "Kew Gardens",
                     "details": "Explore the Royal Botanic Gardens, a UNESCO World Heritage Site.",
                     "duration": "1.5 hours",
                     "cost": "£15 per person",
                     "address": "Kew Gardens, Richmond, London"
                  }
               ]
            },
            {
               "type": "Dinner",
               "time": "18:00-20:00",
               "activities": [
                  {
                     "name": "Dinner at a local restaurant",
                     "location": "The Delaunay",
                     "details": "Enjoy European cuisine in a grand setting.",
                     "duration": "2 hours",
                     "cost": "£25-35 per person",
                     "address": "The Delaunay, 55 Aldwych, London"
                  }
               ]
            },
            {
               "type": "Departure",
               "time": "11:00",
               "activities": [
                  {
                     "name": "Check-out and depart",
                     "location": "Hotel",
                     "details": "Check-out of the hotel and depart for the airport or your next destination.",
                     "duration": "30 mins",
                     "cost": "None",
                     "address": "Your hotel"
                  }
               ]
            }
         ]
      }
    ]
  }`
}