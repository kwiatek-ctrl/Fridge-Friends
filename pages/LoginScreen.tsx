import BackButton from 'components/BackButton';
import { ScreenContent } from 'components/ScreenContent';
import { View } from 'react-native';

export default function LoginScreen({navigation}) {
  return (
    <View className="flex-1 bg-white mt-5">
      <BackButton />
      <ScreenContent
        title="Sign in to Fridge Friends"
        path="LoginScreen.tsx"
        navigation={navigation}
      />
    </View>
  );
}