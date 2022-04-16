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

const createTicket = (name, issuetype, description, devicetype, createdby) => {
fetch("http://192.168.0.14:8000/createticket", {
            method: "post",
            headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${global.auth}`,
            },
            body: JSON.stringify({ name, devicetype, createdby, issuetype, description }),
        })
        .then(response => {
            const statusCode = response.status;
            return Promise.all([statusCode]);
            })
            .then((res) => {
            console.log(res)
            if(res=='200'){
                Alert.alert("Ticket created successfully")
            }
            else{
                Alert.alert('Ticket was not created, please try again')
            }
            })
            .catch(error => {
            console.error(error);
            return { name: "network error", description: "" };
            });
}


function CreateticketScreen({ route, navigation }) {
  const [name, setName] = React.useState(null);
  const [tags, setTags] = React.useState(null);
  const [desc, setDesc] = React.useState(null);
  const [device, setDevice] = React.useState(null);
  const devices = [];

  for (const element of route.params.devicesList){
    devices.push(element.name)
  }

    return (
    <SafeAreaView style={styles.container}>
              <View>
                  <Form onButtonPress={() => createTicket(name, tags, desc, devices[device], global.userid)} buttonText={"Create ticket"}>
                      <FormItem
                       label="Name of the ticket"
                       labelStyle={{margin:10}}
                       textInputStyle={styles.input}
                       errorBorderColor={'grey'}
                       isRequired
                       value={name}
                       onChangeText={(name) => setName(name)}
                       asterik
                       />
                    <Tags
                    initialText="Write tags you wish to include"
                    onChangeTags={tags => setTags(tags)}
                    inputStyle={{ backgroundColor: "white" }}
                    tagContainerStyle = {{ color: "red" }}
                    tagTextStyle = {styles.buttonText}
                    />
                    <ModalDropdown
                    options={devices}
                    style = {styles.dropdown}
                    defaultValue = "Please select your device"
                    onSelect={(device) => setDevice(device)}
                    showsVerticalScrollIndicato={true}
                    textStyle = {{fontSize:16}}
                    />
                    <FormItem
                       label="Description of the issue"
                       labelStyle={{margin:10}}
                       value={desc}
                       textArea={true}
                       onChangeText={(desc) => setDesc(desc)}
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

  export default CreateticketScreen