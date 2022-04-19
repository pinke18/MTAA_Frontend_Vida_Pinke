import * as React from 'react';
import { View, Text , Button,Alert, StyleSheet, TouchableOpacity, Image} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

async function launchImageLibrary (navigation) {
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  //console.log("Sme tu");
  const response = await ImagePicker.launchImageLibrary(options);
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
    alert(response.customButton);
  } else {
    const source = { uri: response.uri };
    //console.log('response', JSON.stringify(response));
    //console.log(source)
    json = JSON.stringify(response)
    //console.log("JSON IS THIS")
    //console.log(response.assets[0].uri)
    global.uri = response.assets[0].uri;
    global.filename = response.assets[0].fileName
    createTicket(navigation)

    //console.log('We did it');
  }

}

const createTicket = (navigation) => {
    let formdata = new FormData();
    formdata.append("isVideo", false)
    formdata.append("name", global.filename)
    formdata.append("file", {uri: global.uri, name: global.filename, type: 'image/jpeg'})
    console.log("Tu sme")
    console.log(formdata)
    fetch("http://" + global.serverIP + ":8000/insertmedia", {
                method: "post",
                headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${global.auth}`,
                },
                body: formdata
            })
            .then(response => {
                const statusCode = response.status;
                console.log(statusCode)
                if(statusCode=='200'){
                  Alert.alert("File Uploaded")
                  return response.json()
              }
              else{
                  Alert.alert('File not uploaded, please try again')
              }})
                .then((json) => {
                  global.lastimage = json.imageID
                  navigation.push("UploadImageScreen")
                })
                .catch(error => {
                console.error(error);
                return { name: "network error", description: "" };
                });
    }

function UploadImageScreen({ navigation }) {
    return (

      

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={{uri: "http://" + global.serverIP + ":8000/getmedia?mediaid=" + global.lastimage}}
   style={{width: 400, height: 400}} />
        <Text>Upload image screen</Text>
        <TouchableOpacity onPress={() => launchImageLibrary(navigation)} style={styles.button}>
        <Text style={styles.buttonText}>Choose an image to upload</Text>
    </TouchableOpacity>
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
  export default UploadImageScreen