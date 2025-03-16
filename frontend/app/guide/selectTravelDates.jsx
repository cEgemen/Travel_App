
import { StyleSheet,View,Text, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, spaces } from '../../constands/appConstand';
import CustomCalenderPicker from '../../components/customPicker/calenderPicker';
import { useEffect, useState } from 'react';
import CustomTouchableButton from '../../components/customButtons/CustomTouchableButton';
import { router, Stack } from 'expo-router';
import useGuideStore from '../../managments/guideStore';
import dayjs from 'dayjs';
import TouchableIcon from '../../components/customButtons/TouchableIconButton';
import leftArrowIcon from "../../assets/icons/left_arrow.png"

const SelectTravelDates = () => {    
  const {setGuideInfo, resDayData , guideInfo}= useGuideStore(state => state)
  const [dateState , setDateState] = useState({...guideInfo.dayData}); 
  const format =  'DD/MM/YYYY'
  const dateFormat = (date) => {
         const newDate = dayjs(date).format(format)
         return newDate;
  }

  const calDayCount = (firstDate , lastDate) => {
    const start = new dayjs(firstDate)
    const end = dayjs(lastDate);
    const diffInDays = end.diff(start,"day")
    return diffInDays
  }

  const onPick = (date,type) => {
        if(type === "START_DATE" || (type === "END_DATE" && date === null))
        {
          if(type==="START_DATE")
          { 
            setDateState(oldState => {
                    return {startDate:date,endDate:null,daysCount:0,nightsCount:0}
            });
          }
        }
        else
        { 
            setDateState(oldState => {
                   const dayCount =  calDayCount(oldState.startDate,date);
                   return {startDate:oldState.startDate,endDate:date,daysCount:dayCount+1,nightsCount:dayCount}
            })
        }
  }

  const onClick = () => {
          const dayData = {...dateState}
          if(dateState.endDate === null)
          {
            setGuideInfo({type:"dayData",data:{...dayData,endDate:dayData.startDate,
              daysCount:1,nightsCount:1}}) 
          }
          else
          {
           setGuideInfo({type:"dayData",data:dayData}) 
          }  
          router.push("/guide/selectTravelType")
  }

  const handleBack = () => {
       resDayData()
       router.back()
  } 
 
    return (
    <SafeAreaView style={styles.safeAreaStyle} >
     <Stack.Screen options={{
          headerLeft : () => {
          return <TouchableIcon icon={leftArrowIcon} iconWrapperStyle={{}} iconStyle={{tintColor:colors.backgroundDark}} onPress={handleBack} />
     }
     }} />
     <View style={styles.container}>
        <View style={styles.headerContainer}>
               <Text style={styles.headerTitle}>
               Select Date 📅 
               </Text>
               <Text style={styles.headerSubTitle}>
               📌 Select start date is {dateState.startDate !== null ? dateFormat(dateState.startDate) : "../../...."}
               </Text>
               <Text style={styles.headerSubTitle}>
               📌 Select end date is {dateState.endDate !== null ? dateFormat(dateState.endDate) : (dateState.startDate === null ? "../../...." : dateFormat(dateState.startDate))}
               </Text>
        </View>
        <CustomCalenderPicker selectedStartDate={dateState.startDate} selectedEndDate={dateState.endDate} onPick={onPick}  />
        <CustomTouchableButton disabled={dateState.startDate === null} text={"Continue"} onPress={onClick} textStyle={styles.btnTextStyle} buttonStyle={{...styles.btnStyle,...{opacity:dateState.startDate === null ? 0.7 : 1}}} />
     </View>
    </SafeAreaView>
  )
}

export default SelectTravelDates

const styles = StyleSheet.create({
     safeAreaStyle : {
           flex:1,
     },
     container : {
         flex:1,backgroundColor:colors.background,paddingVertical:spaces.high,paddingHorizontal:spaces.middle
     },
     headerContainer :{
          marginTop:spaces.highx2,
          marginBottom:spaces.high,gap:spaces.small
     },
     headerTitle : {
              color:colors.text,fontSize:fonts.middleFontSize,fontWeight:fonts.highFontWeight,paddingLeft:spaces.middle
         },
     headerSubTitle : {
               color:colors.text,fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontSize,color:colors.gray,paddingLeft:spaces.high
         },
     btnStyle : {
         backgroundColor:colors.primary,marginVertical:"auto"
     },
     btnTextStyle : {
         color:colors.textSecondary,fontSize:fonts.smallMidFontSize,fontWeight:fonts.smallFontWeight
     }
})