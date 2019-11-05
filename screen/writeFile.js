import React, { Component } from 'react';
import {View, Text, Button, StyleSheet, ActivityIndicator} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

class writeFile extends Component{

async requestWriteFilePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the WriteFile');
    } else {
      console.log('WriteFile permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
  
}
componentDidCatch(){
  this.requestWriteFilePermission() ;
}
render(){
  return(
    <View>
        <Text></Text>
      <ActivityIndicator size="large" color="#0000ff"/>
    </View>
  )
}
}