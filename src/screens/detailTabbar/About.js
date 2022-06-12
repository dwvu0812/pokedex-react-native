import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  textColor
} from '../../assets/colors';
import ItemContent from '../../components/ItemContent';


export default function About({aboutDetail}) {
  // fetch('https://pokeapi.co/api/v2/evolution-chain/1/')
  // .then(res => res.json())
  // .then(data => console.log(data))
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.aboutHeader}>{aboutDetail.flavor_text_sword}</Text>

      <View>
        <Text style={styles.textHeader}>Pokedex Data</Text>
        <ItemContent title="Species" content={aboutDetail.species} />
        <ItemContent title="Height" content={aboutDetail.height / 10 + 'm'} />
        <ItemContent title="Weight" content={aboutDetail.weight / 10 + 'kg'} />
        <ItemContent title="Abilities" content={aboutDetail.abilities} />
        <ItemContent title="Weaknesses" content={aboutDetail.weaknesses} />
        
      </View>
      <View>
        <Text style={styles.textHeader}>Training</Text>
        <ItemContent title="Capture rate" content={aboutDetail.capture_rate} />
        <ItemContent title="Base experience" content={aboutDetail.base_experience} />
        <ItemContent title="Growth rate" content={aboutDetail.growth_rate} />
      </View>
      <View>
        <Text style={styles.textHeader}>Bredding</Text>
        <ItemContent title="Egg groups" content={aboutDetail.egg_groups} />
        <ItemContent title="Egg cycle" content={aboutDetail.egg_cycle} />
        <ItemContent title="Gender rate" content={aboutDetail.gender_rate} />
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
    width: 150,
    color: textColor.black,
    fontWeight: '500',
  },
  itemContent: {
    flexDirection: 'row',
  },
});
