import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import BackupSMS from "./screen/backupSMS";
import RestoreSMS from "./screen/restoreSMS";
import Home from "./screen/home";

const AppNavigator = createStackNavigator({ 
    Home: { screen: Home,
      navigationOptions: ({ navigation }) => ({
        header:null
      }),
     },
     BackupSMS: { screen: BackupSMS,
       navigationOptions: ({navigation}) =>({
         header: null
       })
     },
     RestoreSMS: { screen: RestoreSMS,
      navigationOptions: ({navigation}) =>({
        header: null
      })
    },
  });
  export default createAppContainer(AppNavigator);

