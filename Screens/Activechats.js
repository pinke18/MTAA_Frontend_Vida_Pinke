import * as React from 'react';
import { View, Text , Button} from 'react-native';

function ActivechatsScreen({ navigation }) {
    return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>ActivechatsScreen</Text>
          <Button
              title="Logout"
              onPress={() => navigation.navigate('Login')}
          />
      </View>
    );
  }

  export default ActivechatsScreen