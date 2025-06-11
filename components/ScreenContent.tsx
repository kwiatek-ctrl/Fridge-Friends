import { Text, View } from 'react-native';

import { EditScreenInfo } from './LogIn';


type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children , navigation}: ScreenContentProps) => {
  return (
    <View className={styles.container}>
      <Text className={styles.title}>{title}</Text>
      <EditScreenInfo path={path} navigation={navigation}/>
      {children}
    </View>
  );
};
const styles = {
  container: `items-center flex-1 justify-center`,
  title: `text-xl font-bold mt-20 pt-10`,
};
