
import { Image, StyleSheet} from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { colors, elevation, spaces } from '../../../constands'
import { chatRobotIcon, cloud1Img, cloud2Img, cloud3Img } from '../../../assets'
import SquareButton from '../../customButtons/SquareButton'


const ChatBotHome = ({onClick=() => {}}) => {
  
  const [imgState , setImgState] = useState({first:false,second:false,third:false});

  const cld1Ref = useRef(null);const cld2Ref = useRef(null);
  const cld3Ref = useRef(null);const cld4Ref = useRef(null);

  useEffect(() => {
        cld1Ref.current = setInterval(() => {
              setImgState(oldState => {
                return {...oldState,first:true}
              })
        cld2Ref.current = setTimeout(() => {
              setImgState(oldState => {
                return {...oldState,second:true}
                                      })
        cld3Ref.current = setTimeout(() => {
              setImgState(oldState => {
                return {...oldState,third:true}
                                        })
        cld4Ref.current = setTimeout(() => {
              setImgState(oldState => {
                return {first:false,second:false,third:false}
                                      })
             },750)                           
            },750)                          
           },1000)  
        },3000)       
  
 return () => {
      if(cld1Ref.current !== null)
        {
          clearInterval(cld1Ref.current)
        }
      if(cld2Ref.current !== null)
        {
          clearTimeout(cld2Ref.current)
        }
      if(cld3Ref.current !== null)
        {
          clearTimeout(cld3Ref.current)
        }
      if(cld4Ref.current !== null)
        {
          clearTimeout(cld4Ref.current)
        }
 }

  },[])

  return (
      <>
        <SquareButton onClick={onClick} icon={chatRobotIcon} iconStyle={styles.chatIcon} iconWrapperStyle={styles.chatIconWrapper} />
        {imgState.first ? <Image style={styles.cld1Style} source={cloud1Img} /> : null}
        {imgState.second ? <Image style={styles.cld2Style} source={cloud2Img} /> : null}
        {imgState.third ? <Image style={styles.cld3Style} source={cloud3Img} /> : null}
      </>
      
  )
}

export default ChatBotHome

const styles = StyleSheet.create({
          chatIconWrapper : {
              width:50,height:50,backgroundColor:colors.primary,elevation:elevation.middleShadow
              ,position:"absolute",zIndex:2,bottom:spaces.high,right:spaces.middle
           },
           chatIcon : {
              tintColor:colors.background
           },
           cld1Style : {
            width:20,height:20,resizeMode:"contain", position:"absolute",zIndex:2,bottom:spaces.high+35,right:spaces.high+35
           },
           cld2Style : {
            width:40,height:40,resizeMode:"contain", position:"absolute",zIndex:2,bottom:spaces.high+40,right:spaces.high+45
           },
           cld3Style : {
            width:100,height:100,resizeMode:"contain",  position:"absolute",zIndex:2,bottom:spaces.high+45,right:spaces.high+65
           }
})