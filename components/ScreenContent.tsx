import { Text, View } from 'react-native';
import { EditScreenInfo } from './LogIn';

type ScreenContentProps = {
  title?: string;
  path: string;
  children?: React.ReactNode;
  navigation: any;
};

export const ScreenContent = ({ title, path, children, navigation }: ScreenContentProps) => {
  return (
    <View className={styles.container}>
      <Text className={styles.title}>{title}</Text>
      <EditScreenInfo path={path} navigation={navigation}/>
      {children}
    </View>
  );
};

const styles = {

  container: ` flex-1 justify-center`,
  // separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
}