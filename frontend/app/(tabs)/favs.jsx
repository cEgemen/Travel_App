
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import { borderRadius, colors, elevation, fonts, spaces } from '../../constands/appConstand'
import { useGetOwnerFavGuides } from '../../hooks/query/queryHook'
import useUserStore from '../../managments/userStore'
import dayjs from 'dayjs'
import downIcon from "../../assets/icons/downArrow.png"
import upIcon from "../../assets/icons/upArrow.png"
import notesIcon from "../../assets/icons/notes.png"
import favImg from "../../assets/images/fav.png"
import FavGuideCard from '../../components/customPageComps/guideDetails/FavGuideCard'

const FavoriteGuides = () => {
  const [currentOrder,setCurrentOrder] = useState(1)
  const {id,token} = useUserStore(state => state.user)
  const {data,isLoading} = useGetOwnerFavGuides("67be0bac77f67c6718a5e8fa",currentOrder,"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMkBnbWFpbC5jb20iLCJleHAiOjE3NDE3MjUwOTZ9.ULhB9ilBooL7W71xhwwTUyXnj1r109um8jvQUhlghLs")
  const guides = isLoading ? ["null"] : []
  
  const format =  'DD/MM/YYYY'
  const dateFormat = (date) => {
           const newDate = dayjs(date).format(format)
           return newDate;
  }
 
 
 const calculateFavType = (featureName) => {
    let dataName = [];
    let dataValue = []
    if(guides.length > 0 && guides[0] !== "null")
    {
        let newGuides  = currentOrder === 1 ? guides : guides.reverse() 
        newGuides.forEach((value,index) => {
               const type = value.metadata[featureName] 
               if(dataName.length === 0)
                {
                  dataName.push(type)
                  dataValue.push(1)
                } 
                else
                {
                  const index = dataName.indexOf(type)
                  if(index === -1)
                  {
                    dataName.push(type)
                    dataValue.push(1)
                  }
                  else
                  {
                     const count = dataValue[index] + 1;
                     dataValue[index] = count
                  }
                }
        });
        let featureIndex=0
         dataValue.forEach((value,index) => {
               if(index === 0)
               {
                 featureIndex = 0
               }
               else
               {
                  if(value > dataValue[featureIndex])
                  {
                     featureIndex = index
                  }
               }
        })
        return dataName[featureIndex]
    }
}
  const handleSort = (mod) => {
      setCurrentOrder(oldState => mod)
  }

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
         <Stack.Screen
               options={{
                    headerShadowVisible:false,
                    headerTitleAlign:"center",
                    title:"Favorite Guides"
               }} 
          />
         <FlatList 
           showsVerticalScrollIndicator={false}
           contentContainerStyle={[styles.flatContentStyle,{height:guides.length === 0 ? "100%" : "auto"}]}
           keyExtractor={(item,index) => index}
           data={guides}
           ListHeaderComponent={() => {
                 return <View style={{paddingTop:spaces.high}}>
                          <Image source={notesIcon} style={{width:30,height:30,tintColor:colors.gray,position:"absolute",left:"45%",zIndex:2}} />
                          <View style={styles.flatHeaderWrapper}>
                             <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                              <Text style={styles.detailsText}>Fav Trip Type : {isLoading ? <ActivityIndicator size={"small"} color={colors.primary} /> : (guides.length === 0 ? "^^^--^---" : calculateFavType("travelType"))} </Text> 
                              <Text style={styles.detailsText}>Last Locaiton : {isLoading ? <ActivityIndicator size={"small"} color={colors.primary} /> : (guides.length === 0 ? "^^^--^---" :guides[currentOrder !== 1 ? guides.length-1 : 0].metadata.city)}  </Text>  
                             </View>
                             <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                               <Text style={styles.detailsText}>Fav Location : {isLoading ? <ActivityIndicator size={"small"} color={colors.primary} /> : (guides.length === 0 ? "^^^--^---" : calculateFavType("city"))} </Text>
                                <Text style={styles.detailsText}>Last Save Date : {isLoading ? <ActivityIndicator size={"small"} color={colors.primary} /> : (guides.length === 0 ? "^^^--^---" : dateFormat(guides[currentOrder === 1 ? guides.length-1 : 0].createDate))} </Text>
                             </View>
                          </View>
                          <View style={styles.sortWrapper}>
                           <Text style={[styles.subTitle]}>Guides Count : {isLoading ? <ActivityIndicator size={"small"} color={colors.primary} /> : guides.length} </Text>
                            <View style={{flexDirection:"row",gap:spaces.high}}>
                                  <Pressable onPress={() => handleSort(1)}>
                                     <Image style={[styles.flatHeaderIcon,{elevation:currentOrder === 1 ? 4 : 0,borderColor:currentOrder === 1 ? colors.primary : colors.lightGray,tintColor:currentOrder === 1 ? colors.primary : colors.lightGray}]} source={upIcon} />
                                  </Pressable>
                                  <Pressable onPress={() => {handleSort(2)}}>
                                     <Image  style={[styles.flatHeaderIcon,{elevation:currentOrder === 2 ? 4 : 0,borderColor:currentOrder === 2 ? colors.primary : colors.lightGray,tintColor:currentOrder === 2 ? colors.primary : colors.lightGray}]} source={downIcon} />
                                  </Pressable>
                            </View>
                            <Text style={styles.subTitle}>Sorts : {currentOrder === 1 ? "ASC" : "DESC"} </Text>
                          </View>  
                        </View>
           }}
           
           ListEmptyComponent={() => {
               return <View style={styles.flatEmptyWrapper}>
                             <Image style={styles.emptyImage} source={favImg} />
                       </View>
           }}
           renderItem={({item,index}) => {
            const content = isLoading  ?  <View style={{height:"100%",justifyContent:"center",alignItems:"center"}}>
                <ActivityIndicator size={"large"} color={colors.primary} />
              </View> : <FavGuideCard guide={item} />
                          return content;         
           }}
         /> 
    </SafeAreaView>
  )
}

export default FavoriteGuides

const styles = StyleSheet.create({
    safeAreaStyle : {
       flex:1,backgroundColor:colors.background
    },
    flatContentStyle : {
       padding:spaces.middle
    },
    flatEmptyWrapper:{
        flex:1
    },
    emptyImage : {
        width:"100%",height:"100%"
     },
    flatHeaderWrapper : {
        borderColor:colors.lightGray,borderWidth:2,width:"100%",borderRadius:borderRadius.middleRadius,elevation:elevation.middleShhadow,backgroundColor:colors.background,padding:spaces.high,gap:spaces.high
    },
    flatHeaderIcon:{
      width:25,height:25,resizeMode:"contain",borderWidth:1,backgroundColor:colors.background
    },
    sortWrapper:{
       justifyContent:"space-between",alignItems:"center",flexDirection:"row",marginVertical:spaces.high,marginHorizontal:spaces.middle
    }, 
    detailsText : {
       fontSize:fonts.smallFontSize - 2 , fontWeight:fonts.middleFontSize,color:colors.gray,flex:1
    },
    title : {
      fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight
    },
    subTitle : {
       fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight,color:colors.lightGray
    }
})