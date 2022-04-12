import * as React from 'react';
import { View, Text , Button} from 'react-native';

function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  return (
        <View>
          <Section title="Welcome to our App">
          </Section>
          <Form onButtonPress={() => loginUser(email, password, navigation)} buttonStyle={styles.buttonContainer}>
              <FormItem
               label="Email"
               labelStyle={{margin:10}}
               textInputStyle={styles.input}
               errorBorderColor={'grey'}
               isRequired
               value={email}
               onChangeText={(email) => setEmail(email)}
               asterik
              />
              <FormItem
                label="Password"
                labelStyle={{margin:10}}
                secureTextEntry={true}
                textInputStyle={styles.input}
                errorBorderColor={'grey'}
                isRequired
                value={password}
                onChangeText={(password) => setPassword(password)}
                asterik
              />
          </Form>
        </View>
  );
}

export default LoginScreen