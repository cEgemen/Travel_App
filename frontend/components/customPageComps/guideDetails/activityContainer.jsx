



import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, fonts, spaces } from '../../../constands/appConstand'
import ActivityCard from './activityCard'

const ActivityContainer = ({activities}) => {
  return (
       <View style={styles.container}>
         {
            activities.map((item,index) => {
                   return <View key={index} style={styles.wrapper}>
                         <Text style={styles.activityDayText}>
                            📆 Day {item.day}
                         </Text>
                         <FlatList 
                             data={item.activities}
                             showsVerticalScrollIndicator={false}
                             keyExtractor={((item,index) => index)}
                             renderItem={({item}) => {
                              return <> 
                                 <ActivityCard activity={item} />
                                      </>
                                }}
                                      />
                          </View>
            })
         }
       
       </View>
  )
}

export default ActivityContainer

const styles = StyleSheet.create({
     
     flat : {
           marginBottom : spaces.high
     },
     wrapper : {
           marginBottom : spaces.middle
     },
     activityDayText : {
       color:colors.text,paddingLeft:spaces.middle,fontSize:fonts.smallMidFontSize,fontWeight:fonts.smallFontWeight,
       marginBottom:spaces.small
     }
      
})