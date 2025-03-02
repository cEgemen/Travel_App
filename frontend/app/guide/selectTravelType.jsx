import { StyleSheet,View,Text,FlatList, Image, Pressable, SafeAreaView } from 'react-native'
import { borderRadius, colors, fonts, spaces } from '../../constands/appConstand';
import { useState } from 'react';
import CustomTouchableButton from '../../components/customButtons/CustomTouchableButton';
import { router, Stack } from 'expo-router';
import useGuideStore from '../../managments/guideStore';
import TouchableIcon from '../../components/customButtons/TouchableIconButton';
import leftArrowIcon from "../../assets/icons/left_arrow.png"
import rightArrowIcon from "../../assets/icons/right_arrow.png"

const SelectTravelType = () => {
  const types = ["⛩️ Cultural Trip","","","🦙 Nature Trip","🏖️ Sea and Beach Trip","","","🍳 Gastronomy Trip","🎭 Art Trip",""];
  
  const getSelectedIndex = (type) => {
    if(type === null)
    {
        return 0
    }   
    return types.indexOf(type) === -1 ? 0 : types.indexOf(type)
  }

  const getSelectedArrowIndex = (selectedIndex) => {
    return  selectedIndex % 2 === 0 ? selectedIndex + 1 : selectedIndex - 1
  }
  
  const {setGuideInfo,resType,guideInfo} = useGuideStore(state => state)
  const [typeState,setTypeState] = useState({selectIndex:getSelectedIndex(guideInfo.type),selectArrowIndex:getSelectedArrowIndex(getSelectedIndex(guideInfo.type))})  
 
  const handleBack = () => {
     resType()
     router.back()
  }

  const onClick = () => {
      const type = types[typeState.selectIndex].split(" ")[1]
      setGuideInfo(type)
      router.push("/guide/selectTravelPrice")
  }

  const handleSelect = (type) => {
     const selectIndex = getSelectedIndex(type)
     const selectArrowIndex = getSelectedArrowIndex(selectIndex)
     setTypeState({selectIndex,selectArrowIndex})
  }

  const TypeContainer = ({item,index}) => {
      const backgroundColor = typeState.selectIndex === index ? colors.primary : colors.background
      const borderColor = typeState.selectIndex !== index ? colors.primary : colors.lightGray
      const color = typeState.selectIndex !== index ? colors.primary : colors.background 
      const elevation = typeState.selectIndex !== index ? 0 : 4
       return <>
                {
        item !== "" ? 
        <Pressable style={[styles.typeContainerStyle,{backgroundColor , borderColor , borderWidth:2,elevation}]} onPress={() => {handleSelect(item)}}>
         <Text style={[styles.typeContainerTextStyle,{color}]}>{item}</Text>
        </Pressable> :
         <View style={{width:30,height:30}}>
          {typeState.selectArrowIndex === index ? <Image source={typeState.selectArrowIndex % 2 !== 0 ? leftArrowIcon : rightArrowIcon} style={styles.typeContainerIconStyle} />  :  null}
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
              🏕️ Select Type
              </Text>
              <Text style={styles.headerSubTitle}>
                Select the trip type
              </Text>
       </View>
        <FlatList 
            data={types}
            keyExtractor={(item,index)=> index}
            style={{maxHeight:480}}
            numColumns={2}
            columnWrapperStyle={{justifyContent:"space-evenly",alignItems:"center"}}
            contentContainerStyle={{gap:spaces.high,marginVertical:"auto"}}
            renderItem={({item,index}) => {
                  return <>
                            <TypeContainer index={index} item={item} />
                         </>
            }}
        />
       <CustomTouchableButton  text={"Continue"} onPress={onClick} textStyle={styles.btnTextStyle} buttonStyle={{...styles.btnStyle}} />
    </View>
   </SafeAreaView>
  )
}

export default SelectTravelType

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
              color:colors.text,fontSize:fonts.middleFontSize,fontWeight:fonts.highFontWeight
         },
         headerSubTitle : {
               color:colors.text,fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontSize,color:colors.lightGray
         },
         btnStyle : {
             backgroundColor:colors.primary,marginVertical:"auto"
         },
         btnTextStyle : {
             color:colors.textSecondary,fontSize:fonts.smallMidFontSize,fontWeight:fonts.smallFontWeight
         },
         typeContainerStyle : {
            backgroundColor:colors.primary,width:"60%",height:60,justifyContent:"center",alignItems:"center",
            borderRadius:borderRadius.middleRadius
         },
         typeContainerTextStyle : {
             color:colors.background,fontSize:fonts.smallMidFontSize,fontWeight:fonts.middleFontWeight
         },
         typeContainerIconStyle : {
             width:30,height:30,tintColor:colors.backgroundDark,fontWeight:fonts.middleFontWeight,fontSize:fonts.smallMidFontSize
         }
})