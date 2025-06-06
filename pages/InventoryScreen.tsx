import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from 'react';
import { fetchUserPantry } from 'fetchData.js'; 
import PantryItem from '../components/PantryItem';

type PantryItem = {
  _id: string;
  name: string;
  quantity: number;
  unit: string;
  location: string;
  category?: string;
  expiryDate: string;
};

export default function InventoryScreen() {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const username = 'tinned-tomato'; 

    fetchUserPantry(username)
      .then((items) => {
        setPantryItems(items);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching pantry:', err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className="flex-1 bg-white p-4">
      <FlatList
        data={pantryItems}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 200 }}
        renderItem={({ item }) => <PantryItem item={item} />}
        scrollEnabled={true}
      />
    </View>
  );
}