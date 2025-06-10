import { StyleSheet, Text,FlatList,View, Pressable, Image  } from 'react-native'
import { useUserStore } from '../../../managments'
import { useGetOwnerFavPlace } from '../../../hooks/query/queryHook'
import { ActivityIndicator } from 'react-native'
import { colors,elevation,spaces } from '../../../constands'
import { upArrowIcon ,downArrowIcon, favImg } from '../../../assets'
import { useState } from 'react'
import FavPlaceCard from './FavPlaceCard'

const FavPlace = () => {
  const {id,token} = useUserStore(state => state.user)
  const [activeSort , setActiveSort] = useState(1)
  const {data,isLoading} = useGetOwnerFavPlace(id,token,activeSort)
  const favPlaces = data ? data.ok_data.data : ["null"];

  const handleSortBtn = (mod) => {
      if(mod !== activeSort)
      {
         setActiveSort(mod)
      }
  }

  const SortBtn = ({mod,icon,isDisable=false}) => {
       const isActive = mod === activeSort;
       const borderColor = isActive ? colors.primary : colors.gray
       const iconColor   = isActive ? colors.primary : colors.gray
       const iconElevation   = isActive ? elevation.middleShadow : 0
       return <>
                <Pressable style={[styles.sortBtnWrapper,{borderColor:borderColor,elevation:iconElevation}]} onPress={!isDisable ? () => handleSortBtn(mod) : null}>
                  <Image style={[styles.sortBtnStyl,{tintColor:iconColor}]} source={icon} />
                </Pressable>
              </>
  }
  
  return (
    <>
       <View style={styles.headerWrapper}>
            <View>
                <Text>Places Count : {isLoading ? <ActivityIndicator /> : favPlaces.length}</Text>
             </View>
             <View style={styles.headerBtnsContainer}>
                <SortBtn icon={upArrowIcon}   mod={1}   isDisable={isLoading}   />
                <SortBtn icon={downArrowIcon} mod={2}   isDisable={isLoading}   />
             </View>
      </View>   
      <FlatList 
        data={favPlaces}
        contentContainerStyle={{flexGrow:1}}
        showsVerticalScrollIndicator={false}
        renderItem= {({item,index}) => (
             isLoading ? <View style={{flex:1,justifyContent:"center",alignContent:"center"}}><ActivityIndicator size={"large"} color={colors.primary} /></View> : <FavPlaceCard key={index} placeData={item} />
                                )}                        
        ListEmptyComponent={() => {
              return <>
                        <View style={styles.emptyWrapper}>
                           <Image style={styles.emptyImgWrapper} source={favImg} />
                        </View>
                     </>
        }}                          
     />
    </>
  )
}

export default FavPlace

const styles = StyleSheet.create({

    headerWrapper : {
      flexDirection:"row",alignItems:"center",justifyContent:"space-around",marginBottom:spaces.high,marginTop:spaces.middle
    },
    headerBtnsContainer : {
       flexDirection:"row",columnGap:spaces.high
    },
    sortBtnWrapper : {
        borderWidth:1,borderColor:colors.gray,backgroundColor:colors.background
    },
    sortBtnStyl : {
         width:25,height:25
    },
    emptyWrapper : {
      flex:1,justifyContent:"flex-start",alignItems:"center"
    },
    emptyImgWrapper : {
       width:"100%",height:"500"
    }

})