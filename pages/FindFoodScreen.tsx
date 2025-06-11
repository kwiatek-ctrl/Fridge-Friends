import { View, Text, TextInput, FlatList, Pressable, ScrollView } from 'react-native';
import { useState } from 'react';
import BackButton from '../components/BackButton';

const mockItems = [
  { id: '1', name: 'Apples', location: 'Camden', expiry: '2025-06-15' },
  { id: '2', name: 'Bread', location: 'Hackney', expiry: '2025-06-10' },
  { id: '3', name: 'Cheese', location: 'Brixton', expiry: '2025-06-12' },
];

export default function FindFoodScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState<'expiry' | 'name'>('expiry');

  const filteredItems = mockItems
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'expiry') {
        return new Date(a.expiry).getTime() - new Date(b.expiry).getTime();
      } else {
        return a.name.localeCompare(b.name);
      }
    });

  return (
    <View className="flex-1 bg-white relative">
      <BackButton />

      <ScrollView className="flex-1 px-6 pt-20">
        <Text className="text-2xl font-bold text-center mb-4">Find Food Near You</Text>



        {/* Search Bar */}
        <TextInput
          placeholder="Search for an item..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          className="border p-3 rounded mb-4 bg-gray-100"
        />

        {/* Location Input */}
        <TextInput
          placeholder="Enter your location"
          value={location}
          onChangeText={setLocation}
          className="border p-3 rounded mb-4 bg-gray-100"
        />

        {/* Sort Dropdown */}
        <Pressable
          onPress={() => setSortBy((prev) => (prev === 'expiry' ? 'name' : 'expiry'))}
          className="border p-3 rounded mb-4 bg-gray-100"
        >
          <Text className="text-gray-600">
            Sort by: {sortBy === 'expiry' ? 'Expiry' : 'Name'}
          </Text>
        </Pressable>

        {/* Upload Button */}
        <Pressable
          onPress={() => navigation.navigate('UploadToFindFood')}
          className="bg-[#0D4A59]py-3 rounded-lg mb-6"

        >
          <Text className="text-white text-center font-bold">Upload Food</Text>
        </Pressable>

        {/* Map Placeholder */}
        <View className="h-48 bg-gray-200 rounded-lg mb-6 items-center justify-center">
          <Text className="text-gray-600">Map Placeholder</Text>
        </View>

        {/* Food List */}
        {filteredItems.map((item) => (
          <View key={item.id} className="mb-4 border-b pb-2">
            <Text className="text-lg font-semibold">{item.name}</Text>
            <Text className="text-gray-600">Location: {item.location}</Text>
            <Text className="text-gray-600">Expires: {item.expiry}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}