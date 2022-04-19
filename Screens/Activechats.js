import * as React from 'react';
import { View, Text , Button, FlatList, TouchableOpacity, StyleSheet, Alert} from 'react-native';

const onClickChat = (navigation, chatID, createdBy, assignedTo) => {
  return fetch("http://" + global.serverIP + ":8000/getmessages?ticketid=" + chatID, {
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

    let ticketsWithChats = [];

    for (const element of route.params.ticketList){
        try {
            if (element.assignedTo_id[0].id){
                ticketsWithChats.push(element)
            }
        } catch {
            console.log("Error")
        }

      }

    return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Choose an ticket to open the chat</Text>
        <FlatList
                  data={ticketsWithChats}
                  renderItem={({ item }) => <TouchableOpacity onPress={() => onClickChat(navigation, item.id.toString(), item.createdBy_id[0].id, item.assignedTo_id[0].id) } style={styles.button}>
                  <Text style={styles.buttonText}>{item.name}</Text>
                </TouchableOpacity>}
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