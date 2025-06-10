import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from 'react';
import { fetchUserPantry } from 'fetchData.js'; 
import PantryItem from '../components/PantryItem';
import BackButton from "components/BackButton";
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [locationOpen, setLocationOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const [locationItems, setLocationItems] = useState(
    LOCATIONS.map((loc) => ({ label: loc, value: loc }))
  );
  const [categoryItems, setCategoryItems] = useState<{ label: string, value: string }[]>([
    { label: "All", value: "All" }
  ]);

  

  useEffect(() => {
    const username = 'fridge1234'; 

    fetchUserPantry(username)
      .then((items) => {
        setPantryItems(items);
        setIsLoading(false);

        const uniqueCategories = Array.from(
          new Set(items.map(item => item.category || "Uncategorized"))
        );

        setCategoryItems([
          { label: "All", value: "All" },
          ...uniqueCategories.map(cat => ({ label: cat, value: cat }))
        ]);
      })
      .catch((err) => {
        console.error('Error fetching pantry:', err);
        setIsLoading(false);
      });
  }, []);

  const filteredItems = pantryItems.filter((item) => {
    const locationMatch = !selectedLocation || selectedLocation === "All" || item.location === selectedLocation;
    const categoryMatch = !selectedCategory || selectedCategory === "All" || item.category === selectedCategory;
    return locationMatch && categoryMatch;
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
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