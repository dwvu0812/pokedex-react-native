import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { backgroundColors } from '../assets/colors';

export default function SearchItem({item}) {
 
  return (
    <View style={styles.searchItem}>
      <Text style={styles.searchItemid}>{'#' + `000${item.id}`.slice(-4)}</Text>
      <Text style={styles.searchItemName}>{item.name[0].toUpperCase() + item.name.slice(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  searchItem: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    backgroundColor: backgroundColors.normal,
    marginBottom: 10
  },
  searchItemid: {
    fontSize: 16,
    fontWeight: '700',
    color: '#17171B',
  },
  searchItemName: {
    fontSize: 30,
    fontWeight: '700',
    color: '#fff',
  },
});
