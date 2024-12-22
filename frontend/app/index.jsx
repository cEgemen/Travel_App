import { StatusBar } from 'expo-status-bar';
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import onBoardImg from "../assets/images/onBoard.png"
import CustomTouchableButton from '../components/customButtons/customTouchableButton';

export default function App() {

  const onPress = () => {
      router.push("/")
  }

  return (
        <SafeAreaView  style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollVw}>
               <View style={styles.container}>
                   <Text style={styles.header}>W&W</Text>
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
    header:     {
       textAlign:"center",
       fontSize:32,
       fontWeight:'800'
                } ,    
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
