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

export default function HomeScreen({navigation}) {
  const [textSearch, setTextSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(false);

  const loadPokemons = async (offset=0) => {
    try {
      setLoading(true);
      const res = await APIService.getPokemons(offset);
      setPokemons(res.results);
      setLoading(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    // fetchPokemons();
    loadPokemons();
  }, []);


  // useEffect(() => {
  //   const newPokemon = [...pokemons];
  //   if (textSearch) {
  //     setPokemons(
  //       pokemons.reduce((acc, curr) => {
  //         console.log(curr);
  //         if (curr.name.toLowerCase().includes(textSearch.toLowerCase())) {
  //           acc.push(curr);
  //         }
  //         return acc;
  //       }, []),
  //     );
  //   } else {
  //     setPokemons(newPokemon);
  //   }
  // }, [textSearch]);

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
        </View>
      </ImageBackground>
      <View style={{...commonStyles.container, flex: 1, paddingTop: 0}}>
        <FlatList
          refreshing={loading}
          onRefresh={loadPokemons}
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
          // onEndReached={loadPokemons}
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
