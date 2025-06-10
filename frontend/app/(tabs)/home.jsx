import {StyleSheet,View,Text} from 'react-native'
import {useEffect, useState } from 'react'
import { colors, fonts, spaces } from '../../constands'
import { router, Stack } from 'expo-router'
import {SuggesContainer,AutoCompletSearchInput,ChatBotHome,ModalWithButtons, BaseKeyboardWrapper, BasePageWrapper, StackHeader, SquareButton} from '../../components'
import {useUserStore,useGuideStore, useLocationStore} from '../../managments'
import { logoutIcon } from '../../assets'
import * as Location from 'expo-location';


const Home = () => {
  const {username} = useUserStore(state => state.user)
  const setGuideInfo = useGuideStore(state => state.setGuideInfo )
  const setStartDetails = useLocationStore(state => state.setStartDetails)
  const [isVisible,setIsVisible] = useState(false)

  const logOut = () => {
      router.replace("/login")
  }
 
  const setModal = (mod) => {
      mod === 1 ? setIsVisible(true) : setIsVisible(false)
  }

  const selectLocation = (location) => {
      setGuideInfo({type:"location",data:location.locationName})
      router.replace("/guide/selectTravelDates")
  }

  const selectChatBot = () => {
      router.push("/chat")
  }

  useEffect(() => {

        const getUserLocation = async () => {
              const {status} = await Location.requestForegroundPermissionsAsync()
              if(status === "granted")
              { 
                 const {coords} = await Location.getCurrentPositionAsync()
                 const {latitude,longitude} = coords
                 const res = await Location.reverseGeocodeAsync({latitude,longitude}) 
                 const {region,country} = res[0]
                 setStartDetails({lat:latitude,lon:longitude,locationName:region+","+country})
              }
        }

        getUserLocation()

  },[])

  return (
     <BasePageWrapper wrapperStyle={styles.container}>
       <Stack.Screen options={{headerShown:false}} />
       <StackHeader headerWrapperStyle={{paddingHorizontal : spaces.middle}} LeftComp={() => <>
         <View style={styles.header}>
            <Text numberOfLines={1} style={styles.headerText}>Hello {username}</Text>
         </View>
                 </>} RightComp={() => <>
        <SquareButton icon={logoutIcon} contentStyle={{tintColor:colors.darkGray}} onClick={() => {setModal(1)}} />
                   </> } />
       <BaseKeyboardWrapper >
         {(keyboardHeight,keyboardIsShow) => (
        <View style={{flex:1,padding:spaces.middle}}>
             <ModalWithButtons isVisible={isVisible} closeVisible={() => {setModal(2)}} cancel={() => {setModal(2)}} 
             confirm={logOut} title='Log Out Info' desc='Are you sure you want to log out?' />
             <ChatBotHome onClick={selectChatBot} />
             <View style={styles.contentHeader}>
             <Text style={styles.contentHeaderTopText}>Let the Adventure Begin! 🌍</Text>
             <Text style={styles.contentHeaderBottomText}>Discover new places, plan your trips, and create unforgettable memories!</Text>
             </View>
             <AutoCompletSearchInput onPress={selectLocation} focusColor={colors.primary} placeholder='Enter Location ...' infoCount={2}/>
            <SuggesContainer containerStyle = {{marginVertical:"auto"}}  />
       </View>      
         )}
       </BaseKeyboardWrapper>
     </BasePageWrapper>
  )
}

const styles = StyleSheet.create({
       container : {
           flex:1,backgroundColor:colors.background
       },
       detailWrapper : {
             flex:1,padding:spaces.middle,backgroundColor:"red"
       },
       header:{
         gap:spaces.small,marginLeft:spaces.middle
       },
       headerText:{
          fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight,color:colors.darkGray
       },
       contentHeader:{
          gap:spaces.small,marginBottom:spaces.highx2
       },
       contentHeaderTopText:{
         fontSize:fonts.middleFontSize,fontWeight:fonts.middleFontWeight,color:colors.textPrimary
       },
       contentHeaderBottomText:{
         fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight,color:colors.textPrimary,color:colors.gray
       },
      
})

export default Home