import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import onBoardImg from "../assets/images/onBoard.png"
import CustomTouchableButton from '../components/customButtons/customTouchableButton';
import { useContext } from 'react';
import { InitialContext } from '../managments/initialManagment';
import { colors, fonts, spaces } from '../constands/appConstand';
import travelWorld from "../assets/icons/travelWorld.png";
import map from "../assets/icons/map.png";
import lib from "../assets/icons/lib.png";


export default function App() {
   const {isReady,token,isFirst} = useContext(InitialContext) ;

  
  const onPress = () => {
     // router.push("/login")
        router.push("/home")
  }

  return (
        <SafeAreaView  style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollVw}>
               <View style={styles.container}>
                   <Image source={onBoardImg} style={styles.onBoardImg} />
                   <Text style={styles.subTitle}>Find beauty in every journey.</Text>
                   <View style={styles.descWrapper}>
                     <Image style={styles.descIcon} source={lib} />
                     <Text style={styles.desc}> Witness & Wander is a travel guide.</Text>
                   </View>
                   <View style={styles.descWrapper}>
                     <Image style={styles.descIcon} source={map} />
                     <Text style={styles.desc}> Helps you discover the beauty around you.</Text>
                   </View>
                   <View style={styles.descWrapper}>
                     <Image style={styles.descIcon} source={travelWorld} />
                     <Text style={styles.desc}> Find inspiring places and create unforgettable memories.</Text>
                   </View>
                   <CustomTouchableButton text={"Start"} onPress={onPress} buttonStyle={styles.btnWrapperStyle} textStyle={styles.btnTextStyle} />
               </View>  
            </ScrollView>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea :  {
       minHeight:"100%",
                },
    scrollVw :  {
       height : "100%",
       backgroundColor:colors.background  ,
       paddingVertical:spaces.high,
       paddingHorizontal:spaces.middle,
                },            
    container : {
       width:"100%",
       height:"100%",
       alignItems:"center",
                },                
    onBoardImg : {
       width:"100%",
       height:360,
       resizeMode :'cover',
       marginBottom:spaces.middle
                 } ,
    subTitle :   {
          textAlign:"center",
          color:colors.text,
          fontSize:fonts.middleFontSize,
          fontWeight:fonts.middleFontWeight,
          marginBottom:spaces.high, 
                } ,
    descWrapper :{
        width:"100%",
        flexDirection:"row",
        marginBottom:spaces.small,
    },            
    descIcon : {
        tintColor:colors.text,
        width:25,height:25,resizeMode:"cover"
    },
    desc :      {
            color:colors.text,
            fontSize:fonts.smallMidFontSize,
            fontWeight:fonts.smallFontWeight,
                } ,
    btnWrapperStyle : {
         marginVertical:"auto",
         backgroundColor:colors.secondary
    } ,
    btnTextStyle : {
         marginVertical:"auto",
         color:colors.text,
         fontSize:fonts.smallMidFontSize,
         fontWeight:fonts.smallFontWeight
    }                                                             
});
