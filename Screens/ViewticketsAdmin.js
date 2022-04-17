import * as React from 'react';
import { View, Text , Button, FlatList, TouchableOpacity, StyleSheet, Alert} from 'react-native';

const ticketInfo = (navigation, id) => {
  return fetch("http://192.168.1.18:8000/getticketadmin?ticketid=" + id, {
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
    navigation.navigate('DetailsAdminScreen', {item: json, ticketID: id});
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


 const assignTicket = (navigation, assignedTo, ticketid) => {
  fetch("http://192.168.1.18:8000/updateticket", {
              method: "put",
              headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${global.auth}`,
              },
              body: JSON.stringify({ assignedTo, ticketid }),
          })
          .then(response => {
              const statusCode = response.status;
              return Promise.all([statusCode]);
              })
              .then((res) => {
              console.log(res)
              if(res=='204'){
                  Alert.alert("Ticket assigned successfully")
                  viewTickets(navigation)
              }
              else{
                  Alert.alert('Ticket was not assigned, please try again')
              }
              })
              .catch(error => {
              console.error(error);
              return { name: "network error", description: "" };
              });
  }


function ViewticketsAdminScreen({ route, navigation }) {
  const ticketList = route.params;
  //const ticketAdmin = ticketList.
  //const ticketUser = ticketList.
  //console.log(ticketList.ticketList);
  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tickets assigned to me</Text>
      <FlatList
                data={ticketList.mine}
                renderItem={({ item }) => <TouchableOpacity onPress={() => ticketInfo(navigation, item.id) } style={styles.button}>
                <Text style={styles.buttonText}>{item.name}</Text>
              </TouchableOpacity> }
              
            />
      <Text>All available tickets for assignement</Text>
      <FlatList
                data={ticketList.all}
                renderItem={({ item }) => <TouchableOpacity onPress={() => assignTicket(navigation, global.userid, item.id) } style={styles.button}>
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
  export default ViewticketsAdminScreen