import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {useRouteStore} from '../../../managments';
import { router } from 'expo-router';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { borderRadius, colors, elevation, fonts, spaces } from '../../../constands';
import CircleTouchableIcon from '../../customButtons/CircleTouchableIcon';
import notesIcon from "../../../assets/icons/notes.png"
import RouteDetailSubCard from './RouteDetailSubCard';

export default ({routesData=[],currentIndex = 0,onChangeIndex = (index) => {}}) => {
  
  const cardWidth = 220 + 20;

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (cardWidth - 20));
    if(currentIndex !== index)
    {
      onChangeIndex(index);
    }
  };
  
  return (

        <View style={styles.container}>
          <FlatList
            data={routesData}
            keyExtractor={(item,index) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardWidth}
            decelerationRate="fast"
            snapToAlignment="center"
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => (
                   <RouteDetailSubCard route={item} index={index} key={item.id} />
            )}
          />
        </View>
  );
}

const styles = StyleSheet.create({
 
  container: { paddingHorizontal:spaces.middle,paddingVertical:spaces.high},
 
});