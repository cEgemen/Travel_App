import { StyleSheet, View,Text ,ScrollView, Dimensions, Image, Pressable} from 'react-native';
import { router} from 'expo-router';
import onBoardImg1 from "../assets/images/onBoard1.png"
import onBoardImg2 from "../assets/images/onBoard2.png"
import onBoardImg3 from "../assets/images/onBoard3.png"
import onBoardImg4 from "../assets/images/onBoard4.png"
import { useState } from 'react';
import { colors,fonts,borderRadius,spaces } from '../constands';
import { BasePageWrapper, DoteSlider } from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get("window").width
export default function App() {
   const [currentIndex,setCurrentIndex] = useState(0)    
   const insets = useSafeAreaInsets()

   const data = [
    {image:onBoardImg1,title:"Discover Amazing Destinations",description:" Explore breathtaking places around the world with personalized travel recommendations.",color:"rgb(134, 116, 146)"},
    {image:onBoardImg2,title:"Plan Your Perfect Trip",description:" Get detailed travel itineraries tailored to your budget and preferences.",color:"rgb(224, 151, 102)"},
    {image:onBoardImg3,title:"Hassle-Free Booking & Navigation",description:"Find top attractions, book tours, and navigate like a local—all in one app.",color:"rgb(111, 168, 120)"},
    {image:onBoardImg4,title:"Make Every Journey Memorable",description:" Capture your travel experiences and get personalized tips to make your trip unforgettable.",color:"rgb(136, 177, 201)"}
               ]

   const topButtonPositionElements = {right:(spaces.middle + insets.right),top:(spaces.middle + insets.top)}            

  const handleSkip = () => {
        router.replace("/map/locStart")
  }         

  return <>
              <BasePageWrapper wrapperStyle={[styles.safeArea,{backgroundColor:data[currentIndex].color}]}>
                   <Pressable onPress={handleSkip} style={[styles.skipButton,topButtonPositionElements]}>
                     <Text style={styles.skipText}>Skip</Text>
                   </Pressable>   
                   <ScrollView 
                       pagingEnabled
                       horizontal
                       showsHorizontalScrollIndicator={false}
                       onScroll={(event) => {
                            const  x  = event.nativeEvent.contentOffset.x
                            const index = Math.round(x / windowWidth)
                            if(index < data.length)
                            {
                              setCurrentIndex(index)
                            }                     
                             
                       }}
                   >
                     {data.map((value,index) => {
                          return <>
                                   <View style={{width:windowWidth,justifyContent:"center",paddingHorizontal:spaces.middle}} key={index}> 
                                      <Image style={styles.dataImageStyle} source={value.image} />
                                      <Text style={styles.title}>{value.title}</Text>
                                      <Text style={styles.subTitle} >{value.description}</Text>
                                   </View> 
                                 </>
                     })}
                   </ScrollView>
                   <DoteSlider doteSize={data.length} currentIndex={currentIndex}  />
              </BasePageWrapper>
         </>
}

const styles = StyleSheet.create({
    safeArea :  {
                  flex:1,justifyContent:"center"
                },  
     bottomSliderWrapper : {
               position:"absolute",bottom:0,width:"100%",height:64,justifyContent:"center",paddingHorizontal:spaces.middle,backgroundColor:"rgba(255,255,255,.15)"
     },                   
     skipButton:{
        width:50,height:50,borderRadius:borderRadius.circleRadius(60),backgroundColor:colors.background,
        alignItems:"center",justifyContent:"center",position:"absolute",zIndex:4
     },
     skipText:{
        fontSize:fonts.smallFontSize,fontWeight:fonts.middleFontWeight
     },
     dataImageStyle:{
      maxWidth:"100%",height:400,resizeMode:"cover",marginBottom:spaces.high
     },                                                
     title : {
        fontSize:fonts.middleHighFontSize,fontWeight:fonts.middleFontWeight,marginBottom:spaces.small,color:colors.background
     },
     subTitle:{
        fontSize:fonts.smallFontSize,fontWeight:fonts.highFontWeight,marginBottom:spaces.small,color:colors.gray
     }
});
