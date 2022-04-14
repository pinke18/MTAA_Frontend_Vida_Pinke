import * as React from 'react';
import { View, Text , Button, FlatList, TouchableOpacity, StyleSheet, Alert} from 'react-native';

function ActivechatsScreen({ route, navigation }) {
    const ticketList = route.params;
    console.log(ticketList.ticketList);
    return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>ActivechatsScreen</Text>
        <FlatList
                  data={ticketList.ticketList}
                  renderItem={({ item }) => <TouchableOpacity onPress={() => Alert.alert("Moje id je " + item.id.toString() + " využi ma pri fetchi do databázi !")} style={styles.button}>
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