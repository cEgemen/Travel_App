
import {StyleSheet,View,Text} from 'react-native'
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, spaces, subTitle, title } from '../../constands';
import {CustomCalenderPicker,CustomTouchableButton, SquareButton, StackHeader} from '../../components';
import { router, Stack } from 'expo-router';
import {useGuideStore} from '../../managments';
import dayjs from 'dayjs';
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
       router.replace("/home")
  } 
 
    return (
    <SafeAreaView style={styles.safeAreaStyle} >
    {/*  <Stack.Screen options={{
          headerLeft : () => {
          return <SquareButton icon={leftArrowIcon} iconWrapperStyle={{}} contentStyle={{tintColor:colors.backgroundDark}}  onClick={handleBack} />
     }
     }} /> */}
     <View style={styles.container}>
        <StackHeader LeftComp={() => <SquareButton icon={leftArrowIcon} contentStyle={{tintColor:colors.backgroundDark}} onClick={handleBack} />} /> 
        <View style={styles.headerContainer}>
               <Text style={{...title,color:colors.text,paddingLeft:spaces.middle}}>
               Select Date 📅 
               </Text>
               <Text style={{...subTitle,color:colors.text,color:colors.gray,paddingLeft:spaces.high}}>
               📌 Select start date is {dateState.startDate !== null ? dateFormat(dateState.startDate) : "../../...."}
               </Text>
               <Text style={{...subTitle, color:colors.text,color:colors.gray,paddingLeft:spaces.high}}>
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
     btnStyle : {
         backgroundColor:colors.primary,marginVertical:"auto"
     },
     btnTextStyle : {
         color:colors.textSecondary,fontSize:fonts.smallMidFontSize,fontWeight:fonts.smallFontWeight
     }
})