import { StyleSheet,View,Text,FlatList, Image, Pressable, SafeAreaView } from 'react-native'
import { borderRadius, colors, fonts, spaces } from '../../constands';
import { useState } from 'react';
import {CustomTouchableButton,TouchableIcon} from '../../components';
import { router, Stack } from 'expo-router';
import {useGuideStore} from '../../managments';
import leftArrowIcon from "../../assets/icons/left_arrow.png"
import rightArrowIcon from "../../assets/icons/right_arrow.png"

const SelectTravelPrice = () => {
  const prices = [{type:"💵 Economic Price",price:"20 - 100 USD"},{type:"",price:""},{type:"",price:""},{type:"💷 Middle Level Price",price:"100 - 300 USD"},{type:"💰 Luxury Price",price:"300 - 1.000+ USD"},{type:"",price:""}];

  const getSelectedIndex = (type) => {
    if(type === null)
    {
        return 0
    }   
    return prices.indexOf(type) === -1 ? 0 : prices.indexOf(type)
  }

  const getSelectedArrowIndex = (selectedIndex) => {
    return  selectedIndex % 2 === 0 ? selectedIndex + 1 : selectedIndex - 1
  }
  
  const {setGuideInfo,resPrice,guideInfo} = useGuideStore(state => state)
  const [priceState,setPriceState] = useState({selectIndex:getSelectedIndex(guideInfo.price),selectArrowIndex:getSelectedArrowIndex(getSelectedIndex(guideInfo.price))})  
 
  const handleBack = () => {
     resPrice()
     router.back()
  }

  const onClick = () => {
      const price = prices[priceState.selectIndex].type.substring(2)
      setGuideInfo({type:"price",data:price})
      router.dismissAll()
      router.replace("/guide/generate")
  }

  const handleSelect = (type) => {
     const selectIndex = getSelectedIndex(type)
     const selectArrowIndex = getSelectedArrowIndex(selectIndex)
     setPriceState({selectIndex,selectArrowIndex})
  }

  const PriceContainer = ({item,index}) => {
      const backgroundColor =  colors.background
      const borderColor =  colors.backgroundDark 
      const color =  colors.text 
      const opacity = priceState.selectIndex !== index ? .4 : 1
      const elevation = priceState.selectIndex !== index ? 0 : 4
       return <>
                {
        item.type !== "" ? 
        <Pressable style={[styles.priceContainerStyle,{backgroundColor , borderColor , borderWidth:1,elevation,opacity}]} onPress={() => {handleSelect(item)}}>
         <Text style={[styles.priceContainerTextStyle,{color}]}>{item.type}</Text>
        </Pressable> :
         <View style={{width:30,height:30}}>
          {priceState.selectArrowIndex === index ? <Image source={priceState.selectArrowIndex % 2 !== 0 ? leftArrowIcon : rightArrowIcon} style={styles.priceContainerIconStyle} />  :  null}
         </View>   
       }
              </>
  } 

  return (
    <SafeAreaView
     style={styles.safeAreaStyle} >
    <Stack.Screen options={{
         headerLeft : () => {
         return <TouchableIcon icon={leftArrowIcon} iconWrapperStyle={{}} iconStyle={{tintColor:colors.backgroundDark}} onPress={handleBack} />
    }
    }} />
    <View style={styles.container}>
       <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>
              Select Price Type 💲
              </Text>
              <Text style={styles.headerSubTitle}>
              📌 Select the trip price is {prices[priceState.selectIndex].type.substring(2)}.
              </Text>
              <Text style={styles.headerSubTitle}>
              📌 Average daily spending is {prices[priceState.selectIndex].price}.
              </Text>
       </View>
        <FlatList 
            data={prices}
            keyExtractor={(item,index)=> index}
            style={{maxHeight:480}}
            numColumns={2}
            columnWrapperStyle={{justifyContent:"space-evenly",alignItems:"center"}}
            contentContainerStyle={{gap:spaces.high,marginVertical:"auto"}}
            renderItem={({item,index}) => {
                  return <>
                            <PriceContainer index={index} item={item} />
                         </>
            }}
        />
       <CustomTouchableButton  text={"Continue"} onPress={onClick} textStyle={styles.btnTextStyle} buttonStyle={{...styles.btnStyle}} />
    </View>
   </SafeAreaView>
  )
}

export default SelectTravelPrice

const styles = StyleSheet.create({
    safeAreaStyle : {
               flex:1,
         },
         container : {
             flex:1,backgroundColor:colors.background,paddingVertical:spaces.high,paddingHorizontal:spaces.middle
         },
         headerContainer :{
              marginTop:spaces.highx2,
              marginBottom:spaces.high,gap:spaces.small
         },
         headerTitle : {
              color:colors.text,fontSize:fonts.middleFontSize,fontWeight:fonts.highFontWeight,paddingLeft:spaces.middle
         },
         headerSubTitle : {
               color:colors.text,fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontSize,color:colors.gray,paddingLeft:spaces.high
         },
         btnStyle : {
             backgroundColor:colors.primary,marginVertical:"auto"
         },
         btnTextStyle : {
             color:colors.textSecondary,fontSize:fonts.smallMidFontSize,fontWeight:fonts.smallFontWeight
         },
         priceContainerStyle : {
            backgroundColor:colors.primary,width:"60%",height:60,justifyContent:"center",alignItems:"center",
            borderRadius:borderRadius.middleRadius
         },
         priceContainerTextStyle : {
             color:colors.background,fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight
         },
         priceContainerIconStyle : {
             width:30,height:30,tintColor:colors.backgroundDark,fontWeight:fonts.middleFontWeight,fontSize:fonts.smallMidFontSize
         }
})