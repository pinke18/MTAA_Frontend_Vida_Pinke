import * as React from 'react';
import { View, Text , Button, StyleSheet, FlatList, Image, TouchableOpacity, Alert} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'

const getMedia = async(id) => {
  await RNFetchBlob.fetch('GET', "http://192.168.0.14:8000/getmedia?mediaid=" + id, {
      'Authorization': `Bearer ${global.auth}`,
    })
.then((res) => {
    let status = res.info().status;
    if(status == 200) {
      // the conversion is done in native code
      let base64Str = res.base64();
      global.image64 = <Image style={{height:100, width:100}} source={{uri: 'data:image/png;base64,' + base64Str}}/>
    } else {
      Alert.alert("Error retrieving image")
    }
  })
  // Something went wrong:
  .catch((errorMessage, statusCode) => {
    console.log(errorMessage, statusCode);
  })
  }

const deleteTicket = (navigation, id) => {
  return fetch("http://192.168.0.14:8000/deleteticket?ticketid=" + id, {
    method: "delete",
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${global.auth}`,
  },
  })
  .then((res) => {
    navigation.navigate('Menu');
  })
  .catch((err) => {
    console.log(err);
  });
 };

const onClickChat = (navigation, chatID, createdBy, assignedTo) => {
if(!assignedTo) {
Alert.alert("Cannot chat on unnasigned ticket")
} else {
return fetch("http://192.168.0.14:8000/getmessages?ticketid=" + chatID, {
 method: "get",
 headers: {
   'Content-type': 'application/json',
   'Authorization': `Bearer ${global.auth}`,
},
})
.then((res) => {
 console.log(chatID)
 //console.log(assignedTo)
 return res.json()
})
.then((json) => {
 //console.log(json)
 //console.log(json[0].createdBy_id[0].id)
 //console.log(json[0].createdBy_id[0].email)
 navigation.navigate('ChatScreen' , {chats: json, creator: createdBy, worker: assignedTo, ticketID: chatID });
})
.catch((err) => {
 Alert.alert("Error retrieving chat")
 console.log(err);
});
}
};

function TicketdetailsScreen({ navigation, route }){
    const ticket = route.params;
    console.log(ticket.item[0]);
    const issueType = ticket.item[0].issueType.replace(/[\])}[{(]/, '').replace(/'/g, '').replace(/]/g, '').split(",");
    var stage, solutionText, solutionVideo;

    try {
        getMedia(parseInt(ticket.item[0].image_id[0].id))
        if (image64){
                console.log('cool')
            } else {
                global.image64 = <Text style={styles.list}>Not supplied</Text>
            }
    }
    catch {
        global.image64 = <Text style={styles.list}>Not supplied</Text>
    }


    if (ticket.item[0].stage == 1) {
      stage = <Text style={styles.text}>Sent</Text>;
    } else if(ticket.item[0].stage == 2) {
      stage = <Text style={styles.text}>Assigned</Text>;
    } else if(ticket.item[0].stage == 3) {
      stage = <Text style={styles.text}>Solved</Text>;
    } else {
        stage = <Text style={styles.text}>False</Text>;
    }

    if(ticket.item[0].solutionText){
        solutionText = <Text style={styles.list}>{ticket.item[0].solutionText}</Text>
    } else {
        solutionText = <Text style={styles.list}>Not supplied</Text>
    }

    try {
        if(ticket.item[0].assignedTo_id[0].id){
                var assignedTo_id = ticket.item[0].assignedTo_id[0].id
            } else {
                var assignedTo_id = null
            }
    } catch {
        var assignedTo_id = null
    }

    return (

      <View>
        <Text style={styles.text}>{ticket.item[0].name}</Text>
        <Text style={styles.text}>{ticket.item[0].description}</Text>
        <Text style={styles.text}>Issue tags:</Text>
        {
          issueType.map((item) => (<Text key={item} style={styles.list}>- {item}</Text>))
        }
       {stage}
       <Text style={styles.list}>Steps/Video on how to solve </Text>
       {solutionText}
       {image64}
      <TouchableOpacity onPress={() => deleteTicket(navigation, ticket.item[0].id)} style={styles.button}>
          <Text style={styles.buttonText}>Delete ticket</Text>
        </TouchableOpacity>
       <TouchableOpacity onPress={() => onClickChat(navigation, ticket.item[0].id.toString(), ticket.item[0].createdBy_id[0].id, assignedTo_id) } style={styles.button}>
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

  export default TicketdetailsScreen