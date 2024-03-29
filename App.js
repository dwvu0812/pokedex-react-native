import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import {textColor} from './src/assets/colors';
import HomeScreen2 from './src/screens/HomeScreen2';
import SearchScreen from './src/screens/SearchScreen';
import Animation from './src/screens/Animation';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PokemonDetail from './src/screens/PokemonDetail';
import ImagePicker from './src/screens/ImagePicker';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor={textColor.white} />
      {/* <View style={styles.container}>
        <HomeScreen />
      </View> */}
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {/* <Stack.Screen name="Animation" component={Animation} /> */}
          <Stack.Screen name="Home" component={HomeScreen2} />
          <Stack.Screen name="ImagePicker" component={ImagePicker} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="PokemonDetail" component={PokemonDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
