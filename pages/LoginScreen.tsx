import { ScreenContent } from 'components/ScreenContent';

export default function LoginScreen({navigation}) {
  return (
    <ScreenContent
      title="Sign in to Fridge Friends"
      path="LoginScreen.tsx"
      navigation={navigation}
    />
  );
}