import { UserContext } from 'contexts/UserContext';
import { useContext } from 'react';
import { Pressable, Text } from 'react-native';

const LogUserIn = () => {
  const { user, setUser } = useContext(UserContext);
  const logUserIn = () => {
    setUser((currUser) => {
      return currUser ? currUser : null;
    });
  };

  return (
    <Pressable onPress={logUserIn}>
      <Text className="text-center text-xl font-bold text-white">Log in</Text>
    </Pressable>
  );
};

export default LogUserIn;
