import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from 'react';
import { fetchUserPantry } from 'fetchData.js'; 


export default function InventoryScreen() {
  const [pantryItems, setPantryItems] = useState([]);
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
        renderItem={({ item }) => (
          <View className="mb-4 p-4 border border-gray-300 rounded">
            <Text className="text-lg font-semibold">{item.name}</Text>
            <Text>Qty: {item.quantity} {item.unit}</Text>
            <Text>Location: {item.location}</Text>
            <Text>Expires: {new Date(item.expiryDate).toDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
}