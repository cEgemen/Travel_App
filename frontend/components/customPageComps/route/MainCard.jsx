import React, { useState } from "react";
import {View,Text,TouchableOpacity,StyleSheet,FlatList,ImageBackground} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Animated, {FadeInRight} from "react-native-reanimated";
import { borderRadius, colors, fonts, spaces } from "../../../constands/appConstand";

export default function MainCard({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const cardWidth = 220 + 20;

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / cardWidth);
    setCurrentIndex(index);
  };

  const cards = [
    { id: 1, title: "Rota 1" },
    { id: 2, title: "Rota 2" },
    { id: 3, title: "Rota 3" },
  ];
  return (

        <View style={styles.container}>
          <FlatList
            data={cards}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardWidth}
            decelerationRate="fast"
            snapToAlignment="center"
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => (
                <Animated.View
                  entering={FadeInRight.delay(400 + index * 200).duration(1000)}
                  style={styles.card}
                >
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <View style={styles.cardFooter}>
                  <Text style={styles.cardText}>
                      Lorem ipsum dolor ssssssssssssssssssssit amet,
                      consectetuer adipiscing elit.
                  </Text>
                  <Icon
                      name="map-marker"
                      size={25}
                      color={
                        index === 0 ? "#ff5c83": index === 1? "#5facdb" : "#bb32fe"
                            }
                  />
                  </View>

                  <TouchableOpacity
                    onPress={() =>{}}
                    style={styles.routeButton}
                  >
                    <Text style={styles.routeButtonText}>Rota Seç</Text>
                  </TouchableOpacity>
                </Animated.View>
            )}
          />
        </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal:spaces.middle,paddingVertical:spaces.high},
  card: {
    backgroundColor: colors.lightGray,
    height: 220,
    width: 220,
    borderRadius: borderRadius.highRadius,
    padding: spaces.middle,
    marginHorizontal: spaces.middle,
    justifyContent: "space-between",
  },

  cardTitle: {
    fontSize: fonts.middleFontSize,
    fontWeight: fonts.middleFontWeight,
    color:colors.backgroundDark,
    textAlign: "center",
    marginBottom:spaces.small,
  },

  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  cardText: { flex: 1, fontSize:fonts.smallFontSize, color: colors.darkGray, marginRight:spaces.middle },

  routeButton: {
    marginTop:spaces.middle,
    backgroundColor:colors.primary,
    borderRadius:borderRadius.highRadius,
    paddingVertical: spaces.middle,
    alignItems: "center",
  },

  routeButtonText: {
    color: colors.background,
    fontSize: fonts.smallFontSize,
    fontWeight: fonts.smallMidFontSize,
  },
});