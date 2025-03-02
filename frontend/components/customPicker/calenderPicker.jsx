
import { StyleSheet} from 'react-native'
import React from 'react'
import CalendarPicker from "react-native-calendar-picker";
import { colors, fonts } from '../../constands/appConstand';

const CustomCalenderPicker = ({selectedStartDate=null,selectedEndDate=null,onPick=(date,type) => {}}) => {
  
  const onChange = (date, type) => {
          onPick(date,type)   
  }

  return (
    <CalendarPicker 
    onDateChange={onChange}
    minDate={new Date()} 
    startFromMonday={true}
    textStyle={styles.textStyle} 
    allowRangeSelection={true}  
    selectedRangeStyle={styles.selectedRangeStyle}
    disabledDatesTextStyle={styles.disableDateTextStle}
    selectedStartDate={selectedStartDate !== null ?  selectedStartDate : undefined }
    selectedEndDate={selectedEndDate !== null ? selectedEndDate : undefined}
    />  
  )
}

export default CustomCalenderPicker

const styles = StyleSheet.create({
      
     textStyle : {
         color:colors.text,fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight,
     },
     disableDateTextStle : {
         color:colors.lightGray
     },
     selectedRangeStyle:{
         backgroundColor:colors.primary
     }
})