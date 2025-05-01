
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import { borderRadius, colors, elevation, fonts, spaces } from '../../constands'
import { useGetOwnerFavGuides } from '../../hooks/query/queryHook'
import {useUserStore} from '../../managments'
import dayjs from 'dayjs'
import downIcon from "../../assets/icons/downArrow.png"
import upIcon from "../../assets/icons/upArrow.png"
import notesIcon from "../../assets/icons/notes.png"
import favImg from "../../assets/images/fav.png"
import {FavGuideCard} from '../../components'

const FavoriteGuides = () => {
  const [currentOrder,setCurrentOrder] = useState(1)
  const {id,token} = useUserStore(state => state.user)
  const {data,isLoading} = useGetOwnerFavGuides(id,currentOrder,token)
  const guides = isLoading ? ["null"] : data.ok_data.data
  
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
                          <Image source={notesIcon} style={{width:30,height:30,tintColor:colors.darkGray,position:"absolute",left:"45%",zIndex:2}} />
                          <View style={styles.flatHeaderWrapper}>
                             <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                              <Text style={styles.detailsText}>Fav Trip :{isLoading ? <ActivityIndicator size={"small"} color={colors.primary} /> : (guides.length === 0 ? "^^^--^---" : calculateFavType("travelType"))} </Text> 
                               <Text style={styles.detailsText}>Fav Location :{isLoading ? <ActivityIndicator size={"small"} color={colors.primary} /> : (guides.length === 0 ? "^^^--^---" : calculateFavType("city"))} </Text>
                             </View>
                             <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                <Text style={styles.detailsText}>Last City :{isLoading ? <ActivityIndicator size={"small"} color={colors.primary} /> : (guides.length === 0 ? "^^^--^---" :guides[currentOrder !== 1 ? guides.length-1 : 0].metadata.city)}  </Text> 
                                <Text style={[styles.detailsText]}>Last Save Date:{isLoading ? <ActivityIndicator size={"small"} color={colors.primary} /> : (guides.length === 0 ? "^^^--^---" : dateFormat(guides[currentOrder === 1 ? guides.length-1 : 0].createDate))} </Text>
                             </View>
                          </View>
                          <View style={styles.sortWrapper}>
                           <Text style={[styles.subTitle]}>Guides Count : {isLoading ? <ActivityIndicator size={"small"} color={colors.primary} /> : guides.length} </Text>
                            <View style={{flexDirection:"row",gap:spaces.high,justifyContent:"center"}}>
                                  <Pressable onPress={() => handleSort(1)}>
                                     <Image style={[styles.flatHeaderIcon,{elevation:currentOrder === 1 ? 4 : 0,borderColor:currentOrder === 1 ? colors.primary : colors.gray,tintColor:currentOrder === 1 ? colors.primary : colors.gray}]} source={upIcon} />
                                  </Pressable>
                                  <Pressable onPress={() => {handleSort(2)}}>
                                     <Image  style={[styles.flatHeaderIcon,{elevation:currentOrder === 2 ? 4 : 0,borderColor:currentOrder === 2 ? colors.primary : colors.gray,tintColor:currentOrder === 2 ? colors.primary : colors.gray}]} source={downIcon} />
                                  </Pressable>
                            </View>
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
        width:"100%",height:"500"
     },
    flatHeaderWrapper : {
        borderColor:colors.gray,borderWidth:2,width:"100%",borderRadius:borderRadius.middleRadius,elevation:elevation.middleShhadow,backgroundColor:colors.background,padding:spaces.high,gap:spaces.high
    },
    flatHeaderIcon:{
      width:25,height:25,resizeMode:"contain",borderWidth:1,backgroundColor:colors.background
    },
    sortWrapper:{
       justifyContent:"space-around",alignItems:"center",flexDirection:"row",marginVertical:spaces.high,marginHorizontal:spaces.middle
    }, 
    detailsText : {
       fontSize:fonts.smallFontSize - 2 , fontWeight:fonts.middleFontSize,color:colors.darkGray,flex:1
    },
    title : {
      fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight
    },
    subTitle : {
       fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight,color:colors.gray
    }
})