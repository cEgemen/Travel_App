
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Platform } from 'react-native';
import leftArrowIcon from "../assets/icons/left_arrow.png"
import sendIcon from "../assets/icons/send.png"
import mapIcon from "../assets/icons/map.png"
import warningIcon from "../assets/icons/warning.png"
import { borderRadius, colors, fonts, spaces } from '../constands/appConstand';
import SearchInput from '../components/forms/SearchInput';
import CustomModal from '../components/customModals/CustomModal';
import { router } from 'expo-router';

const Chat = () => {
    const infoData = [
      {title:"** Personalized Travel Recommendations",desc:"Suggests the best routes based on your interests and budget."},
      {title:"** Daily Travel Itinerary Planning",desc:"Creates a customized tour with a step-by-step schedule."},
      {title:"** Food, Dining & Accommodation Suggestions",desc:"Recommends top restaurants, cafés, and suitable hotel options."},
      {title:"** Transportation & Practical Information",desc:"Provides details on public transport, weather forecasts, and currency exchange rates."}               
                     ]               

    const [isVisible,setIsVisible] = useState(false)

    const goBack = () => {router.back()}
    
    const setModal = (mod) => {
        mod === 1 ? setIsVisible(true) : setIsVisible(false)
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
            
          >
            {[].map((message) => (
              <View
                key={message.id.toString()}
                style={[
                  styles.messageBubble,
                  message.isUser ? styles.userBubble : styles.botBubble,
                ]}
              >
                <Text style={message.isUser ? styles.userText : styles.botText}>
                  {message.text}
                </Text>
              </View>
            ))}
            {true && (
              <View style={[styles.messageBubble, styles.botBubble]}>
                <ActivityIndicator size="small" color="#7D0A0A" />
              </View>
            )}
          </ScrollView>
    
          <View style={styles.inputWrapper}>
           
             <TouchableOpacity style={{flexShrink:1,...styles.sendButton}} onPress={() => {}} disabled={false}>
                <Image style={{...styles.normalIconStyle,tintColor:colors.primary}} source={mapIcon} />
              </TouchableOpacity>

              <SearchInput inputStyle={{flex:1}} isVisibleClickableIcon={false} />
             
              <TouchableOpacity style={{flexShrink:1,...styles.sendButton}} onPress={() => {}} disabled={false}>
                <Image style={{...styles.normalIconStyle,tintColor:colors.primary}} source={sendIcon} />
              </TouchableOpacity>

          </View>
    
          {false && <Text style={styles.errorText}>{"error"}</Text>}
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
        borderBottomLeftRadius: borderRadius.highx2Radius, // Sol alt köşe radius
        borderBottomRightRadius: borderRadius.highx2Radius, // Sağ alt köşe radius
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
        right: 21, // Sola sabitle
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
        backgroundColor: "#6A9C89",
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
        color: "white",
        fontSize: 16,
        lineHeight: 22,
      },
      botText: {
        color: "#3D8D7A",
        fontSize: 16,
        lineHeight: 22,
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
        borderTopLeftRadius: borderRadius.highx2Radius, // Sol alt köşe radius
        borderTopRightRadius: borderRadius.highx2Radius, // Sağ alt köşe radius
      },
      input: {
        flex: 1,
        backgroundColor: "#f3f4f6",
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === "android" ? 8 : 10,
        paddingBottom: Platform.OS === "android" ? 8 : 10,
        marginRight: 48,
    
        fontSize: 14,
        color: "#1f2937",
        textAlignVertical: "top",
        maxHeight: 100,
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
      errorText: {
        color: "#ef4444",
        textAlign: "center",
        padding: 8,
        fontSize: 14,
        backgroundColor: "#fff",
      },
      centerContentTitle : {
          fontSize:fonts.smallFontSize*1.1,fontWeight:fonts.middleFontWeight
      },
      centerContentDesc : {
          paddingHorizontal:spaces.middle,color:colors.darkGray
      }
})