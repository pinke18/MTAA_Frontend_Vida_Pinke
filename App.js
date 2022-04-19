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
import CommondetailsScreen from './Screens/Commondetails';
import CommonproblemsScreen from './Screens/Commonproblems';
import ViewticketsAdminScreen from './Screens/ViewticketsAdmin';
import CallAppScreen from './Screens/CallApp';
import ChatScreen from './Screens/Chat';
import SendMessageScreen from './Screens/sendMessage';
import UpdateTicketScreen from './Screens/UpdateTicket';
import DetailsAdminScreen from './Screens/DetailsAdmin';
import UploadImageScreen from './Screens/UploadImage';


const Stack = createNativeStackNavigator();
global.serverIP = "192.168.0.227"

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'Menu' }} />
        <Stack.Screen name="MenuAdmin" component={MenuAdminScreen} options={{ title: 'Menu' }} />
        <Stack.Screen name="Activechats" component={ActivechatsScreen} options={{ title: 'My chats' }} />
        <Stack.Screen name="Commonproblems" component={CommonproblemsScreen} options={{ title: 'Common problems' }} />
        <Stack.Screen name="Createticket" component={CreateticketScreen} options={{ title: 'Create a ticket' }} />
        <Stack.Screen name="Viewtickets" component={ViewticketsScreen} options={{ title: 'View my tickets' }} />
        <Stack.Screen name="Ticketdetails" component={TicketdetailsScreen} options={{ title: 'Ticket details' }} />
        <Stack.Screen name="Commondetails" component={CommondetailsScreen} options={{ title: 'Ticket details' }} />
        <Stack.Screen name="ViewticketsAdmin" component={ViewticketsAdminScreen} options={{ title: 'View available tickets' }} />
        <Stack.Screen name="CallAppScreen" component={CallAppScreen} options={{ title: 'Video room' }} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ title: 'Chat' }} />
        <Stack.Screen name="SendMessageScreen" component={SendMessageScreen} options={{ title: 'Send a message' }} />
        <Stack.Screen name="UpdateTicketScreen" component={UpdateTicketScreen} options={{ title: 'Update a ticket' }} />
        <Stack.Screen name="DetailsAdminScreen" component={DetailsAdminScreen} options={{ title: 'Ticket Details' }} />
        <Stack.Screen name="UploadImageScreen" component={UploadImageScreen} options={{ title: 'Upload an Image' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;