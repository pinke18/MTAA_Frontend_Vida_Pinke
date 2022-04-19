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
  FlatList,
} from 'react-native';
import { Form, FormItem, Picker } from 'react-native-form-component';
import Tags from "react-native-tags";
import ModalDropdown from "react-native-modal-dropdown";


const updateTicket = (navigation, ticketid, stage, complete, solutiontext, solutionimage) => {
  console.log(stage)
  fetch("http://" + global.serverIP + ":8000/updateticket", {
              method: "put",
              headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${global.auth}`,
              },
              body: JSON.stringify({ ticketid, stage, complete, solutiontext , solutionimage}),
          })
          .then(response => {
              const statusCode = response.status;
              return Promise.all([statusCode]);
              })
              .then((res) => {
              console.log(res)
              if(res=='204'){
                  Alert.alert("Ticket updated successfully")
                  viewTickets(navigation)
              }
              else{
                  Alert.alert('Ticket was not updated, please try again')
              }
              })
              .catch(error => {
              console.error(error);
              return { name: "network error", description: "" };
              });
  }

  const viewTickets = async (navigation) => {
    try {
    let [allTickets, assignedTickets] = await Promise.all([
      fetch("http://" + global.serverIP + ":8000/gettickets", {
        method: "get",
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${global.auth}`, 
      },
      }),
      fetch("http://" + global.serverIP + ":8000/getticketsbyID?userid=" + global.userid, {
        method: "get",
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${global.auth}`, 
      },
      }),
    ]);
    const allTicketsJson = await allTickets.json();
    const assignedTicketsJson = await assignedTickets.json();
    navigation.navigate('ViewticketsAdmin', {all: allTicketsJson, mine: assignedTicketsJson});
    }
   catch(err) {
    Alert.alert("An error occured, try again!")
    console.log(err);
    };
   };

function UpdateTicketScreen({ route, navigation }) {
  const [solution, setSolution] = React.useState(null);
  const [stage, setStage] = React.useState(null);
  const [complete, setComplete] = React.useState(null);
  const [imageID, setImageID] = React.useState(null);
  const stages = ["1","2","3"];
  const completeChoice = ["true","false"];
  const ticket = route.params;
  console.log(ticket.ticketID);


    return (
    <SafeAreaView style={styles.container}>
              <View>
                  <Form onButtonPress={() => updateTicket(navigation, ticket.ticketID, stage, complete, solution, imageID)} buttonText={"Update ticket"}>
                      <FormItem
                       label="Solution text"
                       labelStyle={{margin:10}}
                       textInputStyle={styles.input}
                       errorBorderColor={'grey'}
                       value={solution}
                       onChangeText={(solution) => setSolution(solution)}
                       />
                    <ModalDropdown
                    options={stages}
                    style = {styles.dropdown}
                    defaultValue = "Advance to stage"
                    onSelect={(stage) => setStage(stage)}
                    showsVerticalScrollIndicator={true}
                    textStyle = {{fontSize:16}}
                    />
                      <FormItem
                       label="Is the ticket complete ?"
                       labelStyle={{margin:10}}
                       textInputStyle={styles.input}
                       errorBorderColor={'grey'}
                       value={complete}
                       onChangeText={(complete) => setComplete(complete)}
                       />
                                         <FormItem
                       label="Provide an image id to assign"
                       labelStyle={{margin:10}}
                       textInputStyle={styles.input}
                       errorBorderColor={'grey'}
                       value={imageID}
                       onChangeText={(imageID) => setImageID(imageID)}
                       />
                  </Form>
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
     },
     buttonText: {
         color: "black",
         textAlign: 'center',
     },
     dropdown: {
        height: 40,
        margin: 12,
     }
  });

  export default UpdateTicketScreen