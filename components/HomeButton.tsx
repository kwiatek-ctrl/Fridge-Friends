import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeButton() {
  const navigation = useNavigation<any>();

  return (
    <Pressable
      onPress={() => navigation.navigate("Home")}
      style={{
        position: 'absolute',
        top: 40, 
        right: 16,
        zIndex: 10,
      }}
    >
      <Ionicons name="home" size={28} color="black" />
    </Pressable>
  );
}