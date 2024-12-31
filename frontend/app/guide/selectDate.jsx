
import { StyleSheet,View,Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, spaces } from '../../constands/appConstand';
import CustomCalenderPicker from '../../components/customPicker/calenderPicker';
import { useContext, useState } from 'react';
import moment from 'moment';
import CustomTouchableButton from '../../components/customButtons/customTouchableButton';
import { router } from 'expo-router';
import { LocationManagment } from '../../managments/locationManagment';



const SelectDate = () => {
    const [dateState , setDateState] = useState({startDate:null,endDate:null,dayCount:0}); 
    const {locationState,setLocationState} = useContext(LocationManagment)

  const format =  'DD/MM/YYYY'
  const dateFormat = (date) => {
         const newDate = moment(date).format(format)
         return newDate;
  }

  const calDayCount = (firstDate , lastDate) => {
    const start = moment(firstDate, format);
    const end = moment(lastDate, format);
    
    const diffInDays = end.diff(start, 'days');
    return diffInDays
  }

  const onPick = (date,type) => {
        if(type === "START_DATE")
        {
            setDateState(oldState => {
                     const newFirstDate = dateFormat(date);
                    return {startDate:newFirstDate,endDate:null,dayCount:0}
            });
        }
        else
        { 
            setDateState(oldState => {
                   const endDate = dateFormat(date)
                   const dayCount =  calDayCount(oldState.startDate,endDate)  ;
                   return {...oldState,endDate,dayCount:dayCount+1}
            })
        }
  }

  const onClick = () => {
          setLocationState(oldState => {
               return {...oldState,startDate:dateState.startDate,endDate:dateState.endDate,daysCount:dateState.dayCount,nightsCount:dateState.dayCount - 1}
          })
          router.push("/guide/generateTravelGuide")
  }

    return (
    <SafeAreaView style={styles.safeAreaStyle} >
     <View style={styles.container}>
        <View style={styles.headerContainer}>
               <Text style={styles.headerTitle}>
                    Select Date
               </Text>
               <Text style={styles.headerSubTitle}>
                 Select the trip start date and end date
               </Text>
        </View>
        <CustomCalenderPicker onPick={onPick}  />
        <CustomTouchableButton text={"Continue"} onPress={onClick} textStyle={styles.btnTextStyle} buttonStyle={styles.btnStyle} />
     </View>
    </SafeAreaView>
      

  )
}

export default SelectDate

const styles = StyleSheet.create({
     safeAreaStyle : {
           height:"100%",width:"100%",
     },
     container : {
         width:"100%",height:"100%",backgroundColor:colors.background,paddingVertical:spaces.high,paddingHorizontal:spaces.middle
     },
     headerContainer :{
          marginTop:spaces.highx2,
          marginBottom:spaces.high
     },
     headerTitle : {
          color:colors.text,fontSize:fonts.highFontSize,fontWeight:fonts.highFontWeight,marginBottom:spaces.small
     },
     headerSubTitle : {
           color:colors.text,fontSize:fonts.smallMidFontSize,fontWeight:fonts.smallMidFontSize
     },
     btnStyle : {
         backgroundColor:colors.secondary,marginVertical:"auto"
     },
     btnTextStyle : {
         color:colors.text,fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight
     }
})