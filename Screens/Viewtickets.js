import * as React from 'react';
import { View, Text , Button, FlatList, TouchableOpacity, StyleSheet, Alert} from 'react-native';

const ticketInfo = (navigation, id) => {
  return fetch("http://" + global.serverIP + ":8000/getticketuser?ticketid=" + id, {
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
    navigation.navigate('Ticketdetails', {item: json});
  })
  .catch((err) => {
    console.log(err);
  });
 };


function ViewticketsScreen({ route, navigation }) {
  let open = [];
  let closed = [];

  for (const element of route.params.ticketList){
      console.log(element.assignedTo_id)
      if(element.complete){
        closed.push(element)
      } else {
        open.push(element)
      }
    }

  //const ticketAdmin = ticketList.
  //const ticketUser = ticketList.
  //console.log(ticketList.ticketList);
  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Open tickets</Text>
      <FlatList
                data={open}
                renderItem={({ item }) => <TouchableOpacity onPress={() => ticketInfo(navigation, item.id)} style={styles.button}>
                <Text style={styles.buttonText}>{item.name}</Text>
              </TouchableOpacity>}
            />
      <Text>Closed tickets</Text>
      <FlatList
              data={closed}
              renderItem={({ item }) => <TouchableOpacity onPress={() => ticketInfo(navigation, item.id)} style={styles.button}>
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
  export default ViewticketsScreen