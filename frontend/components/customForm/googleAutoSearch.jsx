

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import React from 'react'
import searchIcon from "../../assets/icons/search.png"
import { borderRadius, colors } from '../../constands/appConstand';
import { StyleSheet } from 'react-native';

const GoogleAutoSearch = ({API_KEY,language="tr",placeholder="Search",fetchDetails=false,onPress=(data,details=null) => {}}) => {
  
  return (
      <GooglePlacesAutocomplete 
          placeholder={placeholder}
          fetchDetails = {fetchDetails}
          onPress={(data, details = null) => {
           onPress(data,details)
          }}
          query={{
            key:API_KEY,
            language: language,
          }}
        />
  )
}

const styles = StyleSheet.create({
        textInputStyle : {
              
              backgroundColor:colors.primary,
              borderRadius:borderRadius.middleRadius
        }
})

export default GoogleAutoSearch