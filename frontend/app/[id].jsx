
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, fonts, spaces } from '../constands/appConstand'
import { useDeleteFavGuide, useGetFavGuide } from '../hooks/query/queryHook'
import useUserStore from '../managments/userStore'
import DaysScroll from '../components/customPageComps/guideDetails/DaysScroll'
import GuideCard from '../components/customPageComps/guideDetails/GuideCard'
import bookmarkIcon from "../assets/icons/bookmark.png"
import bookmark2Icon from "../assets/icons/bookmark2.png"

const DynamicGuide = () => {
  const {token} = useUserStore(state => state.user)
  const {id} = useLocalSearchParams()
  const [currentDay , setCurrentDay] = useState(0)
  const {data,isError,isLoading} = useGetFavGuide(id,token)
  const {mutate,isError:isMutateError,isPending,isSuccess} = useDeleteFavGuide(id,token) 
 
  const guide = isLoading ? {} :  data.ok_data.data;
 
  const handleDay = (newDay) => {
                       setCurrentDay(newDay)
                                }

  return (
    <SafeAreaView style={styles.safeView}>
            <Stack.Screen options={{
                  headerShadowVisible:false,
                  headerTitleAlign:"center",
                  title:"guide ID #"+id.substring(0,7),
                  headerRight:() => {
                    return <Pressable onPress={mutate} >
                           {isPending  ? <ActivityIndicator size={"small"} color={colors.primary} />  :  <Image style={{...styles.markIconStyle,tintColor:!isSuccess ? colors.primary : colors.backgroundDark}} source={!isSuccess ? bookmark2Icon : bookmarkIcon} />} 
                            </Pressable>
                                       }
            }}/>
                        {
                         isLoading ? 
                          <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                            <ActivityIndicator size={"large"} color={colors.primary} />
                          </View>  : 
                          <ScrollView style={styles.scrollStyle} showsVerticalScrollIndicator={false}>
                          <View style={styles.headerContainer}>  
                             <Text numberOfLines={1} style={styles.headerTitle}>📍{guide.metadata.city},{guide.metadata.country}</Text>
                             <Text style={{color:colors.lightGray,fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight}}>🌞 {guide.metadata.totalDays} 🌚 {guide.metadata.totalNights}</Text>
                          </View>
                          <DaysScroll currentDay={currentDay + 1} totalDays={guide.itinerary.length} onPress={handleDay} wrapperStyle={{marginBottom:spaces.high}} />
                          <FlatList
                              style={{paddingBottom:spaces.high}}
                              contentContainerStyle = {{gap:spaces.middle}}
                              keyExtractor={(item,index) => index}
                              data={guide.itinerary[currentDay].timeline}
                              ListHeaderComponentStyle={{marginBottom:spaces.middle}}
                              ListHeaderComponent={() => {
                                   const {date} = guide.itinerary[currentDay]
                                   return <View style={{alignItems:"center"}}>
                                            <Text style={{fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight,color:colors.lightGray}}>{date}</Text>
                                          </View>
                              }}
                              renderItem={({item,index}) => {
                                   return <GuideCard dailyGuide={item} /> 
                              }}
                           />
                        </ScrollView>
                        }
    </SafeAreaView>
  )
}

export default DynamicGuide

const styles = StyleSheet.create({
      
           safeView : {
                flex:1
           },
           scrollStyle : {
              flexGrow:1,backgroundColor:colors.background ,
              paddingVertical:spaces.middle,paddingHorizontal:spaces.high
           },
           markIconStyle:{
              width:25,height:25,resizeMode:"contain",tintColor:colors.backgroundDark,flexGrow:1
           },
           headerIconStyle: {
            tintColor:colors.backgroundDark
           },
           headerContainer:{
              marginBottom:spaces.high,flexDirection:"row",alignItems:"center"
           },
           headerTitle : {
               fontSize : fonts.smallMidFontSize , fontWeight : fonts.highFontWeight,color : colors.text,marginBottom:spaces.small,flex:1
           },
})