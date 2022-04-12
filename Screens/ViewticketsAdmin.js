import * as React from 'react';
import { View, Text , Button} from 'react-native';

function ViewticketsAdminScreen({ navigation }) {
    return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>View tickets Admin Screen</Text>
          <Button
              title="Logout"
              onPress={() => navigation.navigate('Login')}
          />
      </View>
    );
  }

  export default ViewticketsAdminScreen