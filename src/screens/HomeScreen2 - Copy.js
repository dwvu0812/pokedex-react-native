import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Pokeball_header from '../assets/Images/Pokeball_header.png';
import {height} from '../assets/constants';
import commonStyles from '../styles/commonStyles';
import Generation from '../assets/Icons/generation.svg';
import Sort from '../assets/Icons/sort.svg';
import Filter from '../assets/Icons/filter.svg';
import Search from '../assets/Icons/search.svg';
import Icon from '../components/Icon';
import {textColor, customColor} from '../assets/colors';
import Input from '../components/Input';
import Card from '../components/Card';
import APIService from '../services/API';
import {SavePokemon, VerifyPokemon} from '../functions/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Counter from '../redux/Counter';

let pokemonOrigin = [];
const offset = 20;
let limit = 20;
// let max = 0;

export default function HomeScreen2({navigation}) {
  const [textSearch, setTextSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);

  const [listLocal, setListLocal] = useState([]);

  //   const handleResult = (maximum, p) => {
  //     max = maximum;
  //     setPokemons(p);
  //   };

  useEffect(() => {
    setLoading(true);

    AsyncStorage.getItem('pokedex_pokemon')
      .then(value => {
        if (value) {
          setListLocal(JSON.parse(value));
        }
      })
      .catch(err => {
        console.log(err);
      });
    if (listLocal.length == 0) {
      LoadPokemons();
    }
    pokemonOrigin = listLocal;

    if (textSearch !== '') {
      setPokemons(
        listLocal.reduce((acc, curr) => {
          if (curr.name.toLowerCase().includes(textSearch.toLowerCase())) {
            acc.push(curr);
          }
          return acc;
        }, []),
      );
    } else {
      setPokemons(listLocal.slice(0, limit));
    }

    setLoading(false);
  }, []);

  const LoadPokemons = async () => {
    if (textSearch == '') {
      limit += offset;
      let pokeList = await APIService.getPokemons(limit);
      let all = [];
      for (let i = 0; i < pokeList.results.length; i++) {
        let pokeDetail = await APIService.getPokemonDetail(
          pokeList.results[i].name,
        );
        let Obj = {
          name: pokeDetail.name,
          id: pokeDetail.id,
          types: pokeDetail.types,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeDetail.id}.png`,
        };
        all.push(Obj);
      }
      SavePokemon(all);
      pokemonOrigin = all;
      setPokemons(all);
    }
  };

  //   console.log(pokemons);
  useEffect(() => {
    setLoading(true);
    if (textSearch) {
      const list = pokemonOrigin.filter(p =>
        p.name.toLowerCase().includes(textSearch.toLowerCase()),
      );
      setPokemons(list);
    } else {
      setPokemons(pokemonOrigin);
    }
    setLoading(false);
  }, [textSearch]);

  return (
    <>
      <ImageBackground
        resizeMode="contain"
        style={{width: '100%', height: height / 4}}
        source={Pokeball_header}>
        <View style={commonStyles.container}>
          <View
            style={{
              ...commonStyles.row,
              justifyContent: 'flex-end',
              // marginVertical: 20,
            }}>
            <Icon>
              <Generation color={textColor.black} />
            </Icon>
            <Icon>
              <Sort color={textColor.black} />
            </Icon>
            <Icon>
              <Filter color={textColor.black} />
            </Icon>
          </View>
          <Text style={commonStyles.heading}>Pokedex</Text>
          <Text style={commonStyles.subHeading}>
            Search for Pokémon by name or using the National Pokédex number.
          </Text>

          <View style={styles.searchContainer}>
            <Icon>
              <Search color={textColor.grey} />
            </Icon>
            <Input
              placeholderTextColor={textColor.grey}
              placeholder="What Pokémon are you looking for?"
              value={textSearch}
              onChangeText={setTextSearch}
            />
          </View>
          {/* <View style={{width: '100%', marginBottom: 50}}>
            <Counter />
          </View> */}
        </View>
      </ImageBackground>
      <View style={{...commonStyles.container, flex: 1, paddingTop: 0, marginTop: 100}}>
        <FlatList
          refreshing={loading}
          onRefresh={LoadPokemons}
          data={pokemons}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PokemonDetail', {item: item})
              }>
              <Card item={item} />
            </TouchableOpacity>
          )}
          onEndReached={LoadPokemons}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    ...commonStyles.row,
    marginVertical: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    // flex: 1,
  },
});
