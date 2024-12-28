

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import React, { useRef } from 'react'
import { shadows } from '../../constands/appConstand';

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

export default GoogleAutoSearch