import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  textColor,
  customColor,
  backgroundColors,
  colors,
} from '../assets/colors';
import commonStyles from '../styles/commonStyles';
import Tag from '../components/Tag';
import Pokeball_card from '../assets/Images/Pokeball_card.png';
import About from './detailTabbar/About';
import Evolution from './detailTabbar/Evolution';
import Stats from './detailTabbar/Stats';
import axios from 'axios';
import APIService from '../services/API';

const DetermineGenderRate = (gender) => {
  switch (gender) {
    case -1:
      return "N/A";
    case 0:
      return "0%\u2640 100%\u2642";
    default:
      const female = Math.round(gender * 1250) / 100;
      // console.log(typeof gender)
      const male = 100 - female;
      return `${female}%\u2640 ${male}%\u2642`;
  }
 
}

const getEvolutionChain = (data) => {
  const baseForm = {
    name: data.species.name,
    id: data.species.url.split('/').slice(-2, -1)[0]
  }

  const firstEvolution = {
    name: data.evolves_to[0].species.name,
    id: data.evolves_to[0].species.url.split('/').slice(-2, -1)[0],
    min_level: data.evolves_to[0].evolution_details[0].min_level,
  }
  let secondEvolution = {};
  if (data.evolves_to[0].evolves_to.length > 0) {
    secondEvolution = {
      name: data.evolves_to[0].evolves_to[0].species.name,
      id: data.evolves_to[0].evolves_to[0].species.url.split('/').slice(-2, -1)[0],
      min_level: data.evolves_to[0].evolves_to[0].evolution_details[0].min_level,
  }}

  return  [baseForm, firstEvolution, secondEvolution]

}

export default function PokemonDetail({navigation, route}) {
  const {item} = route?.params;
  const imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`;

  const [selection, setSelection] = useState(1);
  //   const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    loadPokemon(item.name);
    // load(item.name);
  }, []);

  // const load = async (name) => {
  //   console.log(11)
  //   const poke = await APIService.getPokemonDetail(name);
  //   console.log(poke)
  // }

  const loadPokemon = async name => {
    const poke = await APIService.getPokemonDetail(name);
    await loadSpecies(poke);
  };

  const loadSpecies = async poke => {
    try {
      const pokeSpecies = await APIService.getPokemonSpecies(poke.name);
      const pokeEvolution = await axios.get(pokeSpecies.evolution_chain.url);
      const pokeType = await axios.get(poke.types[0].type.url);

      const pokeEvolutionChain = getEvolutionChain(pokeEvolution.data.chain);
      // console.log(pokeEvolutionChain)

      let flavor_text_sword = '';
      let flavor_text_shield = '';
      let flavor_text_default = '';
      pokeSpecies.flavor_text_entries.map(item => {
        if (item.language.name != 'en') return false;
        if (item.version.name == 'sword') {
          flavor_text_sword = item.flavor_text;
        } else if (item.version.name == 'shield') {
          flavor_text_shield = item.flavor_text;
        }
        flavor_text_default = item.flavor_text;
      });

      let abilities = '';
      poke.abilities.map((item, index) => {
        abilities += `${item.ability.name}${
          poke.abilities.length == index + 1 ? '' : ', '
        }`;
      });
      let egg_groups = '';
      pokeSpecies.egg_groups.map((item, index) => {
        egg_groups += `${item.name}${
          pokeSpecies.egg_groups.length == index + 1 ? '' : ', '
        }`;
      });

      let species = '';
      pokeSpecies.genera.map((item, index) => {
        if (item.language.name == 'en') {
          species = item.genus;
        }
      });

      const weakness = pokeType.data.damage_relations.double_damage_from;
      const weaknesses = weakness.map(item => item.name).join(', ');
      //   console.log(species);

      const gender_rate = DetermineGenderRate(pokeSpecies.gender_rate)
      // console.log(gender_rate);

      // Type effect
      const strength = pokeType.data.damage_relations.half_damage_from;
      const typeEffective = [];
      if (weakness.length !== 0) {
        weakness.forEach(item => {
          typeEffective.push({
            multi: '0.5x',
            type: item.name,
          })
        })
      }
      if (strength.length !== 0) {
        strength.forEach(item => {
          typeEffective.push({
            multi: '2x',
            type: item.name,
          })
        })
      }

      // console.log(typeEffective)

      let pokeDetail = {
        id: poke.id,
        name: poke.name,
        flavor_text_default,
        flavor_text_sword,
        flavor_text_shield,
        abilities,
        height: poke.height,
        weight: poke.weight,
        gender_rate: pokeSpecies.gender_rate,
        capture_rate: pokeSpecies.capture_rate,
        habitat: pokeSpecies.habitat?.name,
        stats: poke.stats,
        evolution: pokeEvolution.chain,
        species,
        weaknesses: weaknesses,
        gender_rate: gender_rate,
        capture_rate: pokeSpecies.capture_rate,
        base_experience: poke.base_experience,
        growth_rate: pokeSpecies.growth_rate.name,
        egg_groups,
        egg_cycle: pokeSpecies.hatch_counter,
        types: poke.types,
        typeEffective,
        pokeEvolutionChain
      };

      setDetail(pokeDetail);

    } catch (error) {
      console.log(error);
    }
  };

  //   useEffect(() => {
  //     loadPokemon(item.name);
  //     console.log(item.name)
  //   }, []);

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          backgroundColor: backgroundColors[item.types[0].type.name],
        }}>
        {/* <ImageBackground resizeMode="contain" source={Pokeball_card}> */}
          <Text
            style={styles.textBack}
            onPress={() => navigation.navigate('Home')}>
            Back
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image source={{uri: imageSource}} style={styles.image} />
            <View>
              <Text style={commonStyles.number}>
                {'#' + `000${item.id}`.slice(-4)}
              </Text>
              <Text style={commonStyles.title}>
                {item.name[0].toUpperCase() + item.name.slice(1)}
              </Text>
              <View style={[commonStyles.row, {marginTop: 5}]}>
                <Tag type={item.types[0]?.type.name} />
                {item.types[1]?.type.name && (
                  <Tag type={item.types[1].type.name} />
                )}
              </View>
            </View>
          </View>
          <View
            style={[
              commonStyles.row,
              {justifyContent: 'space-around', marginTop: 10},
            ]}>
            <Text
              onPress={() => {
                setSelection(1);
              }}
              style={[
                styles.textHeading,
                {color: selection == 1 ? textColor.white : '#ccc'},
              ]}>
              About
            </Text>
            <Text
              onPress={() => {
                setSelection(2);
              }}
              style={[
                styles.textHeading,
                {color: selection == 2 ? textColor.white : '#ccc'},
              ]}>
              Stats
            </Text>
            <Text
              onPress={() => {
                setSelection(3);
              }}
              style={[
                styles.textHeading,
                {color: selection == 3 ? textColor.white : '#ccc'},
              ]}>
              Evolution
            </Text>
          </View>
          <View style={styles.content}>
            <ScrollView>
              {selection == 1 ? (
                <About aboutDetail={detail} />
              ) : selection == 2 ? (
                <Stats statsDetail={detail} />
              ) : selection == 3 ? (
                <Evolution evolutionDetail={detail} />
              ) : null}
            </ScrollView>
          </View>
        {/* </ImageBackground> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    // position: 'relative',
  },
  textBack: {
    color: textColor.white,
    fontSize: 14,
    marginVertical: 20,
    marginLeft: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 20,
  },
  textHeading: {
    color: textColor.white,
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    width: '100%',
    height: '100%',
    flexGrow: 1,
    padding: 30,
    marginTop: 20,
  },
});
