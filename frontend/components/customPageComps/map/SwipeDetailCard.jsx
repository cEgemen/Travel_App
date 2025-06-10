import { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { borderRadius, colors, elevation, fonts, spaces } from '../../../constands'
import { useLocationStore } from '../../../managments'
import CircleTouchableIcon from '../../customButtons/CircleTouchableIcon'
import { dottedWayIcon, leftArrowIcon,rightArrowIcon } from '../../../assets'
import AutoCompletSearchInput from '../home/AutoCompletSearchInput'
import BaseKeyboardWrapper from '../../baseWrappers/BaseKeyboardWrapper'
import { router } from 'expo-router'
import SelectFilterCard from './SelectFilterCard'


const SwipeDetailCard = () => {
 const defHeight = 20
 const [swipeLevel,setSwipeLevel] = useState({currentLevel:0,currentHeight:defHeight})   
 const [detailPageIndex,setDetailPageIndex] = useState(0)
 const [keyboardHeight,setKeyboardHeight] = useState(0)
 const [selectFilter,setSelectFilter] = useState(0)
 const {setFilters,locationDetails:{startDetails,endDetails},setStartDetails,setEndDetails} = useLocationStore(state => state)

 const handleDefFilterPress = () => { 
          setFilters({vehicle:"car",price:"free",places:["amenity"]})
          router.dismissAll()
          router.replace("/route/generate")
          return;
                                         }
 const handleCusFilterPress = () => {
           router.push("/route/customFilter")
                                        }

 const handleSwipePress = () => {

       if(detailPageIndex === 2)
       {
        swipeLevel.currentLevel === 2 ? setSwipeLevel(oldState => {
           console.log("oldState : ",oldState)
           return ({currentLevel : 1 ,currentHeight:((oldState.currentLevel)*defHeight)})
        }) : setSwipeLevel(oldState => ({currentLevel:oldState.currentLevel+1,currentHeight:((oldState.currentLevel+ 2)*defHeight)}))
       }
       else
       {
        swipeLevel.currentLevel === 2 ? setSwipeLevel(oldState => ({currentLevel : 0 , currentHeight:defHeight})) : setSwipeLevel(oldState => ({currentLevel:oldState.currentLevel+1,currentHeight:((oldState.currentLevel+2)*defHeight)})) 
       }
        
 }

 const handleNextIndex = () => {
      if(detailPageIndex===0)
      {
          if(!startDetails)
          {
            return
          }
      }
      else if(detailPageIndex === 1)
      {
          if(!endDetails)
            {
               return
            }
          else
          {
             setSwipeLevel(oldState => ({currentLevel : 2 ,currentHeight:((3)*defHeight)}))
          }   
      }
      
      setDetailPageIndex( oldState => {
          const index = oldState !== 2 ? oldState + 1 : oldState
          return index
      })   

 }

 const handlePreIndex = () => {
          if(detailPageIndex === 2)
          {
             setFilters(null)
          }
          else if (detailPageIndex === 1)
          {
             setEndDetails(null)
          }
          else
          {
            setStartDetails(null)
            router.back()
            return 
          }
          setDetailPageIndex( oldState => {
          const index = oldState !== 0 ? oldState - 1 : oldState
          return index
      })   
 }

 const handlePress = (data) => {
       /* detailPageIndex === 0 ? setStartDetails(data) : setEndDetails(data) */
       detailPageIndex === 0 ? setStartDetails(data) : setEndDetails(data)
 }

 const handleKeyboardHeight = (height) => {
     setKeyboardHeight(height)
 } 

 const swipeBackground = swipeLevel.currentLevel === 0 ? colors.background : (swipeLevel.currentLevel === 1 ? colors.lightGray : colors.gray)

 const rightIsDisableCircleBtn = detailPageIndex === 2

 return (
    
      <BaseKeyboardWrapper wrapperStyle={{...styles.container,height:(swipeLevel.currentHeight)+"%",bottom:(0+(keyboardHeight))}} onChangeCallback={(keyboardHeight) => handleKeyboardHeight(keyboardHeight)} >
        {({keyboardHeight}) => {
             return <>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:spaces.middle}}>
         <CircleTouchableIcon iconWrapperStyle={{backgroundColor:colors.background}} iconStyle={{tintColor:colors.backgroundDark}} icon={leftArrowIcon}  onPress={handlePreIndex} /> 
         <Pressable style={[styles.swipeDivider,{backgroundColor:swipeBackground}]} onPress={handleSwipePress}></Pressable>
         <CircleTouchableIcon iconWrapperStyle={{backgroundColor:colors.background}} iconStyle={{tintColor:colors.backgroundDark}} icon={rightArrowIcon} onPress={handleNextIndex} isDisable={rightIsDisableCircleBtn} /> 
        </View>     
        
        {
            detailPageIndex !== 2 ? 
             <>
         <View style={styles.detailWrapper}>
          <View style={styles.locDetailContainer}>
          <Text style={startDetails ? {...styles.title} : {...styles.title,...{color:colors.gray}}} numberOfLines={1} >{(startDetails) ? "📍"+(startDetails.locationName) : "❌ Your Start Location"}
          </Text>
          <Image source={dottedWayIcon} style={styles.iconSty} />
          <Text style={endDetails ? {...styles.title} : {...styles.title,...{color:colors.gray}} } numberOfLines={1} >{(endDetails) ? "📍"+(endDetails.locationName) : "❌ Your Destination Location"}
          </Text>
         </View>
        </View>
       { swipeLevel.currentLevel !== 0 ?
        <View style={{flex:1}}>
         <View style={{marginVertical:"auto"}}>
          <Text style={styles.autoSearchLabel}>{`Search ${detailPageIndex === 0 ? "Start" : "Destination"} Location`}</Text>
          <AutoCompletSearchInput onPress={handlePress} focusColor={colors.primary} infoCount={2} placeholder='İstanbul,London,Milano,Madrid,...' />
         </View>  
        </View>  : null
         }
             </>  : 
             <View style={styles.filterContainer}>
             <Text style={styles.filterTitle}>Select Fiter Settings</Text>
             <View style={styles.filterContent}>
             <View>
              <SelectFilterCard title='DEFAULT' isActive={0 === selectFilter} onPress={handleDefFilterPress} />  
              <Pressable style={{...styles.filterPressableCircleBtn,...{backgroundColor:selectFilter === 0 ? colors.primary : colors.gray}}} onPress={() => setSelectFilter(0)} />
             </View> 
             <View>
              <SelectFilterCard isCustom={true} title='CUSTOM' isActive={1 === selectFilter} onPress = {handleCusFilterPress} />  
              <Pressable style={{...styles.filterPressableCircleBtn,...{backgroundColor:selectFilter === 1 ? colors.primary : colors.gray}}} onPress={() => setSelectFilter(1)} />
             </View>         
             </View>      
            </View>
        }
                    
                    
                    </>
        }}
      </BaseKeyboardWrapper>
  )
}

export default SwipeDetailCard

const styles = StyleSheet.create({
    container : {
    width:"100%",position:"absolute",borderTopLeftRadius:spaces.highx2,borderTopRightRadius:spaces.highx2,elevation:elevation.middleShadow,backgroundColor:colors.background,padding:spaces.middle
    },
    swipeDivider : {
         height:"20",width:"100",borderRadius:borderRadius.middleRadius,borderWidth:2,borderColor:colors.backgroundDark
    },
    detailWrapper : {
        width:"100%", flexDirection:"row",alignItems:"center"
    },
    locDetailContainer : {
       flex:1
    },
    title:{
       fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight
    },
    subTitle : {
        fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight,marginBottom:spaces.small,color:colors.darkGray
    },
    iconSty:{
       width:"30",
       height:"30",
       resizeMode:"contain"
    },
    autoSearchLabel : {
       paddingLeft:spaces.small,color:colors.gray
    },

     filterContainer : {
              width:"100%",
              height:"100%",
              backgroundColor:colors.background,
              padding:spaces.small
         },
         filterTitle : {
            fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight,textAlign:"center"
         },
        filterContent : {
              width:"100%",
              flex:1,
              flexDirection:"row",
              justifyContent:"space-around",
              alignItems:"center"
         },
         filterPressableCircleBtn : {
            width:30,height:30,borderRadius:borderRadius.circleRadius(30),borderColor:colors.darkGray,borderWidth:2,alignSelf:"center",marginTop:spaces.high 
      }

})