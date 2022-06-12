import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import {textColor, colors, backgroundColors} from '../../assets/colors';

export default function Stats({statsDetail}) {
  function ItemContent({title, content, value, color}) {
    return (
      <View style={styles.item}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemContent}>{content}</Text>
        <Progress.Bar progress={value} width={210} height={5} color={color} />
      </View>
    );
  }

  const effectiveItem = () => {
    if (statsDetail.effective) {
      return <ItemContent />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Base Stats</Text>
      <ItemContent
        title="HP"
        content={statsDetail.stats[0].base_stat}
        value={statsDetail.stats[0].base_stat / 100}
        color={colors[statsDetail.types[0].type.name]}
      />
      <ItemContent
        title="Attack"
        content={statsDetail.stats[1].base_stat}
        value={statsDetail.stats[1].base_stat / 100}
        color={colors[statsDetail.types[0].type.name]}
      />
      <ItemContent
        title="Defense"
        content={statsDetail.stats[2].base_stat}
        value={statsDetail.stats[2].base_stat / 100}
        color={colors[statsDetail.types[0].type.name]}
      />
      <ItemContent
        title="Sp Attack"
        content={statsDetail.stats[3].base_stat}
        value={statsDetail.stats[3].base_stat / 100}
        color={colors[statsDetail.types[0].type.name]}
      />
      <ItemContent
        title="Sp Defense"
        content={statsDetail.stats[4].base_stat}
        value={statsDetail.stats[4].base_stat / 100}
        color={colors[statsDetail.types[0].type.name]}
      />
      <ItemContent
        title="Speed"
        content={statsDetail.stats[5].base_stat}
        value={statsDetail.stats[5].base_stat / 100}
        color={colors[statsDetail.types[0].type.name]}
      />
      <View>
        <Text style={styles.textHeader}>Type Defense</Text>
        <Text>The effectiveness of each type on {statsDetail.name}.</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
          {statsDetail.typeEffective.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: backgroundColors[item.type],
                  borderRadius: 5,
                  padding: 4,
                  marginRight: 5,
                  marginTop: 10
                }}>
                <Text>
                  {item.type} {item.multi}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    // flexDirection:'row'
  },
  aboutHeader: {
    fontSize: 16,
    color: textColor.grey,
    // textAlign: 'center',
  },
  textHeader: {
    fontSize: 16,
    color: '#62B957',
    fontWeight: '700',
    marginVertical: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    marginVertical: 10,
  },
  itemTitle: {
    fontSize: 14,
    width: 80,
    color: textColor.black,
    fontWeight: '500',
  },
  itemContent: {
    flexDirection: 'row',
    marginRight: 20,
  },
});
