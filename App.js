import * as React from 'react';
import { View, Text , Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/Login';
import RegisterScreen from './Screens/Register';
import MenuScreen from './Screens/Menu';
import MenuAdminScreen from './Screens/MenuAdmin';
import ActivechatsScreen from './Screens/Activechats';
import CreateticketScreen from './Screens/Createticket';
import ViewticketsScreen from './Screens/Viewtickets';
import TicketdetailsScreen from './Screens/Ticketdetails';
import CommonproblemsScreen from './Screens/Commonproblems';
import ViewticketsAdminScreen from './Screens/ViewticketsAdmin';
import CallAppScreen from './Screens/CallApp';
import ChatScreen from './Screens/Chat';
import SendMessageScreen from './Screens/sendMessage';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'Menu' }} />
        <Stack.Screen name="MenuAdmin" component={MenuAdminScreen} options={{ title: 'MenuAdmin' }} />
        <Stack.Screen name="Activechats" component={ActivechatsScreen} options={{ title: 'Activechats' }} />
        <Stack.Screen name="Commonproblems" component={CommonproblemsScreen} options={{ title: 'Commonproblems' }} />
        <Stack.Screen name="Createticket" component={CreateticketScreen} options={{ title: 'Createticket' }} />
        <Stack.Screen name="Viewtickets" component={ViewticketsScreen} options={{ title: 'Viewtickets' }} />
        <Stack.Screen name="Ticketdetails" component={TicketdetailsScreen} options={{ title: 'Ticketdetails' }} />
        <Stack.Screen name="ViewticketsAdmin" component={ViewticketsAdminScreen} options={{ title: 'ViewticketsAdmin' }} />
        <Stack.Screen name="CallAppScreen" component={CallAppScreen} options={{ title: 'CallAppScreen' }} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ title: 'ChatScreen' }} />
        <Stack.Screen name="SendMessageScreen" component={SendMessageScreen} options={{ title: 'SendMessageScreen' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;