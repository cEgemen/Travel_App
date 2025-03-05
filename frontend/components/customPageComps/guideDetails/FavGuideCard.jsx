
import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { borderRadius, colors } from '../../../constands/appConstand'

const FavGuideCard = ({guide}) => {
  console.log("guide : ",guide)
  return (
    <View style={styles.wrapper}>
      <View>
          <Text>📍{guide.metadata.location}</Text>
          <View>
             <Text>{guide.createDate}</Text>
             <Text>🌞 {guide.metadata.totalDays} 🌚 {guide.metadata.totalNights}</Text>
          </View>
      </View>
      <Image />
    </View>
  )
}

/* 
[{"createDate": "2025-03-05T14:16:43.256Z", "id": "67c85ccb4dbc28712c9e9987", "metadata": {"currency": "$/€/₺", "emergencyContacts": [Array], "endDate": "05/03/2025", "location": "London, United Kingdom", "startDate": "05/03/2025", "totalDays": 1, "totalNights": 1}, "updateDate": "2025-03-05T14:16:43.256Z"}]
*/

export default FavGuideCard

const styles = StyleSheet.create({
        wrapper : {
            width:"100%",borderRadius:borderRadius.highRadius,borderColor:colors.primary,borderWidth:2
        }
})