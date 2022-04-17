import * as React from 'react';
import { View, Text , Button, StyleSheet, FlatList, Image, TouchableOpacity, Alert} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'

const getMedia = async(id) => {
  await RNFetchBlob.fetch('GET', "http://192.168.0.14:8000/getmedia?mediaid=" + id, {
      'Authorization': `Bearer ${global.auth}`,
    })
.then((res) => {
    let status = res.info().status;
    console.log(status)
    if(status == 200) {
      // the conversion is done in native code
      let base64Str = res.base64();
      global.image64 = <Image style={{height:50, width:50}} source={{uri: 'data:image/png;base64,' + base64Str}}/>
    }
  })
  // Something went wrong:
  .catch((errorMessage, statusCode) => {
    console.log(errorMessage, statusCode);
  })
  }

function CommondetailsScreen({ navigation, route }) {
    const ticket = route.params;
    const issueType = ticket.item.issueType.replace(/[\])}[{(]/, '').replace(/'/g, '').replace(/]/g, '').split(",");
    var stage, solutionText, solutionVideo;

    try {
        getMedia(parseInt(ticket.item.image_id))
        if (image64){
                console.log('cool')
            } else {
                global.image64 = <Text style={styles.list}>Not supplied</Text>
            }
    }
    catch {
        global.image64 = <Text style={styles.list}>Not supplied</Text>
    }


    if (ticket.item.stage == 1) {
      stage = <Text style={styles.text}>Sent</Text>;
      global.image64 = <Text style={styles.list}>Not supplied</Text>
    } else if(ticket.item.stage == 2) {
      stage = <Text style={styles.text}>Assigned</Text>;
      global.image64 = <Text style={styles.list}>Not supplied</Text>
    } else if(ticket.item.stage == 3) {
      stage = <Text style={styles.text}>Solved</Text>;
    } else {
        stage = <Text style={styles.text}>False</Text>;
    }

    if(ticket.item.solutionText){
        solutionText = <Text style={styles.list}>{ticket.item.solutionText}</Text>
    } else {
        solutionText = <Text style={styles.list}>Not supplied</Text>
    }

    try {
        if(ticket.item.assignedTo_id){
                var assignedTo_id = ticket.item.assignedTo_id
            } else {
                var assignedTo_id = null
            }
    } catch {
        var assignedTo_id = null
    }


    return (

      <View>
        <Text style={styles.text}>{ticket.item.name}</Text>
        <Text style={styles.text}>{ticket.item.description}</Text>
        <Text style={styles.text}>Issue tags:</Text>
        {
          issueType.map((item) => (<Text key={item} style={styles.list}>- {item}</Text>))
        }
       {stage}
       <Text style={styles.list}>Steps/Video on how to solve </Text>
       {solutionText}
       {image64}
      <TouchableOpacity onPress={() => Alert.alert("Cannot delete example ticket")} style={styles.button}>
          <Text style={styles.buttonText}>Delete ticket</Text>
        </TouchableOpacity>
       <TouchableOpacity onPress={() => Alert.alert("Cannot chat on example ticket")} style={styles.button}>
         <Text style={styles.buttonText}>View chat</Text>
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
          margin: 10,
       },
       list: {
         fontSize: 16,
         textAlign: 'center',
      }
    });

  export default CommondetailsScreen