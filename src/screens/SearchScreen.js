import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Search from '../assets/Icons/search.svg';
import commonStyles from '../styles/commonStyles';
import {textColor, backgroundColors} from '../assets/colors';
import Input from '../components/Input';
import APIService from '../services/API';
import SearchItem from '../components/SearchItem';
import {clearWarnings} from 'react-native/Libraries/LogBox/Data/LogBoxData';

export default function SearchScreen({navigation}) {
  const [data, setData] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const refInput = useRef();
  let listOrigin = [];
  useEffect(() => {
    refInput.current.focus();
  }, []);

  const fetchData = async () => {
    try {
      if (textSearch == '') {
        const res = await APIService.getAllPokemons();
        setData(res.results);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  listOrigin = [...data];
  //   console.log(listOrigin);

  useEffect(() => {
    if (textSearch) {
      const list = listOrigin.filter(item => {
        return item.name.toLowerCase().includes(textSearch.toLowerCase()) || item.url.includes(textSearch.toLowerCase());
      });
      setData(list);
    } else {
      setData(listOrigin);
    }
  }, [textSearch]);
  // console.log(data);
  const renderItem = (i) => {
    //   console.log(i)
    const id = i.url.split('/')[6];
    // const detail = await APIService.getPokemonDetail(i.name);
    const ite = {
      name: i.name,
      id,
    //   types: detail.types,
    };
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('PokemonDetail', {item: ite})}>
        <SearchItem item={ite} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search color={textColor.grey} />
        <TextInput
          style={{marginLeft: 10}}
          placeholderTextColor={textColor.grey}
          placeholder="What Pokémon are you looking for?"
          ref={refInput}
          value={textSearch}
          onChangeText={setTextSearch}
        />
      </View>

      <FlatList
        // style={{flex: 1}}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => renderItem(item)}
        refreshing={loading}
        onRefresh={fetchData}
      />
    </View>
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
  container: {
    ...commonStyles.container,
  },
});
