import * as React from 'react';
import { View, Text , Button, FlatList, TouchableOpacity, StyleSheet, Alert} from 'react-native';

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
                renderItem={({ item }) => <TouchableOpacity onPress={() => onClickChat(navigation, item.id.toString(), item.createdBy_id[0].id, item.assignedTo_id[0].id) } style={styles.button}>
                <Text style={styles.buttonText}>{item.name}</Text>
              </TouchableOpacity>}
            />
      <Text>All available tickets</Text>
      <FlatList
                data={ticketList.all}
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
  export default ViewticketsAdminScreen