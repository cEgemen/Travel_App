import { useQueryClient } from "@tanstack/react-query"
import { useUserStore } from "../../managments"
import { Stack, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { useDeleteFavGuide, useGetFavGuide, useSaveFavGuide } from "../../hooks/query/queryHook"
import { ActivityIndicator, FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, View } from "react-native"
import { colors, fonts, spaces } from "../../constands"
import { bookMarkIcon, fillBookMarkIcon } from "../../assets"
import { DaysScroll, GuideCard } from "../../components"



const DynamicGuide = () => {
  const client = useQueryClient() 
  const {token} = useUserStore(state => state.user)
  const {guideId} = useLocalSearchParams()
  const [currentDay , setCurrentDay] = useState(0)
  const [isSaved,setIsSaved] = useState(true)
  const [guide , setGuide] = useState(null)

  const {data,isError,isLoading,refetch} = useGetFavGuide(guideId,token,false)
  useEffect(() => {
    const getData = async () => {
       refetch().then(data => {
          setGuide(data.data.ok_data.data)
       }).catch(err => {console.log("err : ",err)})
    }          
          getData()
  },[])
  
  const errorCallBack = () => {ToastAndroid.showWithGravity("An Error Occurent.Plase Try Again.",ToastAndroid.LONG,ToastAndroid.BOTTOM)}
  
  const succesCallBack = (mod) => {
      const isSavedSuccess = mod === 1;
      setIsSaved(isSavedSuccess)
  }
  
  const {mutate:deleteMutate,isError:isDeleteMutateError,isPending:deletePending} = useDeleteFavGuide(id,client,token,()=>{succesCallBack(2)},errorCallBack)
  
  const {mutate:saveMutate,isError:isSaveMutateError,isPending:savePending} = useSaveFavGuide(guide,client,token,()=>{succesCallBack(1)},errorCallBack)
  
  const handleDay = (newDay) => {setCurrentDay(newDay)}

  const handleSave = isSaved ? deleteMutate : saveMutate                             
                                
  return (
    <SafeAreaView style={styles.safeView}>
            <Stack.Screen options={{
                  headerShadowVisible:false,
                  headerTitleAlign:"center",
                  title:"Guide ID #"+id.substring(0,7),
                  headerRight:() => {
                    return <Pressable onPress={handleSave} >
                           {(deletePending || savePending || isLoading || guide === null)  ? <ActivityIndicator size={"small"} color={colors.primary} />  :  <Image style={{...styles.markIconStyle,tintColor:isSaved ? colors.primary : colors.backgroundDark}} source={isSaved ? fillBookMarkIcon : bookMarkIcon} />} 
                            </Pressable>
                                       }
            }}/>
                        {
                         (isLoading || guide === null) ? 
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