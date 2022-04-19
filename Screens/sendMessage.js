import React from 'react';
import type {Node} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Form, FormItem, Picker } from 'react-native-form-component';


const sendMessage = (to, from, message, ticketid, navigation) => {
    fetch("http://" + global.serverIP + ":8000/sendmessage", {
            method: "post",
            headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${global.auth}`, 
            },
            body: JSON.stringify({ to, from, message, ticketid }),
        })
        .then(response => {
            const statusCode = response.status;
            return Promise.all([statusCode]);
            })
            .then((res) => {
            console.log(res)
            if(res=='200'){
                viewChats(navigation)
                Alert.alert("Message sent!")
            }
            else{
                Alert.alert('Message failed to send')
            }
            })
            .catch(error => {
            console.error(error);
            return { name: "network error", description: "" };
            });
};

const viewChats = (navigation) => {
    return fetch("http://" + global.serverIP + ":8000/gettickets", {
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

function SendMessageScreen({ route, navigation }) {
  const [message, setMessage] = React.useState(null);
  const toFrom = route.params;
  const to = toFrom.to;
  const from = toFrom.from;
  const ticketID = toFrom.ticketID;
  console.log(ticketID)

  return (
  <SafeAreaView style={styles.container}>
        <View>
          <Form onButtonPress={() => sendMessage(to, from, message, ticketID, navigation)} buttonText={"Send Message"}>
              <FormItem
               label="Message"
               labelStyle={{margin:10}}
               textInputStyle={styles.input}
               errorBorderColor={'grey'}
               isRequired
               value={message}
               onChangeText={(message) => setMessage(message)}
               asterik
              />
          </Form>
          </View>
    </SafeAreaView>
  );
};


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
  buttonContainer: {
      justifyContent: 'center',
      height: 40,
      margin: 12,
      padding: 10,
      backgroundColor: 'blue',
    },
});

export default SendMessageScreen