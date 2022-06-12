import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { textColor } from '../assets/colors';

export default function ItemContent({title, content}) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemContent}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red',
        marginVertical: 10
    },
    itemTitle: {
        fontSize: 14,
        width: 120,
        color: textColor.black,
        fontWeight: '500',
    },
    itemContent: {
        fontSize: 14,
        color: textColor.grey,
    }
});
