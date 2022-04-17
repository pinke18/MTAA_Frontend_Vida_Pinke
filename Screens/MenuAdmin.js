import React from 'react';
import type {Node} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Await,
} from 'react-native';
import App from './CallApp';

const viewChats = (navigation) => {
  return fetch("http://192.168.1.18:8000/getticketsbyID?userid=" + global.userid, {
    method: "get",
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${global.auth}`, 
  },
  })
  .then((res) => {
    return res.json()
  })
  .then((json) => {
    //console.log(json)
   // console.log(json[0].createdBy_id[0].id)
    //console.log(json[0].createdBy_id[0].email)
    navigation.navigate('Activechats', {ticketList: json});
  })
  .catch((err) => {
    console.log(err);
  });
  };

const viewTickets = async (navigation) => {
  try {
  let [allTickets, assignedTickets] = await Promise.all([
    fetch("http://192.168.1.18:8000/gettickets", {
      method: "get",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${global.auth}`, 
    },
    }),
    fetch("http://192.168.1.18:8000/getticketsbyID?userid=" + global.userid, {
      method: "get",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${global.auth}`, 
    },
    }),
  ]);
  const allTicketsJson = await allTickets.json();
  const assignedTicketsJson = await assignedTickets.json();
  console.log(allTicketsJson);
  console.log(assignedTicketsJson);
  navigation.navigate('ViewticketsAdmin', {all: allTicketsJson, mine: assignedTicketsJson});
  }
 catch(err) {
  Alert.alert("An error occured, try again!")
  console.log(err);
  };
 };
  



function MenuScreen({ navigation }) {
    return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>Welcome to our App</Text>
              <TouchableOpacity onPress={() => viewTickets(navigation)} style={styles.button}>
                <Text style={styles.buttonText}>View tickets</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('CallAppScreen')} style={styles.button}>
                <Text style={styles.buttonText}>Create a call</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => viewChats(navigation)} style={styles.button}>
                <Text style={styles.buttonText}>Active chats screen</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('UploadImageScreen')} style={styles.button}>
                <Text style={styles.buttonText}>Upload Image</Text>
              </TouchableOpacity>
               <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
      </View>
    </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 16,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
     button: {
         backgroundColor: "red",
         padding: 15,
         borderRadius: 10,
         marginVertical: 16,
         marginHorizontal: 16,
     },
     buttonText: {
         color: "white",
         textAlign: 'center',
     },
     text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
     }
  });

  export default MenuScreen