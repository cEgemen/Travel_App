import { StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { colors, spaces } from '../../constands'
import { router } from 'expo-router'
import {TopStepper,CustomTouchableButton,VehicleFilter,PriceFilter,PlaceFilter, BasePageWrapper, StackHeader, SquareButton} from '../../components'
import {leftShortArrowIcon} from "../../assets"
import {useLocationStore} from '../../managments'

const CustomFilter = () => {
  const stepperTitles = ["Vehicle Type","Price Type","Place Types"]
  const defaultValues = ["car","free",["amenity"]]
  const setFilters = useLocationStore(state => state.setFilters)
  const [stepperState,setStepperState] = useState({title:stepperTitles[0],index:0})
  const [filterState,setFilterState] = useState({vehicle:defaultValues[0],price:defaultValues[1],places:defaultValues[2],scan:5000})
  const handleFilter = (key,value) => {
      if(key === "places")
      {
          const isExist = filterState.places.find(place => place === value)
          let newPlaceFilter = []
          console.log("isExist && filterState.places.length > 1 : ",(isExist && filterState.places.length > 1))
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
     else {
       setFilters(filterState)  
       router.dismissAll()
       router.replace("/route/generate")
       return;
     }
     setStepperState(oldState => {
        return {title : oldState.index >= 2 ? stepperTitles[2] : stepperTitles[oldState.index + 1],index : oldState.index + 1}
     })
  }
  return (
     <>
        <BasePageWrapper wrapperStyle={styles.wrapper}> 
          <StackHeader  
          title={stepperState.title} 
          LeftComp={() => {
              return <SquareButton icon={leftShortArrowIcon} contentStyle={{tintColor:colors.backgroundDark}} onClick={handleBackBtn} />
          }} 
          headerWrapperStyle={{marginBottom:spaces.middle,paddingLeft:spaces.middle+5}} 
          />
          <View style={{flex:1,paddingHorizontal:spaces.high}}>
           <TopStepper activeIndex={stepperState.index} />
           <View style={styles.content}>
             { 
               stepperState.index === 0 ? <VehicleFilter onPress={handleFilter} activeValue={filterState.vehicle} /> : stepperState.index === 1 ? <PriceFilter onPress={handleFilter} activeValue={filterState.price} /> : <PlaceFilter onPress={handleFilter} activeValue={filterState.places} />
             }
              
           </View>
           <CustomTouchableButton text={stepperState.index !== 2 ? "Next" : "Draw Route"} buttonStyle={styles.btnStyle} onPress={handleBtnPress}/>
          </View>
          
        </BasePageWrapper>
     </>
        )
}

const styles = StyleSheet.create({
     wrapper : {
         backgroundColor:colors.background,height:"100%"
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