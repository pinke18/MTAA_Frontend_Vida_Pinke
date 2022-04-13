import React, { useState } from 'react';
import { Text, StyleSheet, Button, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';

function CallScreen({ setScreen, screens, setRoomId, roomId, navigation }) {

  const onCallOrJoin = (screen) => {
    if (roomId.length > 0) {
      setScreen(screen)
    }
  }

  return (
  <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.heading} >Select a Room</Text>
                <TextInput style={styles.input} value={roomId} onChangeText={setRoomId} />
                  <TouchableOpacity onPress={() => onCallOrJoin(screens.JOIN)} style={styles.button}>
                    <Text style={styles.buttonText}>Join Screen</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onCallOrJoin(screens.CALL)} style={styles.button}>
                    <Text style={styles.buttonText}>Call Screen</Text>
                  </TouchableOpacity>
            </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  heading: {
    marginVertical: 10,
    alignSelf: 'center',
    fontSize: 30,
  },
  input: {
    margin: 20,
    height: 40,
    backgroundColor: '#aaa'
  },
   button: {
       backgroundColor: "red",
       padding: 15,
       borderRadius: 10,
       marginVertical: 10,
       marginHorizontal: 10,
   },
   buttonText: {
       color: "white",
       textAlign: 'center',
   }
});

export default CallScreen