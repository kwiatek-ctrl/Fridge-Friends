import { ScrollView, View } from 'react-native';
import BackButton from '../components/BackButton';
import AddItem from '../components/AddItem';

export default function AddItemScreen() {
  return (
    <View className="flex-1 bg-white">
      <BackButton />
      <ScrollView className="px-6 pt-20">
        <AddItem />
      </ScrollView>
    </View>
  );
}
