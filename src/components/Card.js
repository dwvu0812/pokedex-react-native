import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {backgroundColors} from '../assets/colors';
import {width} from '../assets/constants';
import Dots_card from '../assets/Images/Dots_card.png';
import Pokeball_card from '../assets/Images/Pokeball_card.png';
import commonStyles from '../styles/commonStyles';
import Tag from './Tag';
import APIService from '../services/API';
// import Pokedex from 'pokedex-promise-v2';


// const P = new Pokedex();

const windowWidth = Dimensions.get('window').width;

export default function Card({item}) {

  return (
    <>
      <View
        style={{...styles.card, backgroundColor: backgroundColors[item.types[0].type.name]}}>
        <View style={{padding: 15, paddingRight: 0, width: width / 1.8}}>
          <View style={{position: 'absolute', right: 0, top: 5}}>
            <Image source={Dots_card} style={{width: 100, height: 40}} />
          </View>
          <Text style={commonStyles.number}>{'#' + `000${item.id}`.slice(-4)}</Text>
          <Text style={commonStyles.title}>
            {item.name[0].toUpperCase() + item.name.slice(1)}
          </Text>
          <View style={commonStyles.row}>
            <Tag type={item.types[0]?.type.name} />
            {item.types[1]?.type.name && <Tag type={item.types[1].type.name} />} 
          </View>
        </View>

        <ImageBackground
          resizeMode="contain"
          source={Pokeball_card}
          style={styles.imageBackground}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: item.image,
              }}
            />
          </View>
        </ImageBackground>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth - 40,
    // overflow: 'hidden',
  },
  imageContainer: {
    marginTop: -10,
    marginLeft: -10,
  },
  imageBackground: {
    width: 100,
    height: 100,
    paddingRight: 10,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
});
