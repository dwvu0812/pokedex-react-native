import AsyncStorage from '@react-native-async-storage/async-storage';

//Add
// export function SavePokemons(list) {
//   localStorage.setItem('pokedex_pokemons', JSON.stringify(list));
// }
export const SavePokemon = async (pokemon) => {
  try {
    await AsyncStorage.setItem('pokedex_pokemon', JSON.stringify(pokemon));
  } catch (error) {
    console.log(error);
  }
};

//----------------------------------------------

// Verify
// export function VerifyPokemons() {
//   var pokemons = localStorage.getItem('pokedex_pokemons');
//   return JSON.parse(pokemons);
// }

export const VerifyPokemon = async () => {
    try {
        const pokemon = await AsyncStorage.getItem('pokedex_pokemon')
        return JSON.parse(pokemon);
    } catch (error) {
        console.log(error);
    }
}

