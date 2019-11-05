import React, {Component} from 'react';
import {View, Text, Button,StyleSheet,FlatList, TextInput} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import Modal from 'react-native-modal';
import RNFetchBlob from 'rn-fetch-blob';
import patchListSms from "./dataPatch";
import SmsAndroid from 'react-native-get-sms-android';
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
export default class RestoreSMS extends Component{
    // constructor (props) {
    //     super(props)
    //     this.state = {
    //       input: ''
    //     }
    //  }
    state = {
        isModalVisible: false,
        isBtnViewVisible: false,
        isSendSmsVisible: false,
        listSMS: [],
        bodySendSms:'',
        recipientsSendSms : '',


      };
     

    async requestExternalStorage(){
        try {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            
            );
            console.log(granted);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the EXTERNAL STORAGE');
            } else {
            console.log('STORAGE permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
    
    async write_sms(){
        SmsAndroid.autoSend(
            recipientsSendSms,
            bodySendSms,
            (fail) => {
              console.log('Failed with this error: ' + fail);
            },
            (success) => {
              console.log('SMS sent successfully');
            },
          );
    }
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
                        this.toggleModal();
                        this.toggleBtnView();
                    })
                    // this.props.navigation.navigate('Home')
                }else{
                    
                }
               
                
            } else {
            console.log('read sms permission denied');
            }
        } catch (err) {
            console.warn(err);
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
    toggleSendSms = () =>{
        this.setState({ isSendSmsVisible : ! this.state.isSendSmsVisible});
    }
    componentDidMount(){
        this.requestExternalStorage();
    }
    render(){

        return(
            <View style={styles.container}>
              <View style={styles.textBox}>
                  <Text style={styles.textStyle}>
                    Restore SMS
                  </Text>
              </View >
              <View style={styles.content}>
                  <View style={styles.boxStyle}>
                    <View>
                      <Button onPress={this.toggleModal} title="Restore SMS"/>
                      {/* <Modal isVisible={this.state.isSendSmsVisible}>
                            
                                <Text>tin nhắn:</Text>
                                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} 
                                numberOfLines={2} 
                                placeholder="lời nhắn!"
                                onChangeText={(text) => this.setState(previousState =>({bodySendSms: text}))}
                                value={value}/>
                            </View>
                            <View>
                                <Text>SDt: </Text>
                                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} 
                                numberOfLines={2} 
                                placeholder="sdt!"
                                onChangeText={(text) => this.setState(previousState =>({bodySendSms: text}))}
                                value={value}/>
                            </View>
                        </Modal> */}

                      <Modal isVisible={this.state.isModalVisible}>
                            <View style={{ flex: 1 , justifyContent: 'center',
                        alignItems: 'center'}}>
                                <View >
                                    <Text style={{color: '#fff'}}>Bạn có muốn restore tất cả tin nhắn không?</Text>
                                </View>
                                <View style={{
                                   
                                    flexDirection: "row",
                                    justifyContent: 'center',
                                    

                                }}>
                                    <View style={{width: 100, height: 50, margin: 10}}>
                                        <Button style title="CÓ" onPress={() => this.requestReadSMS()} />
                                    </View>
                                    <View style={{width: 100, height: 50, margin: 10}}>
                                        <Button title="Không" onPress={() => this.props.navigation.navigate('Home')} />
                                    </View>
                                </View>

                            </View>
                        </Modal>

                        <Modal isVisible={this.state.isBtnViewVisible}>
                          <View style= {{flex:1, margin:20, justifyContent: 'center',}}>

                            <View style= {{alignItems: 'center',}}>
                                <Text style={{color: '#fff', }}>Restore thành công</Text>
                            </View>
                            <View style={{margin: 10}}>
                                <Button  onPress={this.toggleView} title="Xem SMS"/>
                            
                            </View>
                            <View style={{margin: 10}}>
                                <Button  title="Trang chủ" onPress={() => this.props.navigation.navigate('Home')} />
                            
                            </View>
                          </View>
                        
                        
                      </Modal>
                      <Modal isVisible={this.state.isViewVisible}>
                            <View style={{width:'95%', backgroundColor:"#fff", height:'90%'}}>
                                <Button onPress={() => this.props.navigation.navigate('Home')} title="Trang Chủ"/>
                                <FlatList data = {this.state.listSMS} renderItem = {({item,index})=>{
                                    return(
                                        <ViewSMS item={item} index={index}></ViewSMS>
                                    )
                                }}>
                                </FlatList>

                            </View>
                      </Modal>
                    </View>
                    
                  </View>
                  
                  <View style={styles.button}>
                    <Button onPress={() => this.props.navigation.navigate('Home')} title="Back" styles={styles.buttonBack}></Button>
                  </View>
              </View>
              <View>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeText(text)}
                />
              </View>
          </View>
        )
    }
    
}
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