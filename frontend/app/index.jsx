import { StyleSheet, View } from 'react-native';
import { router} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import onBoardImg1 from "../assets/images/onBoard1.png"
import onBoardImg2 from "../assets/images/onBoard2.png"
import onBoardImg3 from "../assets/images/onBoard3.png"
import onBoardImg4 from "../assets/images/onBoard4.png"
import { useState } from 'react';
import {spaces } from '../constands/appConstand';
import CardSlider from '../components/sliders/CardSlider';
import DoteSlider from '../components/sliders/DoteSlider';


export default function App() {
      
   const onJump = () => router.replace("/profile")
   const onStep = (size,mod,currentIndex) => {
        onHandleIndexState(size,mod,currentIndex)
   }

   const data = [
    {image:onBoardImg1,description:"Discover undiscovered routes around the world! Easily create travel plans and thrown into new adventures.",color:"rgb(134, 116, 146)"},
    {image:onBoardImg2,description:"Discover the best restaurants, hidden paradise and popular tourist places. All the information you need on your journey is in one place!",color:"rgb(145, 188, 158)"},
    {image:onBoardImg3,description:"Draw your own route, take a break where you want, continue without interrupting the discovery! Car rental and travel tips here.",color:"rgb(197, 164, 142)"},
    {image:onBoardImg4,description:"Organize your entire trip from the city transportation guide to daily plans!",color:"rgb(136, 177, 201)"}
               ]

  const [indexState,setIndexState] = useState({left:{index:3,label:"Skip",onPress:onJump},current:{index:0,label:"current",onPress:()=>{}},right:{index:2,label:"Next",onPress:()=>{onStep(data.length,1,0)}}})

  const onHandleIndexState = (size,mod,currentIndex) => {
       let left = {};
       let current = {};
       let right = {};

       if(mod === 1)
       {
            if(size-1 === currentIndex)
              {
                current = {index:0,label:"current",onPress:()=>{}}
                left = {index:currentIndex,label:"Previous",onPress:()=>{onStep(size,-1,current.index)}}
                right = {index:1,label:"Done",onPress:()=>{onJump()}}
                setIndexState(oldSTate => {
                    return {current,left,right};
                })
              } 
            else if(size-1 === currentIndex + 1)
              {
                current = {index:size-1,label:"current",onPress:()=>{}}
                left = {index:currentIndex,label:"Previous",onPress:()=>{onStep(size,-1,current.index)}}
                right = {index:0,label:"Done",onPress:()=>{onJump()}}
                setIndexState(oldSTate => {
                    return {current,left,right};
                })
              }
            else if (size - 1 > currentIndex -1 )
              {
                current = {index:currentIndex+1,label:"current",onPress:()=>{}}
                left = {index:currentIndex,label:"Previous",onPress:()=>{onStep(size,-1,current.index)}}
                right = {index:currentIndex+2,label:"Next",onPress:()=>{onStep(size,1,current.index)}}
                setIndexState(oldSTate => {
                    return {current,left,right};
                })
              } 
            else if (currentIndex === 0)
              {
                 current = {index:currentIndex+1,label:"current",onPress:()=>{}}
                 left =    {index:currentIndex,label:"Skip",onPress:()=>{onJump()}}
                 right =   {index:currentIndex+2,label:"Next",onPress:()=>{onStep(size,1,current.index)}}
                 setIndexState(oldSTate => {
                     return {current,left,right};
                 })
              }     
       }
       else 
       {
        if(0 === currentIndex)
          {
            current = {index:size-1,label:"Done",onPress:()=>{onJump()}}
            left = {index:size-2,label:"Previous",onPress:()=>{onStep(size,-1,current.index)}}
            right = {index:0,label:"Next",onPress:()=>{onStep(size,1,current.index)}}
            setIndexState(oldSTate => {
                return {current,left,right};
            })
          } 
        else if(0 === currentIndex - 1)
          {
            current = {index:0,label:"current",onPress:()=>{}}
            left = {index:size-1,label:"Skip",onPress:()=>{onJump()}}
            right = {index:1,label:"Next",onPress:()=>{onStep(size,1,current.index)}}
            setIndexState(oldSTate => {
                return {current,left,right};
            })
          }
        else if (0 < currentIndex - 1 )
          {
            current = {index:currentIndex-1,label:"current",onPress:()=>{}}
            left = {index:currentIndex-2,label:"Previous",onPress:()=>{onStep(size,-1,current.index)}}
            right = {index:currentIndex,label:"Next",onPress:()=>{onStep(size,1,current.index)}}
            setIndexState(oldSTate => {
                return {current,left,right};
            })
          } 
       }
  }

  return <>
              <SafeAreaView style={[styles.safeArea,{backgroundColor:data[indexState.current.index].color}]}>
                      <CardSlider cardData={data} indexState={indexState} />
                      <View style={styles.bottomSliderWrapper}>
                        <DoteSlider doteSize={data.length} indexState={indexState} />
                      </View>
              </SafeAreaView>
         </>
}

const styles = StyleSheet.create({
    safeArea :  {
                  flex:1,justifyContent:"center",paddingBottom:64
                },  
     bottomSliderWrapper : {
               position:"absolute",bottom:0,width:"100%",height:64,justifyContent:"center",paddingHorizontal:spaces.middle,backgroundColor:"rgba(255,255,255,.15)"
     }                   
                                                    
});
