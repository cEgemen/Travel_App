

import { ActivityIndicator, StyleSheet, Text, View, FlatList, ToastAndroid} from 'react-native'
import {memo, useEffect, useState} from 'react'
import { colors, fonts, spaces } from '../../../constands'
import {getSuggesPlaces} from "../../../confs/groqAlConf"
import SuggesCard from './SuggesCard'

const SuggesContainer = memo((props) => {
    const [isLoading,setIsLoading] = useState(true)  
    const [suggesData , setSuggesData] = useState({country:null,city:null,places:["","","","",""]})
    useEffect(() => {
        let timeOut = null
         const getData = async () => {
                 getSuggesPlaces().then(data => {
                     setIsLoading(false)
                   timeOut = setTimeout(()=> {
                         setSuggesData(JSON.parse(data))   
                     }, 500)
                 })
                 .catch(err => {
                     ToastAndroid.showWithGravity("Creatin Suggestion is faild.",ToastAndroid.LONG,ToastAndroid.BOTTOM)
                 })
          }
           getData()
          
         return () => {
             if(timeOut !== null)
             {
                 clearTimeout(timeOut)
             }
         }   
             
       },[])

   const suggesTextProcces = isLoading ? <ActivityIndicator color={colors.primary}/> : <Text>✔️</Text>
   const suggesTextLocation = suggesData.city === null ? <ActivityIndicator color={colors.primary}/> : <Text style={styles.suggesText}>{suggesData.city},{suggesData.country}</Text>

    return (
      <View style={[styles.suggesContainer,props.containerStyle]}>
        <View style={styles.suggesHeaderWrapper}>
            <Text style={styles.suggesText}>⚙️ Your suggestions are being created ...
            </Text>
            <View style={{flexDirection:"row"}}>
                <Text style={styles.suggesText}>🔧 Procces is </Text>
                {suggesTextProcces}
            </View> 
            <View style={{flexDirection:"row"}}>
              <Text style={styles.suggesText}>📍Location is </Text>
              {suggesTextLocation}  
            </View>
            
       </View>
         <FlatList
            style={{}}
            contentContainerStyle={{paddingHorizontal:spaces.middle,gap:spaces.middle,alignItems:"center"}}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item,index) => index}
            data={suggesData.places}
            renderItem={({item}) => {
                 return <SuggesCard suggesData={item} isLoading={suggesData.city === null} />
            }}
          /> 
       </View>
    )
  })

export default SuggesContainer

const styles = StyleSheet.create({
    suggesContainer:{
        width:"100%",height:300,gap:spaces.middle
     },
     suggesHeaderWrapper : {
        flexDirection:"column",gap:spaces.small,alignItems:"flex-start"
     },
     suggesText:{
        fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontSize,color:colors.darkGray,
                }
})