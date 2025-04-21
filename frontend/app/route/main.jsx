import { Image, Pressable, SafeAreaView, StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps'
import { borderRadius, colors, elevation, spaces } from '../../constands/appConstand'
import leftIcon from "../../assets/icons/left_arrow_short.png"
import MainCard from '../../components/customPageComps/route/MainCard'

const Main = () => {
  return (
     <SafeAreaView style={styles.safeArea}>
          <Pressable style={styles.iconWrapper}>
            <Image source={leftIcon} style={styles.icon} />
          </Pressable>
          <MapView 
            style = {styles.map}
            initialRegion={
                {
                  latitude:39.91987,
                  longitude:32.85427,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }
                          }
          >
          </MapView>
          <View style={styles.cardWrapper}>
              <MainCard />
          </View>
     </SafeAreaView>
  )
}

export default Main

const styles = StyleSheet.create({
    safeArea : {
       flex:1     
    },
    map : {
       flex:1  
    },
    iconWrapper : {
      width:50,height:50,position:"absolute",left:spaces.small,top:spaces.small,backgroundColor:colors.primary,zIndex:2, borderRadius:borderRadius.circleRadius(50),justifyContent:"center",alignItems:"center",elevation:elevation.smallShadow,  opacity:.8
    },
    icon : {
      width:40,height:40
    },
    cardWrapper : {
       position:"absolute",bottom:0,left:0,width:"100%",height:"auto",backgroundColor:"rgba(255,255,255,.6)"
    }
})