import * as React from 'react';
import { View, Text , Button} from 'react-native';
function ViewticketsScreen({ navigation }) {
    return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>View tickets Screen</Text>
          <Button
              title="Logout"
              onPress={() => navigation.navigate('Login')}
          />
      </View>
    );
  }

  export default ViewticketsScreen