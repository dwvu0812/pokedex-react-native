import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import React from 'react';
import Pokeball from '../../assets/Images/Pokeball_header.png';

const Pokemon = ({data}) => {
  const source = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;

  return (
    <View style={styles.itemContainer}>
      <ImageBackground
        source={Pokeball}
        resizeMode="cover"
        style={{width: 100, height: 100}}>
        <Image source={{uri: source}} style={{width: 100, height: 100}} />
      </ImageBackground>
      <Text style={{color: '#000', fontSize: 14, fontWeight: '500'}}>
        {'#' + `000${data.id}`.slice(-4)}
      </Text>
      <Text style={{color: '#000', fontSize: 14, fontWeight: '500'}}>
        {data.name[0].toUpperCase() + data.name.slice(1)}
      </Text>
    </View>
  );
};

export default function Evolution({evolutionDetail}) {
  // console.log(evolutionDetail.pokeEvolutionChain[0])
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Evolution Chain</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <Pokemon data={evolutionDetail.pokeEvolutionChain[0]} />
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/Images/arrow.png')}
            style={{height: 30, width: 30}}
          />
          <Text style={{color: '#000', fontSize: 14, fontWeight: '500', marginTop: 10}}>
            {'Level ' + evolutionDetail.pokeEvolutionChain[1].min_level}
          </Text>
        </View>
        <Pokemon data={evolutionDetail.pokeEvolutionChain[1]} />
      </View>
      {Object.keys(evolutionDetail.pokeEvolutionChain[2]) !== 0 && 
        <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <Pokemon data={evolutionDetail.pokeEvolutionChain[1]} />
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/Images/arrow.png')}
            style={{height: 30, width: 30}}
          />
          <Text style={{color: '#000', fontSize: 14, fontWeight: '500', marginTop: 10}}>
            {'Level ' + evolutionDetail.pokeEvolutionChain[2].min_level}
          </Text>
        </View>
        <Pokemon data={evolutionDetail.pokeEvolutionChain[2]} />
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  textHeader: {
    fontSize: 16,
    color: '#62B957',
    fontWeight: '700',
    marginVertical: 10,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
