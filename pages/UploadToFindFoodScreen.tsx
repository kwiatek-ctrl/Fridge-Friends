import { View, Text, TextInput, FlatList, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { fetchUserPantry } from 'fetchData.js';
import PantryItem from '../components/PantryItem';
import BackButton from '../components/BackButton';
import DropDownPicker from 'react-native-dropdown-picker';
import Checkbox from 'expo-checkbox';

type PantryItemType = {
  _id: string;
  name: string;
  quantity: number;
  unit: string;
  location: string;
  category?: string;
  expiryDate: string;
};

const LOCATIONS = ['All', 'Fridge', 'Freezer', 'Cupboard'];

export default function UploadToFindFoodScreen() {
  const [pantryItems, setPantryItems] = useState<PantryItemType[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [locationOpen, setLocationOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const [locationItems, setLocationItems] = useState(
    LOCATIONS.map((loc) => ({ label: loc, value: loc }))
  );
  const [categoryItems, setCategoryItems] = useState<{ label: string; value: string }[]>([
    { label: 'All', value: 'All' }
  ]);

  useEffect(() => {
    fetchUserPantry('tinned-tomato')
      .then((items) => {
        setPantryItems(items);
        setIsLoading(false);

        const uniqueCategories = Array.from(
          new Set(items.map((item) => item.category || 'Uncategorized'))
        );

        setCategoryItems([
          { label: 'All', value: 'All' },
          ...uniqueCategories.map((cat) => ({ label: cat, value: cat }))
        ]);
      })
      .catch((err) => {
        console.error('Error fetching pantry:', err);
        setIsLoading(false);
      });
  }, []);

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const filteredItems = pantryItems.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const locationMatch = !selectedLocation || selectedLocation === 'All' || item.location === selectedLocation;
    const categoryMatch = !selectedCategory || selectedCategory === 'All' || item.category === selectedCategory;
    return nameMatch && locationMatch && categoryMatch;
  });

  if (isLoading) return <Text className="mt-10 text-center">Loading...</Text>;

  return (
    <View className="flex-1 bg-white pt-[72px] px-4">
      <BackButton />
      <Text className="text-2xl font-bold mb-4 text-center">Upload to Share</Text>

      {/* Search Bar */}
      <TextInput
        placeholder="Search your pantry..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        className="border border-gray-300 rounded-lg px-4 py-2 mb-4 bg-gray-100 text-base"
      />

      {/* Dropdown filters */}
      <View className="z-50 mb-4">
        <DropDownPicker
          open={locationOpen}
          value={selectedLocation}
          items={locationItems}
          setOpen={setLocationOpen}
          setValue={setSelectedLocation}
          setItems={setLocationItems}
          placeholder="Select Location"
          listMode="MODAL"
          zIndex={3000}
          zIndexInverse={1000}
        />
        <DropDownPicker
          open={categoryOpen}
          value={selectedCategory}
          items={categoryItems}
          setOpen={setCategoryOpen}
          setValue={setSelectedCategory}
          setItems={setCategoryItems}
          placeholder="Select Category"
          listMode="MODAL"
          zIndex={2000}
          zIndexInverse={2000}
          style={{ marginTop: 16 }}
        />
      </View>

      {/* Upload Button */}
      <Pressable
        onPress={() => console.log('Uploading:', selectedItems)}
        className="bg-purple-600 py-3 rounded-lg mb-4"
      >
        <Text className="text-white text-center font-bold">Upload Selected</Text>
      </Pressable>

      {/* Pantry List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center mb-4 border-b pb-2">
            <View className="flex-1 mr-2">
              <Text className="text-lg font-semibold">{item.name}</Text>
              <Text className="text-gray-600">
                {item.quantity} {item.unit} • {item.location}
              </Text>
              <Text className="text-gray-500 text-sm">
  Expires: {item.expiryDate.slice(0, 10)}
</Text>
            </View>
            <Checkbox
              value={selectedItems.includes(item._id)}
              onValueChange={() => toggleItemSelection(item._id)}
              color={selectedItems.includes(item._id) ? '#9333ea' : undefined}
            />
          </View>
        )}
      />
    </View>
  );
}