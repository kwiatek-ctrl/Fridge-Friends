import { ScrollView, View, Text } from 'react-native';
import BackButton from '../components/BackButton';
import AddItem from '../components/AddItem';

export default function AddItemScreen() {
  return (
    <View className="flex-1 bg-white mt-5">
      <BackButton />
      <ScrollView className="px-6 pt-20">
        <Text className="text-2xl font-semibold text-gray-800 mb-4">Add Items</Text>
        <AddItem />
      </ScrollView>
    </View>
  );
}
