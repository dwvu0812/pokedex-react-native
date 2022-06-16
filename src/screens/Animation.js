import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';

export default function Animation() {
  const position = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const rotateText = useRef(new Animated.Value(0)).current;
  const [isLeft, setIsLeft] = useState(true);

  const runAnim = () => {
    const toValue = isLeft ? {x: 150, y: 500} : {x: 0, y: 0};
    const toValueRotate = isLeft ? rotateZ : rotateZZ;
    const toValueOpacity = isLeft ? 0.3 : 1;
    Animated.sequence([
      Animated.timing(position, {
        toValue,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: toValueOpacity,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.timing(rotateText, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      })
    ]).start(() => {
      setIsLeft(!isLeft);
    });
  };

  const runAniText = () => {
    Animated.timing(rotateText, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }

  const rotateZ = rotateText.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });
  const rotateZZ = rotateText.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '00deg'],
  });

  return (
    <View>
      <Button title="Click" onPress={runAnim} />
      <Animated.View
        style={{
          backgroundColor: position.x.interpolate({
            inputRange: [0, 100],
            outputRange: ['#ff0000', '#00ff00'],
          }),
          height: 100,
          width: 200,
          marginLeft: position.x,
          marginTop: position.y,
          opacity: opacity,
          transform: [{rotateZ}],
        }}
      />
      {/* <Animated.View style={{marginTop: 100, transform: [{rotateZ}]}}>
        <Text style={{fontSize: 20}}>Hello world</Text>
      </Animated.View> */}
        
    </View>
  );
}

const styles = StyleSheet.create({});
