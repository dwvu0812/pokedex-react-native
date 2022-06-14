import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {backgroundColors} from '../assets/colors';
import {useSelector, useDispatch} from 'react-redux';
import {getFilterValue} from '../redux/filterSlice';

const types = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
];
export default function FilterScreen() {
  const dispatch = useDispatch();
//   const filter = useSelector(state => state.filter.filter);
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={4}
        horizontal={false}
        data={types}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => dispatch(getFilterValue(item))}
              style={[
                styles.textContainer,
                {backgroundColor: backgroundColors[item]},
              ]}>
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    // backgroundColor: 'red',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    padding: 10,
    borderRadius: 10,
    // width: 50,
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
});
