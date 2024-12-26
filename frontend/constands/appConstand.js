
export const colors = {
    secondary:"rgb(135, 162, 255)" ,
    primary : "rgb(247, 219, 240)",
    background: "rgb(190, 174, 226)",
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
      circleRadius: (compWidth) => compWidth / 2,  
      generateRadius : (compWidth,rate) => compWidth / rate
}

export const spaces = {
     small : 5,
     middle:10,
     high : 20,
     highx2 : 40
}
