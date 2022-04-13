import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, RecyclerViewBackedScrollView } from 'react-native';
import CallScreen from './screens/Call';
import CreateRoomScreen from './screens/CallRoom';
import JoinCallScreen from './screens/JoinCall';

// Just to handle navigation
export default function App() {
  const screens = {
    ROOM: 'JOIN_ROOM',
    CALL: 'CALL',
    JOIN: 'JOIN',
  }

  const [screen, setScreen] = useState(screens.ROOM);
  const [roomId, setRoomId] = useState('');

  let content;

  switch (screen) {
    case screens.ROOM:
      content = <CallScreen roomId={roomId} setRoomId={setRoomId} screens={screens} setScreen={setScreen} />
      break;

    case screens.CALL:
      content = <CreateRoomScreen roomId={roomId} screens={screens} setScreen={setScreen} />
      break;

    case screens.JOIN:
      content = <JoinCallScreen roomId={roomId} screens={screens} setScreen={setScreen} />
      break;

    default:
      content = <Text>Wrong Screen</Text>
  }

  return (
    <SafeAreaView style={styles.container} >
      {content}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});