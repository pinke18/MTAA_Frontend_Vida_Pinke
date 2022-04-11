/*import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import { Form, FormItem, Picker } from 'react-native-form-component';*/

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Form, FormItem, Picker } from 'react-native-form-component';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const addUser = (email, password, navigation) => {
     fetch("http://192.168.0.80:8000/register", {
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
        if(res=='[200]'){
            navigation.navigate('Login')
        }
        navigation.navigate('Login')
      })
      .catch(error => {
        console.error(error);
        return { name: "network error", description: "" };
      });
};

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};


function RegisterScreen({ navigation }) {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  return (
    <SafeAreaView>
        <View>
          <Section title="Register">
          </Section>
          <Form onButtonPress={() => addUser(email, password, navigation)} buttonStyle={styles.buttonContainer}>
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
                textInputStyle={styles.input}
                errorBorderColor={'grey'}
                isRequired
                value={password}
                onChangeText={(password) => setPassword(password)}
                asterik
              />
          </Form>
          </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
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