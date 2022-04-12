import * as React from 'react';
import { View, Text , Button} from 'react-native';

function CreateticketScreen({ navigation }) {
    return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Create ticket Screen</Text>
          <Button
              title="Logout"
              onPress={() => navigation.navigate('Login')}
          />
      </View>
    );
  }

  export default CreateticketScreen