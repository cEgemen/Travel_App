import {Dimensions, StyleSheet, Text, View} from 'react-native'
import  uuid from "react-native-uuid"
import { useState } from 'react'
import { borderRadius, colors, detailText, elevation, fonts, spaces, subTitle } from '../../constands'
import {useRouteStore,useLocationStore} from '../../managments'
import { router } from 'expo-router'
import { BasePageWrapper, SquareButton, StackHeader } from '../../components'
import { carIcon, checkIcon, closeIcon, distanceIcon, fingerIcon, leftShortArrowIcon } from '../../assets'

const windowWidth = Dimensions.get("window").width
 
const SelectedRoute = () => {
  const [selectedStations,setSelectedStations] = useState([0,1,2])
  const {startDetails,endDetails} = useLocationStore(state => state.locationDetails)
  const {selectMapRoute,setStationsRoutes} = useRouteStore(state => state)
  const {cost,distance,duration,locationsData} = selectMapRoute
  

  const handleStart = () => {
       const stations = selectedStations.map((value,index) => {
            const tmp = locationsData[value] 
            return {stationNo:(value+1),...tmp}   
       }).sort((a,b) => a.stationNo - b.stationNo) 
       setStationsRoutes(
         {
         stations:[
         {stationNo:0,lat:startDetails.lat,lon:startDetails.lon,name:startDetails.locationName},
         ...stations,
         {stationNo:11,lat:endDetails.lat,lon:endDetails.lon,name:endDetails.locationName} 
         ],
         stationsNumbers : selectedStations  
         }
                        ) 
       router.push("route/liveRoute")                 
  }

  const handleSelectStation = (index) => { 
       const isExist = selectedStations.find(value => value === index)
       let newSelectedStations = []
       if(isExist === undefined)
       {
           newSelectedStations = [...selectedStations,index]
       }
       else
       {
          newSelectedStations = selectedStations.filter((value) => value !== index)
       }
       setSelectedStations(oldState => newSelectedStations.sort((a,b) => a-b))
  }

  return (
     <BasePageWrapper wrapperStyle={styles.container} >
       
             <StackHeader 
             headerWrapperStyle={{paddingHorizontal:spaces.middle}}
             backIconWrapperStyle={{}} 
             LeftComp={() => {
                 return <SquareButton icon={leftShortArrowIcon} contentStyle={{tintColor:colors.backgroundDark}} onClick={() => router.back() } />
             }}
             title={"STATIONS"}
             RightComp={() => {
                return <SquareButton icon={fingerIcon} contentStyle={{tintColor:colors.backgroundDark}} onClick={handleStart} />
             }}
             />
            <View style={{width:"100%",flexDirection:"row",alignItems:"center",height:50,paddingHorizontal:50}}>
             {selectedStations.map((value,index) => {
                  const middleOfArr = Math.ceil(selectedStations.length / 2)
                  const middleIndex = middleOfArr - 1
                  const leftArr = selectedStations.filter((value , valueIndex) => valueIndex < middleIndex)
                  const rightArr = selectedStations.filter((value , valueIndex) => valueIndex > middleIndex)
                  const isLeft=(index+1) < middleOfArr
                  const isRight = (index+1) > middleOfArr
                  let calculatePosition =  ((windowWidth/2)-20)
                  if(isLeft)
                  {
                    const leftIndex = leftArr.indexOf(value) 
                    calculatePosition = calculatePosition + ((leftArr.length -leftIndex)*30)
                  }
                  else if(isRight)
                  {
                    const rightIndex = rightArr.indexOf(value)
                    calculatePosition = calculatePosition - ((rightIndex+1)*26)
                  }
                  return <SquareButton label={value+1} iconWrapperStyle={{position:"absolute",right:calculatePosition,elevation:elevation.middleShadow,borderWidth:.5,borderColor:colors.darkGray}} key={uuid.v4()} />
             })}
            </View>
            <View style={{flex:1,padding:spaces.middle}}>
               <View style={{flexDirection:"row",alignItems:"center"}}>
                  <SquareButton icon={carIcon} contentStyle={{tintColor:colors.darkGray}} />
                  <View style={{marginLeft:spaces.middle}}>
                     <Text style={subTitle}>Start Station</Text>
                     <Text style={[detailText,{color:colors.darkGray}]}>{startDetails.locationName}</Text> 
                  </View>  
                  </View>
               <View style={{width:"100%",flexDirection:"row",paddingLeft:(40/2)-1,marginVertical:spaces.middle}}>
                 <View style={{width:1,height:"auto",borderLeftWidth:2,borderStyle:"dotted",borderLeftColor:colors.darkGray}}></View>
                 <View style={{flex:1,marginLeft:(40/2)-1+10,rowGap:spaces.high}}>
                     {locationsData.map((location , index) => {
                        const isSelect = selectedStations.find(value => index === value) !== undefined 
                        return  <View style={{flexDirection:"row",alignItems:"center"}} key={uuid.v4()} >
                                 <SquareButton icon={distanceIcon}  contentStyle={{tintColor:isSelect ? colors.primary : colors.darkGray}} /> 
                                 <View style={{flex:1,marginHorizontal:spaces.middle}}>
                                    <Text style={detailText}>{index+1}. Station</Text>
                                    <Text numberOfLines={1} style={[detailText-3,{color:isSelect ? colors.primary : colors.darkGray}]}>{location.name}</Text>
                                 </View>
                                 <SquareButton icon={isSelect ? checkIcon : closeIcon} iconWrapperStyle={{marginLeft:"auto"}} contentStyle={{tintColor:isSelect ? colors.primary : colors.darkGray}} onClick={() => handleSelectStation(index)}  /> 
                                </View>
                     })}
                 </View>
               </View>
               <View style={{flexDirection:"row",alignItems:"center"}}>
                  <SquareButton icon={carIcon} contentStyle={{tintColor:colors.darkGray}} />
                  <View style={{marginLeft:spaces.middle}}>
                     <Text style={subTitle}>Destination Station</Text>
                     <Text style={[detailText,{color:colors.darkGray}]}>{endDetails.locationName}</Text>
                  </View>       
               </View>
            </View>

     </BasePageWrapper>
  )
}

export default SelectedRoute

const styles = StyleSheet.create({
      container : {
         flex:1,backgroundColor:colors.background,position:"relative"
      },
      backBtnWrapper : {
         position:"absolute",top:spaces.small,left:spaces.small,backgroundColor:colors.primary,width:40,height:40,borderRadius:borderRadius.circleRadius(40),opacity:.9,justifyContent:"center",alignItems:"center",zIndex:2
      },
      backBtnStyle : {
         width:30 , height: 30,
      },
      btnStyle : {
         width:"50%",height:40,backgroundColor:colors.primary
      },
      title: {
         fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight 
      },
      flatContainerWrapper : {
       gap:spaces.middle,borderRightColor:colors.darkGray,borderLeftColor:colors.darkGray,borderRightWidth:2,borderLeftWidth:2,borderStyle:"dashed",marginHorizontal:spaces.high
      },
      flatWrapper:{
        width:"100%",height:200,position:"absolute",bottom:0,backgroundColor:"rgba(255,255,255,.8)"
      },
      bottomBtnStyl : {
         marginVertical:"auto",height:"30",width:"auto",paddingHorizontal:spaces.high,backgroundColor:colors.primary,alignSelf:"center"
      }

})