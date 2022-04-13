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
} from 'react-native';

function MenuScreen({ navigation }) {
    return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>Welcome to our App</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Createticket')} style={styles.button}>
                <Text style={styles.buttonText}>Create ticket</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Viewtickets')} style={styles.button}>
                <Text style={styles.buttonText}>View tickets</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Activechats')} style={styles.button}>
                <Text style={styles.buttonText}>Active chats screen</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Commonproblems')} style={styles.button}>
                <Text style={styles.buttonText}>View common problems</Text>
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