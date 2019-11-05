import React, {Component} from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
} from 'react-native';
export default class Home extends Component{
  
    render(){
      const styles = StyleSheet.create({
         container: {
          justifyContent: 'center',
           flex: 1,
           backgroundColor: '#ffa500'
         },
         
         textBox:{
           flex:1,
  
           flexDirection:'row',
           alignItems:'center',
            justifyContent: 'center',
            backgroundColor: '#191970'
         },
         textStyle: {
          color: 'white',
          fontSize: 30,
          fontWeight: 'bold',
          padding: 10,
        },
         content:{
            flex: 9,
            justifyContent: 'center',
            alignItems: 'center',
  
         },
         button:{
           margin: 10,
           backgroundColor: 'green',
            
         },
         button1:{
          margin: 10,
        }
  
      });
      return(
        <View style={styles.container}>
          <View style={styles.textBox}>
            <Text style={styles.textStyle}>
              Trang Chủ
            </Text>
          </View>
          
          <View style={styles.content}>
            <View style={
              styles.button
            }>
              <Button onPress={() => this.props.navigation.navigate('BackupSMS')} title="Backup SMS">
              </Button>
            </View>
            <View style={
              styles.button1
            }>
              <Button onPress={() => this.props.navigation.navigate('RestoreSMS')} title="Restore SMS">
              </Button>
            </View>
          </View>
        </View>
      );
    }
  }
  
  
  