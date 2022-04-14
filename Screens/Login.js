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
import { Form, FormItem, Picker } from 'react-native-form-component';
import App from './CallApp';

const loginUser = (email, password, navigation) => {
  return fetch("http://192.168.1.18:8000/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      console.log(response.status)
      if(response.status == 200)
      {
        return response.json()
      }
      else
      {
        Alert.alert("Wrong Credentials!")
      }
    })
    .then((json) => {
    if (typeof json !== 'undefined'){
        global.auth = json.token
          if (json.usertype == 'user'){
              navigation.navigate('Menu')
          }
          if(json.usertype == 'admin'){
              navigation.navigate('MenuAdmin')
          }
    }
    })
    .catch((error) => {
      console.error(error);
    });
  };

function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  return (
  <SafeAreaView style={styles.container}>
          <View>
              <Form onButtonPress={() => loginUser(email, password, navigation)} buttonText={"Login"}>
                  <FormItem
                   label="Email"
                   labelStyle={{margin:10}}
                   textInputStyle={styles.input}
                   errorBorderColor={'grey'}
                   isRequired
                   value={email}
                   onChangeText={(email) => setEmail(email)}
                   asterik
                  />
                  <FormItem
                    label="Password"
                    labelStyle={{margin:10}}
                    secureTextEntry={true}
                    textInputStyle={styles.input}
                    errorBorderColor={'grey'}
                    isRequired
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    asterik
                  />
              </Form>
              <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.button}>
                <Text style={styles.buttonText}>Register</Text>
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
   },
   buttonText: {
       color: "white",
       textAlign: 'center',
   }
});

export default LoginScreen