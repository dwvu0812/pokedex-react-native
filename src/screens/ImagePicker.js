import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function ImagePicker({navigation}) {
  const [imageUri, setImageUri] = React.useState('');
  //   const [imageUri2, setImageUri2] = React.useState('');
  const openCamera = () => {
    let options = {
      savePhotos: true,
      mediaType: 'photo',
      includeBase64: true,
      includeExtra: true,
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // console.log('ImagePicker Response: ', response);
        console.log(response.assets[0].uri);
        // const source = {uri: 'data:image/jpeg;base64,' + response.data};
        const source = {uri: response.assets[0].uri};
        // console.log(source);
        setImageUri(source);
      }
    });
  };
  const openGallery = () => {
    let options = {
      savePhotos: true,
      mediaType: 'photo',
      includeBase64: true,
      includeExtra: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // console.log('ImagePicker Response: ', response);
        console.log(response.assets[0].uri);
        // const source = {uri: 'data:image/jpeg;base64,' + response.data};
        const source = {uri: response.assets[0].uri};
        // console.log(source);
        setImageUri(source);
      }
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TouchableOpacity
        style={{marginLeft: 20, marginTop: 20}}
        onPress={() => navigation.goBack()}>
        <Text>Back</Text>
        {/* <Text>Back</Text> */}
      </TouchableOpacity>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{marginBottom: 20, color: '#000', fontSize: 20}}>
          Choose an image
        </Text>
        <Button
          title="Onpen Camera"
          onPress={() => {
            openCamera();
            // navigation.navigate('Home', {source: imageUri});
          }}
        />
        {/* <Image
          source={imageUri}
          style={{
            width: 200,
            height: 200,
            marginVertical: 10,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: '#000',
          }}
        /> */}
        <View style={{marginVertical: 10}}></View>
        <Button
          title="Onpen Gallery"
          onPress={() => {
            openGallery();
            // navigation.navigate('Home', {source: imageUri});
          }}
        />
        <Image
          source={imageUri}
          style={{
            width: 200,
            height: 200,
            marginVertical: 10,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: '#000',
          }}
        />
        <Button
          title="Save"
          onPress={() => {
            navigation.navigate('Home', {source: imageUri});
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
