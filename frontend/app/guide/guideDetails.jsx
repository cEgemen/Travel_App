
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { borderRadius, colors, fonts, spaces } from '../../constands/appConstand'
/* import { LocationManagment } from '../../managments/locationManagment'
import HotelContainer from '../../components/customPageComps/guideDetails/hotelContainer'
import DaysScroll from '../../components/customPageComps/guideDetails/daysScroll'
import ActivityContainer from '../../components/customPageComps/guideDetails/activityContainer'
import { GetPlaceImg } from '../../confs/googleAPIService' */

const GuideDetails = () => {
/*   const {locationState,setLocationState} = useContext(LocationManagment);
  const [daysState,setDaysState] = useState({currentIndex:0})  
  const locationPromt =  JSON.parse(locationState.locationPromt)
 
  const onClick = (index) => {
      setDaysState(oldState=> {
           return {currentIndex:index}
      })
  }
 */

  return (
      <SafeAreaView style={styles.safeView}>
             {/* <ScrollView showsVerticalScrollIndicator={false}>
                       <GetPlaceImg imgRef={locationState.photoRef} style={styles.locationImage}  />
                       
                        <View style = {styles.detailsContainer}>
                       
                        <Text style={styles.headerTitle}>📍{locationPromt.location}</Text>
                        
                        <Text style={styles.headerDate}>📅 {locationState.startDate} - {locationState.endDate}</Text>
                       
                        <Text style={styles.headerSubTitle}>🏨 Hotels </Text>
                        
                        <HotelContainer hotels={locationPromt.hotels}  />
                        
                        <Text style={styles.headerSubTitle}>🎯 Activitys </Text>

                        <DaysScroll dayCount={locationPromt.dailyPlan.length} onPress={onClick} />

                        <ActivityContainer activities={locationPromt.dailyPlan} />

                   </View>
             </ScrollView> */}
      </SafeAreaView>
  )
}

export default GuideDetails

const styles = StyleSheet.create({
      
      safeView : {
            width:"100%",height:"100%"
      },
      locationImage : {
          width:"100%",height:"200",resizeMode:"cover",backgroundColor:"black"
      },
      detailsContainer : {
          width:"100%",borderTopLeftRadius:borderRadius.highx2Radius,borderTopRightRadius:borderRadius.highx2Radius,backgroundColor:colors.background,marginTop:"-20",
          paddingTop:spaces.high,paddingHorizontal:spaces.middle
      },
      headerTitle : {
          fontSize : fonts.highFontSize , fontWeight : fonts.highFontWeight,color : colors.text,marginBottom:spaces.small
      },
      headerDate : {
          marginBottom:spaces.high,marginLeft:spaces.middle,
          fontSize : fonts.smallFontSize , fontWeight : fonts.smallFontWeight,color : colors.text
      },
      headerSubTitle : {
        fontSize : fonts.middleFontSize , fontWeight : fonts.middleFontWeight,color : colors.text,marginBottom:spaces.small,marginLeft:spaces.small,marginBottom:spaces.middle
      }
})