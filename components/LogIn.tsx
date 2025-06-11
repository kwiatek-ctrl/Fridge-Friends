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

        {/* Unified form container */}
        <View className="w-80 mx-auto space-y-3">
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

          <Pressable className={styles.buttonLogIn} onPress={handleLogin}>
            <Text className={styles.logIn}>{loginLabel}</Text>
          </Pressable>
        </View>

        {/* Forgot password */}
        <View className={styles.helpContainer}>
          <Pressable onPress={() => navigation.navigate('PasswordReset')}>
            <Text className={styles.helpLinkText}>{forgotPassword}</Text>
          </Pressable>
        </View>

        {/* Sign up link */}
        <View className="items-center mt-4">
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
  getStartedText: `text-lg leading-6 text-left`,
  helpContainer: `items-center mx-5 mt-4`,
  helpLinkText: `text-center text-gray-600`,
  inputArea: 'border border-gray-400 rounded-md p-2 w-full',
  buttonLogIn: 'bg-[#0D4A59] rounded-md py-3 w-full',
  logIn: 'text-center text-white font-bold text-base',
  footerSignUp: 'underline text-base text-purple-700',
  formFooter: 'text-center p-4 text-gray-600 text-base',
  logo: 'object-scale-down h-40 w-40 mx-auto mb-6',
};
