
import { StyleSheet, Text, View,FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import SearchInput from '../../forms/SearchInput'
import { borderRadius, colors, elevation, fonts, spaces } from '../../../constands/appConstand'

const AutoCompletSearchInput = ({searchWrapperStyle={},inputStyle={}, focusColor=colors.gray, initialValue=""}) => {
  const [locations,setLocations] = useState([])
  const timeOutRef = useRef(null)

  const handleOnChange = (text) => {
        if(timeOutRef.current)
        { 
           clearTimeout(timeOutRef.current)
        }
        timeOutRef.current = setTimeout(() => {
                 getLocations(text)  
        },5000)
  }

  const getLocations = async (value) => {
      console.log("value : ",value)
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`, {headers: {
        'User-Agent': 'travell/1.0'
      }})
        .then(res => res.json())
        .then(data => {
              setLocations(data.map((value,index) => {
                     return value.display_name;
              })) 
        })
        .catch(err => console.log("err : ",err))
  }

  return (
    <View style={searchWrapperStyle}>
         <SearchInput inputStyle={inputStyle} focusColor={focusColor} initialValue={initialValue}  placeholder="Enter Location ..." onChangeCallback={handleOnChange}  />
         <FlatList
             showsVerticalScrollIndicator={false}
             style={{borderColor:colors.lightGray,borderWidth:1,borderRadius:borderRadius.middleRadius,borderTopColor:"white"}}
             contentContainerStyle={{paddingVertical:spaces.small,paddingHorizontal:spaces.middle,gap:spaces.small}}
             data={locations}
             keyExtractor={(item,index) => index}
             renderItem={({item,index}) => {
                  return <>
                            <View style={styles.locationWrapper}>
                               <Text numberOfLines={1} style={styles.locationText} onPress={() => {}}>
                                 {item}
                               </Text>
                            </View>
                         </>
             }}
          />
    </View>
  )
}

export default AutoCompletSearchInput

const styles = StyleSheet.create({
        locationWrapper : {
            borderColor:colors.lightGray,borderWidth:1,borderRadius:borderRadius.middleRadius,justifyContent:"center",paddingHorizontal:spaces.small  , paddingVertical:spaces.middle,elevation:elevation.smallShadow,backgroundColor:colors.background
        },
        locationText : {
           fontSize:fonts.smallFontSize,fontWeight : fonts.middleFontSize
        }
})