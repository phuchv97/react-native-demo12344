import React, { Component } from 'react';
import {View, Text, Button, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import RNFetchBlob from 'rn-fetch-blob';
import Modal from 'react-native-modal';
import patchListSms from "./dataPatch";

class ViewSMS extends Component{
  render(){
      return(
          <View style={{flex: 1, backgroundColor: this.props.index % 2 ? '#7fff00': '#7fffd4'}}>
              <Text style = {{color: 'red'}}>{this.props.item.address}</Text>
              <Text style = {{color: 'red'}}>{this.props.item.body}</Text>
          </View>
      )
  }
}

export default class BackupSMS extends Component{
    
  constructor(props){
      super(props);
      this.state = {
        countSMS: 0,
        SMSList: null,
        isBtnViewVisible: false,
        listSMS: [],

      }
    }
    toggleModal = () => {
      this.setState({ isModalVisible : !this.state.isModalVisible });
  }
  toggleBtnView = ()=>{
    this.setState({ isBtnViewVisible : !this.state.isBtnViewVisible });
}
toggleView = () =>{
  this.setState({ isViewVisible : ! this.state.isViewVisible});
}
  
  writeFile = (pathName) =>{

    const dirs = RNFetchBlob.fs.dirs;
          patchListSms.LinkSave = dirs[pathName];
          debugger
            RNFetchBlob.fs.writeFile( patchListSms.LinkSave +'/smsdata.txt', this.state.SMSList, 'utf8')
              .then(()=>{alert('Lưu thành công')});
              this.toggleModal();
              this.toggleBtnView();
              console.log(patchListSms.LinkSave)
              
  }
   
    async requestGetSmsPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      var filter = {
        box: 'inbox',
         // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
        
      };
      
      SmsAndroid.list(
        JSON.stringify(filter),
        (fail) => {
          console.log('Failed with this error: ' + fail);
        },
        (count, smsList) => {
          this.setState(previousState =>{
            return{
              countSMS: count,
              SMSList: smsList,
            };
          });
          console.log('Count: ', count);
          // console.log('List: ', smsList);
          var arr = JSON.parse(smsList);
          debugger;
          // arr.forEach(function(object) {
          //   console.log('Object: ' + object);
          //   console.log('-->' + object.date);
          //   console.log('-->' + object.body);
          // });
        },
        
        );
    } else {
      console.log('READ SMS permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
async requestWriteFilePermission() {
  try {
    
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // this.toggleModal();
    debugger
      
      console.log(this.patchListSms);
      this.toggleModal();

      // RNFetchBlob.fs.writeFile( dirs.DownloadDir +'/smsdata.txt', this.state.SMSList, 'utf8')
      //         .then(()=>{alert('Lưu thành công')});
      
    } else {
      console.log('WriteFile permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
  
};
async requestReadSMS(){
  try {
      const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      
      );
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          if(patchListSms.LinkSave != ''){
              RNFetchBlob.fs.readFile(patchListSms.LinkSave +'/smsdata.txt', 'utf8')
              .then((data) => {
                  this.setState({
                      listSMS : JSON.parse(data)  
                  }, () =>  console.log(this.state.listSMS))
                  
                  console.log(patchListSms.LinkSave);
                  this.toggleView();
                  
              })
              // this.props.navigation.navigate('Home')
          }else{
              alert('không tìm thấy file backup');
              this.props.navigation.navigate('Home');

          }
         
          
      } else {
      console.log('read sms permission denied');
      }
  } catch (err) {
      console.warn(err);
  }
}
// requestReadFilePermission(){
//   const dirs = RNFetchBlob.fs.dirs;
//   RNFetchBlob.fs.readFile(dirs.DownloadDir +'/smsdata.txt', 'utf8')
// .then((data) => {
//   console.log(data);
  
// })
// }
/* List SMS messages matching the filter */


  componentDidMount(){
      this.requestGetSmsPermission();
      RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs)
    // files will an array contains filenames
    .then((files) => {
      
        console.log(files)
        debugger
    })
      
    
  }
  
 render(){
      const styles = StyleSheet.create({
         container: {
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
         boxStyle:{
            flex:9,
            justifyContent: 'center'
         },
         button:{
           flex:1,
           justifyContent:'flex-end',
           alignItems: 'center',
           margin: 20,
           
            
         },
         buttonBack:{
          padding: 20,
        }
  
      });
      return(
          <View style={styles.container}>
              <View style={styles.textBox}>
                  <Text style={styles.textStyle}>
                    Backup SMS
                  </Text>
              </View >
              
              
              
              
              <View style={styles.content}>
                  <View style={styles.boxStyle}>
                    <View>
                      <Text style={styles.textStyle}>Tổng số SMS: {this.state.countSMS}</Text>
                    </View>
                    <View>
                      <Button onPress={() => this.requestWriteFilePermission()} title="BackUP"></Button>
                    </View>
                    
                    <View style={{margin: 10}}>
                      <Button  onPress={()=>this.requestReadSMS()} title="Xem SMS"/>
                  </View>
                  </View>
                  
                  <View style={styles.button}>
                    <Button onPress={() => this.props.navigation.navigate('Home')} title="Back" styles={styles.buttonBack}></Button>
                  </View>
              </View>
              <Modal isVisible = {this.state.isModalVisible}>
                  <View style={{width:'95%', flex: 1, height:'90%'}}>
                    <Text style={{alignItems: 'center' ,color: '#fff', fontSize: 20}}>Mời bạn chọn thư mục lưu</Text>
                    
                    <View style={{marginTop: 3}}>
                        <Button title='DCIMDir' onPress= {() => 
                          this.writeFile('DCIMDir') 
                        }></Button>
                    </View>
                    <View style={{marginTop: 3}}>
                        <Button title='DownloadDir' onPress= {() => 
                          this.writeFile('DownloadDir') 
                        }></Button>
                    </View>
                    
                    <View style={{marginTop: 3}}>
                        <Button title='Back' onPress= {() => 
                          this.toggleModal()
                        }></Button>
                    </View>
                  </View>

              </Modal>
              <Modal isVisible={this.state.isBtnViewVisible}>
                            <View style={{width:'95%', backgroundColor:"#fff", height:'30%'}}>
                                <View style={{margin: 10}}>
                                  <Button  onPress={()=>this.requestReadSMS()} title="Xem SMS"/>
                              </View>
                              <View style={{margin: 10}}>
                                  <Button  onPress={()=>this.toggleBtnView()} title="back"/>
                              </View>

                            </View>
                      </Modal>
              
              <Modal isVisible={this.state.isViewVisible}>
                            <View style={{width:'95%', backgroundColor:"#fff", height:'90%'}}>
                                <Button onPress={() => this.toggleView()} title="Back"/>
                                <FlatList data = {this.state.listSMS} renderItem = {({item,index})=>{
                                    return(
                                        <ViewSMS item={item} index={index}></ViewSMS>
                                    )
                                }}>
                                </FlatList>

                            </View>
                      </Modal>
              
          </View>
          
      )
  }
  
  
 
}
