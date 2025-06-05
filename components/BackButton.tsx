import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={{
        position: 'absolute',
        top: 40, 
        left: 16,
        zIndex: 10,
      }}
    >
      <Ionicons name="arrow-back" size={28} color="black" />
    </Pressable>
  );
}