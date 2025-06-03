import { Pressable, Text, TextInput, View, Alert, Image } from 'react-native';

export const EditScreenInfo = ({ path }: { path: string }) => {
  const txt = 'Email';
  const pass = 'Password';
  const signIn = 'Sign In';
  const forgotPass = 'Forgot Password?';

  return (
    <View>
      {/* <Image className={styles.logoImg} source={require('../assets/logo.png')} /> */}
      <View className={styles.getStartedContainer}>
        <Text className={styles.getStartedText}>{txt}</Text>
        <TextInput className={styles.inputArea} placeholder="Email address"></TextInput>
        <Text className={styles.getStartedText}>{pass}</Text>
        <TextInput
          className={styles.inputArea}
          placeholder="*******"
          secureTextEntry={true}></TextInput>
          <View className={styles.signInContainer}>
        <Pressable
          className={styles.buttonSignIn}
          onPress={() => Alert.alert('Successfully logged in!')}>
          <Text className={styles.signIn}>{signIn}</Text>
        </Pressable>
        </View>
      </View>
      <View className={styles.helpContainer}>
        <Pressable
          className={styles.helpLink}
          onPress={() => console.log('Forgot Password Pressed')}>
          <Text className={styles.helpLinkText}>{forgotPass}</Text>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={() => {}}><Text className={styles.formFooter}>Don`t have an account?<Text className={styles.footerSignUp}> Sign up</Text></Text></Pressable>
      </View>
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
  buttonSignIn: 'justify-items-center bg-sky-500 rounded-2xl p-2 mt-3 w-60',
  signIn: 'text-center text-white',
  footerSignUp: 'underline text-lg',
  formFooter: 'text-center p-4 text-gray-600',
  signInContainer: 'items-center ',
  logoImg:'flex items-center '
};
