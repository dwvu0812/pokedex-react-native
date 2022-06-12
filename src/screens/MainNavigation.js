import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen2 from './HomeScreen2';
import PokemonDetail from './PokemonDetail';



export default function MainNavigation() {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer ScreenOptions={{
        headerShown: false,
    }} >
      <Stack.Screen name="Home" component={HomeScreen2} />
      <Stack.Screen name="PokemonDetail" component={PokemonDetail} />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({});