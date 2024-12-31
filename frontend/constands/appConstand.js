
export const colors = {
    secondary:"rgb(135, 162, 255)" ,
    primary : "rgb(247, 219, 240)",
    background: "hsl(258, 47.30%, 78.40%)",
    text: "rgb(249, 249, 249)",
    light:"rgb(255,255,255)",
    dark:"rgb(0,0,0)"
}

export const fonts = {
     
     smallFontSize : 15,
     smallMidFontSize:20,
     middleFontSize: 25,
     middleHighFontSize:30,
     highFontSize : 35,
     smallFontWeight:400,
     middleFontWeight:600,
     highFontWeight:800
}

export const shadows = {
       smallShadow : 2,
       middleShhadow:4,
       highShadow: 8
}

export const borderRadius = {
      smallRadius : 4,
      middleRadius:8,
      highRadius:12,
      highx2Radius:24,
      circleRadius: (compWidth) => compWidth / 2,  
      generateRadius : (compWidth,rate) => compWidth / rate
}

export const spaces = {
     small : 5,
     middle:10,
     high : 20,
     highx2 : 40
}


export const AI_PROMT = "Generate a detailed travel itinerary in JSON format for the location: {location}, covering {daysCount} days and {nightsCount} nights. Include:\nHotels: Provide details such as hotelName, hotelAddress, price in units or local currency (e.g., 20 TRY, $15, or €10), rating, geoCoordinates, description.\nDaily Travel Plan: For each day, provide a detailed schedule with multiple activities, including:\nactivityName: Name of the activity or place.\nactivityDetails: A brief description of the activity.\nrating: A user review score for the activity or place.\nprice: The cost of visiting the activity or location expressed in units or local currency (e.g., 20 TRY, $15, or €10).\nstartTime and endTime: Estimated start and end times for the activity.\ntimeToTravelFromPrevious: Time needed to travel from the previous activity or hotel.\ngeoCoordinates: Latitude and longitude of the activity location.\nEnsure all plans consider logical travel routes, realistic time allocations, and adapt based on the number of days and nights provided.\n" 