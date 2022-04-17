import * as React from 'react';
import { View, Text , Button, FlatList, TouchableOpacity, StyleSheet, Alert} from 'react-native';

const ticketInfo = (navigation, examples, id) => {
    console.log(examples[0], id)
  if (id == 1){
    navigation.navigate('Commondetails', {item: examples[0]});
  } else if(id == 2) {
    navigation.navigate('Commondetails', {item: examples[1]});
  } else if(id == 3) {
    navigation.navigate('Commondetails', {item: examples[2]});
  }
 };


function CommonproblemsScreen({ route, navigation }) {
  let examples = [ { id:1, name: "Example ticket open", issueType:"['Tags', 'To', 'Display']", description:"Description of your problem",
  stage: 1, complete: false, solutionText: null, assignedTo_id: 16, createdBy_id: 1, deviceType_id: 2, image_id: null, solutionVideo_id: null
  }, { id:2, name: "Example ticket assigned", issueType:"['Tags', 'To', 'Display']", description:"Description of your problem",
   stage: 2, complete: false, solutionText: null, assignedTo_id: 16, createdBy_id: 1, deviceType_id: 2, image_id: null, solutionVideo_id: null
  }, { id:3, name: "Example ticket closed", issueType:"['Tags', 'To', 'Display']", description:"Description of your problem",
    stage: 3, complete: true, solutionText: "This is the solution to your issue", assignedTo_id: 16, createdBy_id: 1, deviceType_id: 2, image_id: 5, solutionVideo_id: null
  }];
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Example tickets</Text>
      <FlatList
                data={examples}
                renderItem={({ item }) => <TouchableOpacity onPress={() => ticketInfo(navigation, examples, item.id)} style={styles.button}>
                <Text style={styles.buttonText}>{item.name}</Text>
              </TouchableOpacity>}
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
  export default CommonproblemsScreen