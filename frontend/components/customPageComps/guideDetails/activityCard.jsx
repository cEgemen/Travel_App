


import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { borderRadius, colors, fonts, shadows, spaces } from '../../../constands/appConstand'
import CustomTouchableButton from '../../customButtons/customTouchableButton'
import { getPlaceImgRef , getPlaceImg, GetPlaceImg} from '../../../confs/googleAPIService'


const ActivityCard = ({activity}) => {
  const [activityState,setActivityState] = useState({isLoading : true,activityImgRef:null})

  const getActivityImg = async () => {
      const activityImgRef = await getPlaceImgRef(activity.activityName)       
      setActivityState(oldState => {
              return {...oldState,isLoading:false,activityImgRef}
      })
  }

  useEffect(() => {
          getActivityImg()
  },[])

  return (
    <View style={styles.cardWrapper}>
       {
         activityState.isLoading ? 
         <ActivityIndicator size={"large"} /> : 
         <GetPlaceImg style={styles.cardImage} imgRef={activityState.activityImgRef}/>
       }
       <Text style={styles.activityName}>📌 {activity.activityName}</Text>
       <Text style={styles.activityDescription}>ℹ️ {activity.activityDetails}</Text>
       <Text style={styles.activityTime}>🕔 Start: {activity.startTime}</Text>
       <Text style={styles.activityTime}>🕔 End: {activity.endTime}</Text>
       <Text style={styles.activityPreTravel}>ℹ️ Time To Travel From Previous: {activity.timeToTravelFromPrevious}</Text>
       <View style={styles.cardDetailContainer}>
       <View style={styles.cardDetailWrapper}>
        <Text style={styles.activityPrice}>💸 {activity.price}</Text>
        <Text style={styles.activityRate}>⭐ {activity.rating === null ? "?" : activity.rating}</Text>
       </View>
       <CustomTouchableButton textStyle={styles.btnText} buttonStyle={styles.btn} text={"🗺️"} />
       </View>
    </View>
  )
}

export default ActivityCard

const styles = StyleSheet.create({
     cardWrapper : {
        width:"100%",backgroundColor:colors.secondary,marginBottom:spaces.middle,
        borderRadius:borderRadius.highRadius,overflow:"hidden"
      },
     cardImage : {
         width:"100%",height:100,resizeMode:"cover",backgroundColor:"white"
     },
     activityName : {
         fontSize:fonts.smallMidFontSize,fontWeight:fonts.smallFontWeight,color:colors.text,marginBottom:spaces.middle,textAlign:"justify"
     },
     activityDescription:{
          fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight,color:colors.text,marginBottom:spaces.middle,textAlign:"justify",paddingHorizontal:spaces.small
     },
     activityTime : {
          fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight,color:colors.text,marginBottom:spaces.middle,textAlign:"justify",paddingHorizontal:spaces.small
     }, 
     activityPreTravel : {
        fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight,color:colors.text,marginBottom:spaces.middle,textAlign:"justify",paddingHorizontal:spaces.small
     },
     cardDetailContainer:{
         flexDirection:"row",width:"100%",alignItems:"center",justifyContent:"space-between",padding:spaces.small,
     },
     cardDetailWrapper:{
       display:"flex",gap:spaces.small,
     },
     activityPrice : {
         fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight,color:colors.text
     },
     activityRate : {
         fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight,color:colors.text
     },
     btn:{
          width:50,height:50,borderRadius:borderRadius.circleRadius(50),backgroundColor:colors.text
     },
     btnText:{
          fontWeight:fonts.middleFontWeight,fontSize:fonts.middleFontSize
     }
})