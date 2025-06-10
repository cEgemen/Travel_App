

import {StyleSheet,View,Pressable, Image, Text} from 'react-native'
import { borderRadius, colors, elevation, spaces } from '../../../constands'
import {rightShortArrowIcon,leftShortArrowIcon} from "../../../assets"


const DaysScroll = ({currentDay,totalDays,onPress = (newDay) => {},wrapperStyle={}}) => {
  let days = [];
  const index = currentDay % 3
  if(totalDays === 1)
  {
     days = [currentDay,`~`,`~`]
  }
  else if(totalDays === 2)
  {
     if(totalDays > currentDay)
     {
       days=[currentDay,currentDay + 1,`~`]
     }
     else
     {
      days=[currentDay - 1,currentDay,`~`]
     }
  }
  else 
  {
    if(currentDay % 3 === 1)
      {
        days=[currentDay,currentDay + 1 < totalDays ? currentDay + 1 : `~`,currentDay + 2 < totalDays ? currentDay + 1 : `~`]
      }
      else if(currentDay % 3 === 2)
      {
       days=[currentDay - 1,currentDay,currentDay + 1 < totalDays ? currentDay + 1 : `~`]
      }
      else if(currentDay % 3 === 0)
      {
         days=[currentDay - 2,currentDay-1,currentDay]
      }
  }
 
  const handleClick = (mod) => { 
   
           let listIndex ;
           if(index - 1  === 0)
            {
               listIndex = 0
            } 
           else if(index - 1 === 1)
            {
               listIndex = 1
            } 
            else {
               listIndex = 2
            }
           if(mod === 1)
           {
              if(totalDays >= 2)
              {
                 if(days[listIndex] - 1 > 0)
                 {
                    onPress((days[listIndex] - 1) - 1)
                 }
              }
           }
           else{
            if(totalDays >= 2)
              {
                 if(days[listIndex] + 1 <= totalDays)
                 {
                    onPress(days[listIndex])
                 }
              }
              }
  }

  return (
    <View style={[styles.wrapper,wrapperStyle]}>
         <Pressable onPress={() => handleClick(1)} >
           <Image style={styles.buttonIconStyle} source={leftShortArrowIcon} />
         </Pressable>
         <View style={styles.daysWrapper}>
          <View style={index === 1 ? styles.activeDayStyle : styles.inActiveDayStyle}>
            <Text>{days[0]}</Text>
          </View>
          <View style={index === 2 ? styles.activeDayStyle : styles.inActiveDayStyle}>
            <Text>{days[1]}</Text>
          </View>
          <View style={index === 0 ? styles.activeDayStyle : styles.inActiveDayStyle}>
            <Text>{days[2]}</Text>
          </View>
         </View>
         <Pressable onPress={() => handleClick(2)} >
           <Image style={styles.buttonIconStyle} source={rightShortArrowIcon} />
         </Pressable>
    </View>
  )
}

export default DaysScroll

const styles = StyleSheet.create({
     wrapper: {
             flexDirection:"row",justifyContent:"space-around",alignItems:"center",paddingHorizontal:spaces.high
         },
      buttonIconStyle:{
       tintColor:colors.backgroundDark,width:30,height:30
      },
      daysWrapper : {
           flexDirection:"row",flexGrow:1,gap:spaces.high,alignItems:"center",justifyContent:"center"
      },
      inActiveDayStyle:{
           width:20,height:20,backgroundColor:colors.lightGray,justifyContent:"center",alignItems:"center",borderRadius:borderRadius.circleRadius(20)
      },
      activeDayStyle : {
        width:35,height:35,backgroundColor:colors.lightGray,borderRadius:borderRadius.circleRadius(35),elevation:elevation.middleShadow,justifyContent:"center",alignItems:"center"
      }
})