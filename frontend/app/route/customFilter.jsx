import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colors, spaces } from '../../constands/appConstand'
import { router, Stack } from 'expo-router'
import TouchableIcon from '../../components/customButtons/TouchableIconButton'
import leftArrowIcon from "../../assets/icons/left_arrow_short.png"
import TopStepper from '../../components/customPageComps/route/TopStepper'
import CustomTouchableButton from '../../components/customButtons/CustomTouchableButton'
import VehicleFilter from '../../components/customPageComps/route/VehicleFilter'
import PriceFilter from '../../components/customPageComps/route/PriceFilter'
import PlaceFilter from '../../components/customPageComps/route/PlaceFilter'
import useLocationStore from '../../managments/locationStore'

const CustomFilter = () => {
  const stepperTitles = ["Vehicle Type","Price Type","Place Types"]
  const defaultValues = ["Car","Free",["Tourism"]]
  const setFilters = useLocationStore(state => state.setFilters)
  const [stepperState,setStepperState] = useState({title:stepperTitles[0],index:0})
  const [filterState,setFilterState] = useState({vehicle:defaultValues[0],price:defaultValues[1],places:defaultValues[2],scan:5000})
  const handleFilter = (key,value) => {
      if(key === "places")
      {
          const isExist = filterState.places.find(place => place === value)
          let newPlaceFilter = []
          if(isExist && filterState.places.length > 1)
          {
            newPlaceFilter = filterState.places.filter(place => place !== value )
          }
          else
          {
            newPlaceFilter = [...filterState.places,value]
          }
          setFilterState(oldState => {
                  return {...oldState , [key]:newPlaceFilter}
              })
          return     
      }
      setFilterState(oldState => {
          return {...oldState,[key]:value}
      })
  }
  const handleBackBtn = () => {
      if(stepperState.index> 0 && stepperState.index <= 2)
      {
          const filterName = stepperState.index === 2 ? "places" : stepperState.index === 1 ? "price" : "vehicle" 
          const filterDefaultValue = defaultValues[stepperState.index]
          setStepperState(oldState => {
              return {title:stepperTitles[oldState.index - 1],index:oldState.index - 1}
          })

          setFilterState(oldState => {
               return {...oldState , [filterName] : filterDefaultValue}
          })
      }
      else{
         router.back()
      }
  }
  const handleBtnPress = () => {
     if(stepperState.index === 0)
     {
       setFilterState(oldState => {
           return {...oldState , vehicle : filterState.vehicle}
       })  
     }
     else if(stepperState.index === 1)
     {
      setFilterState(oldState => {
        return {...oldState , price : filterState.price}
    })
     }
     else if(stepperState.index === 2){
      setFilterState(oldState => {
        return {...oldState , places : filterState.places}
    })
     }
     else {
       setFilters(filterState)  
       router.dismissAll()
       router.replace("/guide/generate")
       return;
     }
     setStepperState(oldState => {
        return {title : oldState.index >= 2 ? stepperTitles[2] : stepperTitles[oldState.index + 1],index : oldState.index + 1}
     })

  }
  return (
     <>
        <Stack.Screen options={{
               headerTransparent:false,
               headerShadowVisible:false,
               headerTitleAlign:"center",
               title:stepperState.title,
               headerLeft:() => {
                  return <TouchableIcon icon={leftArrowIcon} iconStyle={styles.headerIcon} onPress={handleBackBtn} />
               }
        }} />
        <SafeAreaView style={styles.wrapper}> 
           <TopStepper activeIndex={stepperState.index} />
           <View style={styles.content}>
             { 
               stepperState.index === 0 ? <VehicleFilter onPress={handleFilter} activeValue={filterState.vehicle} /> : stepperState.index === 1 ? <PriceFilter onPress={handleFilter} activeValue={filterState.price} /> : <PlaceFilter onPress={handleFilter} activeValue={filterState.places} />
             }
              
           </View>
           <CustomTouchableButton text={stepperState.index !== 2 ? "Next" : "Draw Route"} buttonStyle={styles.btnStyle} onPress={handleBtnPress}/>
        </SafeAreaView>
     </>
        )
}

const styles = StyleSheet.create({
     wrapper : {
         backgroundColor:colors.background,height:"100%",paddingVertical:spaces.small,paddingHorizontal:spaces.high
     },
     headerIcon : {
         tintColor:colors.backgroundDark
     },
     content : {
          height:"60%",justifyContent:"center",marginTop:spaces.highx2
     },
     btnStyle : {
         width:"60%",backgroundColor:colors.primary,alignSelf:"center",marginVertical:"auto"
     }
})

export default CustomFilter