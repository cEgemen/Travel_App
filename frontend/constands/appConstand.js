
export const colors = {
  primary:"rgb(121, 149, 206)",
  secondary: 'rgb(144, 225, 174)',
  lightGray: 'rgb(242, 240, 240)', 
  gray: 'rgb(207, 204, 204)', 
  darkGray: 'rgb(167, 165, 165)', 
  background: 'rgb(255, 255, 255)', 
  backgroundDark: 'rgb(18, 18, 18)',
  textPrimary: 'rgb(0, 0, 0)', 
  textSecondary: 'rgb(255, 255, 255)', 
  textMuted: 'rgb(128, 128, 128)', 
  error: 'rgb(255, 0, 0)', 
  warning: 'rgb(255, 165, 0)', 
  success: 'rgb(0, 128, 0)', 
  border: 'rgb(200, 200, 200)', 
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

export const elevation = {
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