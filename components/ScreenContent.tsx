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
      {title && (
        <>
          <Text className={styles.title}>{title}</Text>
          <View className={styles.separator} />
        </>
      )}
      <EditScreenInfo path={path} navigation={navigation} />
      {children}
    </View>
  );
};

const styles = {
  container: `flex-1 bg-white`,
  // separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};