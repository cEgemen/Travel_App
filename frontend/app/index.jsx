import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, SplashScreen } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import onBoardImg from "../assets/images/onBoard.png"
import appIcon from "../assets/images/appIcon.png"
import CustomTouchableButton from '../components/customButtons/customTouchableButton';
import { initialState } from '../managments/initialManagment';

export default function App() {
  const {isReady,token,isFirst} = initialState;

  
  const onPress = () => {
      router.push("/login")
  }

  return (
        <SafeAreaView  style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollVw}>
               <View style={styles.container}>
                 <View style={styles.headerWrapper}>
                    <Image source={appIcon} style={styles.headerIcon} />
                    <Text style={styles.header}>W&W</Text>
                 </View>
                   <Image source={onBoardImg} style={styles.onBoardImg} />
                   <Text style={styles.subTitle}>Find beauty in every journey with W&W.</Text>
                   <Text style={styles.desc}>Witness & Wander is a travel guide that helps you discover the beauty around you, find inspiring places and create unforgettable memories.</Text>
                   <CustomTouchableButton text={"Start"} onPress={onPress} buttonStyle={{marginVertical:"auto"}} />
               </View>  
            </ScrollView>
       
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea :  {
       minHeight:"100%",
       backgroundColor:"gray"
                },
    scrollVw :  {
       height : "100%",
       backgroundColor:"pink"  
                },            
    container : {
       width:"100%",
       height:"100%",
       alignItems:"center",
       paddingHorizontal:10,
       paddingTop:20,
                },
    headerWrapper : {
         flexDirection:"row",
         alignItems:"center"
    },            
    header:     {
       textAlign:"center",
       fontSize:32,
       fontWeight:'800',
       alignItems:"center"
                } ,    
    headerIcon : {
            resizeMode:"cover",
            width:60,
            height:60,
    }  ,         
    onBoardImg : {
       width:"100%",
       height:"360",
       resizeMode :'cover',
       marginVertical:10
                 } ,
    subTitle :   {
          textAlign:"center",
          fontSize:27,
          paddingHorizontal:10,
          marginVertical:10, 
          fontWeight:"600"
                } ,
    desc :      {
            textAlign:"center",
            fontSize:20,
            fontWeight:"400",
            paddingHorizontal:10,   
            marginVertical:10,
                }                                               
});
