import { useState } from 'react';
import { Pressable, Text, TextInput, View, Alert, Image, ScrollView } from 'react-native';
import BackButton from './BackButton';

export const EditScreenInfo = ({ path, navigation }: { path: string, navigation: any }) => {
  const emailLabel = 'Email';
  const passwordLabel = 'Password';
  const loginLabel = 'Log In';
  const forgotPassword = 'Forgot Password?';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    if (validate()) {
      Alert.alert('Login successful!');
      navigation.navigate('Home');
    }
  };

  return (
    <View>
      <BackButton />
      <ScrollView className="flex-1 px-6 pt-20">
        <Image className={styles.logo} source={require('../assets/logo_transparent.png')} />
        <View className={styles.getStartedContainer}>
          <Text className={styles.getStartedText}>{emailLabel}</Text>
          <TextInput
            className={styles.inputArea}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {errors.email ? <Text className="text-red-500">{errors.email}</Text> : null}

          <Text className={styles.getStartedText}>{passwordLabel}</Text>
          <TextInput
            className={styles.inputArea}
            placeholder="Enter your password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          {errors.password ? <Text className="text-red-500">{errors.password}</Text> : null}

          <View className={styles.signInContainer}>
            <Pressable className={styles.buttonLogIn} onPress={handleLogin}>
              <Text className={styles.logIn}>{loginLabel}</Text>
            </Pressable>
          </View>
        </View>

        <View className={styles.helpContainer}>
          <Pressable
            className={styles.helpLink}
            onPress={() => console.log('Forgot Password Pressed')}
          >
            <Text className={styles.helpLinkText}>{forgotPassword}</Text>
          </Pressable>
        </View>

        <View>
          <Pressable onPress={() => navigation.navigate('CreateAccount')}>
            <Text className={styles.formFooter}>
              Don't have an account?
              <Text className={styles.footerSignUp}> Sign up</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = {
  codeHighlightContainer: `rounded-md px-1`,
  getStartedContainer: `justify-items-normal mx-12`,
  getStartedText: `text-lg leading-6 text-left pt-3`,
  helpContainer: `items-center mx-5 mt-4`,
  helpLink: `py-4`,
  helpLinkText: `text-center`,
  homeScreenFilename: `my-2`,
  inputArea: 'border border-black-600 rounded-md p-1 w-80 h-10',
  buttonLogIn: 'justify-items-center bg-sky-500 rounded-2xl p-2 mt-3 w-60',
  logIn: 'text-center text-white',
  footerSignUp: 'underline text-lg',
  formFooter: 'text-center p-4 text-gray-600',
  signInContainer: 'items-center ',
  logo: 'object-scale-down h-40 w-40 mx-auto mb-4',
};
