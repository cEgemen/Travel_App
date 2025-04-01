
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState,useRef } from 'react'
import { ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native';
import leftArrowIcon from "../assets/icons/left_arrow.png"
import sendIcon from "../assets/icons/send.png"
import mapIcon from "../assets/icons/map.png"
import warningIcon from "../assets/icons/warning.png"
import { borderRadius, colors, elevation, fonts, spaces } from '../constands/appConstand';
import CustomModal from '../components/customModals/CustomModal';
import { router } from 'expo-router';
import { chatResult } from '../confs/groqChatConf';
import chatRobotIcon from "../assets/icons/chatRobot.png"
import userIcon from "../assets/icons/user.png"

const Chat = () => {
    const infoData = [
      {title:"** Personalized Travel Recommendations",desc:"Suggests the best routes based on your interests and budget."},
      {title:"** Daily Travel Itinerary Planning",desc:"Creates a customized tour with a step-by-step schedule."},
      {title:"** Food, Dining & Accommodation Suggestions",desc:"Recommends top restaurants, cafés, and suitable hotel options."},
      {title:"** Transportation & Practical Information",desc:"Provides details on public transport, weather forecasts, and currency exchange rates."}               
                     ]               

    const [isVisible,setIsVisible] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [messages,setMessages] = useState([{role:"assistant",content:"How can I help you ?",isErrorMessage:false,id:Date.now()}]) 
    const [input,setInput] = useState("")
    const scrolRef = useRef(null)

    const goBack = () => {router.back()}
    
    const setModal = (mod) => {
        mod === 1 ? setIsVisible(true) : setIsVisible(false)
    }

    const sendQuestion = async () => {
         const history = messages.map(value => ({role:value.role,content:value.content})) 
         setIsLoading(true)
         setInput("")
         setMessages(oldState => ([...oldState,{role:"user",content:input,isErrorMessage:false,id:Date.now()}]))
         chatResult(history,input)
         .then(result => {
            const {data,isSuccess} = result;
            setMessages(oldState => ([...oldState,{role:"assistant",content:data,isErrorMessage:!isSuccess,id:Date.now()}]))
         })
         .catch(err => {
            console.log("err : ",err)
         })
         .finally(() => {
               setIsLoading(false)
         })
         
    }

    const CenterContent = () => <>
                      {infoData.map((value,index) => {
                           return <View key={index}>
                                    <Text style={styles.centerContentTitle}>{value.title}</Text>
                                    <Text style={styles.centerContentDesc}>{value.desc}</Text>
                                  </View>
                      })}  
                 </>


    return (
        <SafeAreaView style={styles.container}>
          <CustomModal title='Asistan Information' isVisible={isVisible} closeVisible={() => setModal(2)} CenterContent={CenterContent} />
          <View style={styles.headerWrapper}>
            <TouchableOpacity
              onPress={goBack}
            >
              <Image style={styles.normalIconStyle} source={leftArrowIcon} />
            </TouchableOpacity>
            
            <Text style={styles.headerTitle}>Asistan</Text>

            <TouchableOpacity  onPress={() => setModal(1)}>
              <Image style={styles.normalIconStyle} source={warningIcon} />
            </TouchableOpacity>

          </View>
    
          <ScrollView
            style={styles.chatContainer}
            contentContainerStyle={styles.chatContent}
            showsVerticalScrollIndicator={false}
            ref={scrolRef}
            onContentSizeChange={() => scrolRef.current?.scrollToEnd({ animated: true })}
          >
            {messages.map((message) => (
               <View style={{}}>
                <View
                key={message.id.toString()}
                style={[
                  styles.messageBubble,
                  message.role === "user" ? {...styles.userBubble,...{marginRight:spaces.high} }: {...styles.botBubble,...{marginLeft:spaces.high}},
                ]}
                >
                {message.isErrorMessage ? <Text style={styles.errorText} >{message.content}</Text> : <Text style={message.role === "user" ? styles.userText : styles.botText}>
                   {message.content}
                </Text>}
                </View>
                <View style={{...styles.messageIconWrapper,...{alignSelf:message.role === "user" ? "flex-end" :  "flex-start" }}}>
                   {message.isErrorMessage ? <Image style={styles.messageIcon} source={warningIcon} /> : <Image style={styles.messageIcon} source={message.role === "user" ? userIcon : chatRobotIcon} />}
                </View>
               </View>
            ))}
            {isLoading && (
              <View style={[styles.messageBubble, styles.botBubble]}>
                <ActivityIndicator size="small" color="#7D0A0A" />
              </View>
            )}
          </ScrollView>
    
          <View style={styles.inputWrapper}>
           
             <TouchableOpacity style={{flexShrink:1,...styles.sendButton}} onPress={() => {}} disabled={false}>
                <Image style={{...styles.normalIconStyle,tintColor:colors.primary}} source={mapIcon} />
              </TouchableOpacity>

              <TextInput style={styles.input} value={input} numberOfLines={1} onChangeText={(text) => setInput(text)} placeholder='Ask An Question?' placeholderTextColor={colors.gray} />
             
              <TouchableOpacity style={{flexShrink:1,...styles.sendButton}} onPress={sendQuestion} disabled={false}>
                <Image style={{...styles.normalIconStyle,tintColor:colors.primary}} source={sendIcon} />
              </TouchableOpacity>

          </View>
        </SafeAreaView>
      );
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
      },
      headerWrapper: {
        height:80,
        paddingHorizontal:spaces.small,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        backgroundColor: colors.primary,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
        borderBottomLeftRadius: borderRadius.highx2Radius,
        borderBottomRightRadius: borderRadius.highx2Radius,
      },
      headerTitle: {
        color: colors.background,
        fontSize: fonts.highFontSize,fontWeight:fonts.highFontWeight
      },
      normalIconStyle : {
          width:30,height:30,justifyContent:"center",tintColor:colors.background
      },
      locationButton: {
        backgroundColor: "#A5B68D",
        paddingVertical: 12,
        paddingHorizontal: 14,
        position: "absolute",
        right: 21, 
      },
      buttonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
      },
      chatContainer: {
        flex: 1,
      },
      chatContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
      },
      messageBubble: {
        maxWidth: "85%",
        borderRadius: 20,
        padding: 14,
        marginVertical: 6,
      },
      userBubble: {
        backgroundColor: colors.primary,
        alignSelf: "flex-end",
        borderBottomRightRadius: 4,
      },
      botBubble: {
        backgroundColor: "#fff",
        alignSelf: "flex-start",
        borderBottomLeftRadius: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      userText: {
        color: colors.background,
        fontSize: 16,
        lineHeight: 22,
      },
      botText: {
        color: colors.primary,
        fontSize: 16,
        lineHeight: 22,
      },
      errorText:{
         color: "rgb(194, 56, 56)",
        fontSize: 16,
        lineHeight: 22,
      },
      messageIconWrapper:{
           width:30,height:30,borderRadius:borderRadius.circleRadius(30),
           borderColor:colors.primary,borderWidth:1,justifyContent:"center",
           alignItems:"center",elevation:elevation.smallShadow,backgroundColor:colors.background 
                        },
      messageIcon:{
           width:25,height:25,tintColor:colors.primary
      },
      inputWrapper: {
        backgroundColor: colors.primary,
        borderTopWidth: 1,
        borderTopColor: colors.lightGray,
        height:80,
        paddingHorizontal:spaces.small,
        gap:spaces.middle,
        flexDirection:"row",
        justifyContent:"center",alignItems:"center",
        borderTopLeftRadius: borderRadius.highx2Radius, 
        borderTopRightRadius: borderRadius.highx2Radius, 
      },
      input: {
        flex: 1,
        backgroundColor: colors.background,
        borderRadius: borderRadius.highRadius,
        color: "#1f2937",
        textAlignVertical: "top",
      },
      sendButton: {
        backgroundColor: colors.background,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
      },
      sendButtonText: {
        color: "white",
        fontSize: 18,
        marginLeft: 2,
      },
      centerContentTitle : {
          fontSize:fonts.smallFontSize*1.1,fontWeight:fonts.middleFontWeight
      },
      centerContentDesc : {
          paddingHorizontal:spaces.middle,color:colors.darkGray
      }
})