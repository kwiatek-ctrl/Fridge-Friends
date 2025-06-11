import { ScrollView, View, Text } from 'react-native';
import BackButton from '../components/BackButton';
import AddItem from '../components/AddItem';

export default function AddItemScreen() {
  return (
    <View className="flex-1 bg-white mt-5">
      <BackButton />
      <ScrollView className="px-6 pt-20">
         <Text className="text-2xl font-bold mb-4 text-center">Add Item</Text>

        <AddItem />
      </ScrollView>
    </View>
  );
}
