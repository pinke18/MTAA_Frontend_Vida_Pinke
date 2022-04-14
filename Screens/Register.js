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

const addUser = (email, password, repassword, navigation) => {
    if(repassword == password){
        fetch("http://192.168.1.18:8000/register", {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            })
            .then(response => {
                console.log("Zaciatok")
                const statusCode = response.status;
                return Promise.all([statusCode]);
              })
              .then((res) => {
                console.log(res)
                if(res=='200'){
                    navigation.navigate('Login')
                    Alert.alert("Account Created!")
                }
                else{
                  Alert.alert('Email arleady in use')
                }
              })
              .catch(error => {
                console.error(error);
                return { name: "network error", description: "" };
              });
    }
    else {
        console.error("Passwords do no match!" + password + repassword);
    }
};

function RegisterScreen({ navigation }) {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [repassword, setRepassword] = React.useState(null);

  return (
  <SafeAreaView style={styles.container}>
        <View>
          <Form onButtonPress={() => addUser(email, password, repassword, navigation)} buttonText={"Create account"}>
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
              <FormItem
               label="Re-enter password"
               labelStyle={{margin:10}}
               secureTextEntry={true}
               textInputStyle={styles.input}
               errorBorderColor={'grey'}
               isRequired
               value={repassword}
               onChangeText={(repassword) => setRepassword(repassword)}
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

export default RegisterScreen