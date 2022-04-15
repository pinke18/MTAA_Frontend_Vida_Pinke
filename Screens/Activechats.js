import * as React from 'react';
import { View, Text , Button, FlatList, TouchableOpacity, StyleSheet, Alert} from 'react-native';

const onClickChat = (navigation, chatID, createdBy, assignedTo) => {
  return fetch("http://192.168.1.18:8000/getmessages?ticketid=" + chatID, {
    method: "get",
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${global.auth}`, 
  },
  })
  .then((res) => {
    console.log(chatID)
    //console.log(assignedTo)
    return res.json()
  })
  .then((json) => {
    //console.log(json)
    //console.log(json[0].createdBy_id[0].id)
    //console.log(json[0].createdBy_id[0].email)
    navigation.navigate('ChatScreen' , {chats: json, creator: createdBy, worker: assignedTo, ticketID: chatID });
  })
  .catch((err) => {
    Alert.alert("Error retrieving chat")
    console.log(err);
  });
  };

function ActivechatsScreen({ route, navigation }) {
    const ticketList = route.params;
    //const ticketAdmin = ticketList.
    //const ticketUser = ticketList.
    //console.log(ticketList.ticketList);
    return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>ActivechatsScreen</Text>
        <FlatList
                  data={ticketList.ticketList}
                  renderItem={({ item }) => <TouchableOpacity onPress={() => onClickChat(navigation, item.id.toString(), item.createdBy_id[0].id, item.assignedTo_id[0].id) } style={styles.button}>
                  <Text style={styles.buttonText}>{item.name}</Text>
                </TouchableOpacity>}
              />
          <Button
              title="Logout"
              onPress={() => navigation.navigate('Login')}
          />
      </View>
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
  export default ActivechatsScreen