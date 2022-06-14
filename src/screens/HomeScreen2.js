import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  Image,
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
import {useDispatch, useSelector} from 'react-redux';
import {
  getPokemons,
  getPokemonsSuccess,
  getPokemonsFailure,
} from '../redux/pokemonSlice';
import Modal from 'react-native-modal';
import {Swipeable} from 'react-native-gesture-handler';
import FilterScreen from '../screens/FilterScreen';

let pokemonOrigin = [];
const offset = 20;
let limit = 20;

export default function HomeScreen2({navigation, route}) {
  const source = route.params?.source;

  const pokemons = useSelector(state => state.pokemons.pokemons);
  const filterValue  = useSelector(state => state.filter.filter);
  // console.log(filterValue)

  const [textSearch, setTextSearch] = useState('');
  const [listLocal, setListLocal] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [pokemons, setPokemons] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [sortValue, setSortValue] = useState(1);

  const dispatch = useDispatch();
  let loading = useSelector(state => state.pokemons.loading);

  const loadListLocal = () => {
    AsyncStorage.getItem('pokedex_pokemon')
      .then(value => {
        if (value) {
          // console.log(JSON.parse(value))
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
      const tempList = listLocal.reduce((acc, curr) => {
        if (curr.name.toLowerCase().includes(textSearch.toLowerCase())) {
          acc.push(curr);
        }
        return acc;
      }, []);
      dispatch(getPokemonsSuccess(tempList));
    } else {
      const tempList2 = listLocal.slice(0, limit);

      dispatch(getPokemonsSuccess(tempList2));
      // console.log(3);
    }
  };

  useEffect(() => {
    // setLoading(true);
    dispatch(getPokemons());

    // console.log(loading);

    loadListLocal();

    // setLoading(false);
  }, []);

  const LoadPokemons = async () => {
    if (textSearch == '') {
      let pokeList = await APIService.getPokemons(limit);
      // console.log(pokeList);
      let all = [];
      for (let i = 0; i < pokeList.results.length; i++) {
        let pokeDetail = await APIService.getPokemonDetail(
          pokeList.results[i].name,
        );
        // console.log(i);

        let Obj = {
          name: pokeDetail.name,
          id: pokeDetail.id,
          types: pokeDetail.types,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeDetail.id}.png`,
        };
        all.push(Obj);
        // console.log(all)
      }
      limit += offset;
      SavePokemon(all);
      // console.log(all);
      pokemonOrigin = all;
      dispatch(getPokemonsSuccess(all));
      // console.log('exit');
    }
  };

  //   console.log(pokemons);
  // useEffect(() => {
  //   dispatch(getPokemons());
  //   if (textSearch) {
  //     const list = pokemonOrigin.filter(p =>
  //       p.name.toLowerCase().includes(textSearch.toLowerCase()),
  //     );
  //     dispatch(getPokemonsSuccess(list));
  //   } else {
  //     dispatch(getPokemonsSuccess(pokemonOrigin));
  //   }
  // }, [textSearch]);

  useEffect(() => {
    dispatch(getPokemons());
    if (sortValue == '3') {
      let list = pokemonOrigin
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name));
      dispatch(getPokemonsSuccess(list));
    } else if (sortValue == '4') {
      let list = pokemonOrigin
        .slice()
        .sort((a, b) => b.name.localeCompare(a.name));
      dispatch(getPokemonsSuccess(list));
    } else if (sortValue == '1') {
      let list = pokemonOrigin.slice().sort((a, b) => a.id - b.id);
      dispatch(getPokemonsSuccess(list));
    } else if (sortValue == '2') {
      let list = pokemonOrigin.slice().sort((a, b) => b.id - a.id);
      dispatch(getPokemonsSuccess(list));
    } else {
      dispatch(getPokemonsSuccess(pokemonOrigin));
    }
  }, [sortValue]);

  useEffect(() => {
    dispatch(getPokemons());
    filterPokemons(filterValue);
  }, [filterValue]);

  const filterPokemons = filterValue => {
    if (filterValue == 'all') {
      dispatch(getPokemonsSuccess(pokemonOrigin));
    } else {
      let list = pokemonOrigin
        .slice()
        .filter(p => p.types[0].type.name == filterValue);
      dispatch(getPokemonsSuccess(list));
    }
  };

  // console.log(filterValue)

  return (
    <>
      <ImageBackground
        resizeMode="contain"
        style={{width: '100%', height: height / 4}}
        source={Pokeball_header}>
        <View style={commonStyles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ImagePicker')}>
              {source == undefined ? (
                <Image
                  style={{width: 25, height: 25, borderRadius: 25}}
                  source={require('../assets/Images/types/flying.png')}
                />
              ) : (
                <Image
                  style={{width: 25, height: 25, borderRadius: 25}}
                  source={source}
                />
              )}
            </TouchableOpacity>
            <View
              style={{
                ...commonStyles.row,
                justifyContent: 'flex-end',
                // marginVertical: 20,
              }}>
              <TouchableOpacity
                onPress={() => setModalVisible(!isModalVisible)}>
                <Sort color={textColor.black} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginLeft: 10}}
                onPress={() => setModalVisible2(!isModalVisible2)}>
                <Generation color={textColor.black} />
              </TouchableOpacity>
              <Icon>
                <Filter color={textColor.black} />
              </Icon>

              <Modal isVisible={isModalVisible}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    padding: 30,
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{color: '#000', fontSize: 20, fontWeight: '700'}}>
                    Sort
                  </Text>
                  <Text
                    style={{
                      color: '#999',
                      fontSize: 14,
                      fontWeight: '500',
                      marginVertical: 10,
                    }}>
                    Sort Pokémons alphabetically or by National Pokédex number!
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setSortValue(1);
                      setModalVisible(!isModalVisible);
                    }}
                    style={styles.sortItem}>
                    <Text style={{color: '#000'}}>Smallest number first</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSortValue(2);
                      setModalVisible(!isModalVisible);
                    }}
                    style={styles.sortItem}>
                    <Text style={{color: '#000'}}>Highest number first</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSortValue(3);
                      setModalVisible(!isModalVisible);
                    }}
                    style={styles.sortItem}>
                    <Text style={{color: '#000'}}>A-Z</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSortValue(4);
                      setModalVisible(!isModalVisible);
                    }}
                    style={styles.sortItem}>
                    <Text style={{color: '#000'}}>Z-A</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(!isModalVisible)}
                    style={{alignItems: 'center'}}>
                    <Text style={styles.textCloseModal}>Close</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
              <Modal isVisible={isModalVisible2}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    padding: 30,
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{color: '#000', fontSize: 20, fontWeight: '700'}}>
                    Filter
                  </Text>
                  <Text
                    style={{
                      color: '#999',
                      fontSize: 14,
                      fontWeight: '500',
                      marginVertical: 10,
                    }}>
                    Use advanced search to explore Pokémon by type!
                  </Text>
                
                    {/* <Text style={{color: '#000'}}>Smallest number first</Text> */}
                    <FilterScreen />

                  <TouchableOpacity
                    onPress={() => setModalVisible2(!isModalVisible2)}
                    style={{alignItems: 'center'}}>
                    <Text style={styles.textCloseModal}>Close</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
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
              onFocus={() => navigation.navigate('SearchScreen')}
            />
          </View>
          {/* <View style={{width: '100%', marginBottom: 50}}>
            <Counter />
          </View> */}
        </View>
      </ImageBackground>
      <View
        style={{
          ...commonStyles.container,
          flex: 1,
          paddingTop: 0,
          // marginTop: 100,
        }}>
        <FlatList
          refreshing={loading}
          onRefresh={() => {
            loadListLocal();
            LoadPokemons();
          }}
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
  textCloseModal: {
    padding: 5,
    backgroundColor: '#58ABF6',
    borderRadius: 5,
    width: 50,
    color: '#fff',
    textAlign: 'center',
  },
  sortItem: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    marginBottom: 10,
  },
});
