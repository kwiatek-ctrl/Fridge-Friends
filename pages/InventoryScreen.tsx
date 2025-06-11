import { View, Text, FlatList, TextInput, TouchableOpacity } from "react-native";
import { useEffect, useState } from 'react';
import { fetchUserPantry } from 'fetchData.js'; 
import PantryItem from '../components/PantryItem';
import BackButton from "components/BackButton";
import { Ionicons } from '@expo/vector-icons';
import CustomSelectDropdown from "../components/CustomSelectDropdown"; // nou

type PantryItem = {
  _id: string;
  name: string;
  quantity: number;
  unit: string;
  location: string;
  category?: string;
  expiryDate: string;
};

const LOCATIONS = ["All", "Fridge", "Freezer", "Cupboard"];

export default function InventoryScreen() {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [categoryOptions, setCategoryOptions] = useState<string[]>(["All"]);

  useEffect(() => {
    const username = 'fridge1234'; 

    fetchUserPantry(username)
      .then((items) => {
        setPantryItems(items);
        setIsLoading(false);

        const uniqueCategories = Array.from(
          new Set(items.map(item => item.category || "Uncategorized"))
        );

        setCategoryOptions(["All", ...uniqueCategories]);
      })
      .catch((err) => {
        console.error('Error fetching pantry:', err);
        setIsLoading(false);
      });
  }, []);

  const filteredItems = pantryItems.filter((item) => {
    const locationMatch = selectedLocation === "All" || item.location === selectedLocation;
    const categoryMatch = selectedCategory === "All" || item.category === selectedCategory;
    const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return locationMatch && categoryMatch && nameMatch;
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleItemUpdate = (updatedItem: PantryItem) => {
    setPantryItems((prevItems) =>
      prevItems.map((item) =>
        item._id === updatedItem._id ? updatedItem : item
      )
    );
  };

  const handleItemDelete = (deletedId: string) => {
    setPantryItems(prev => prev.filter(item => item._id !== deletedId));
  };

  return (
    <View className="flex-1 bg-white pt-[72px] p-4">
      <BackButton />

      <TouchableOpacity
        onPress={() => navigation.navigate('AddItem')}
        style={{
          position: 'absolute',
          top: 40,
          right: 16,
          zIndex: 100,
        }}
      >
        <Ionicons name="add" size={32} color="black" />
      </TouchableOpacity>

      <Text className="text-2xl font-bold mb-4 text-center">My Food</Text>

      {/* Search Input */}
      <TextInput
        placeholder="Search ingredients..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        className="bg-gray-100 p-3 rounded-lg mb-4 text-base"
      />

      {/* Custom Dropdowns */}
      <CustomSelectDropdown
        label="Location"
        options={LOCATIONS}
        selected={selectedLocation}
        onSelect={setSelectedLocation}
      />
      <CustomSelectDropdown
        label="Category"
        options={categoryOptions}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Pantry List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <PantryItem
            item={item}
            username="fridge1234"
            onOptimisticUpdate={handleItemUpdate}
            onDeleteItem={handleItemDelete}
          />
        )}
      />
    </View>
  );
}
