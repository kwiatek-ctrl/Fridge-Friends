import { View, Text, Switch, Pressable, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import IngredientsDropdown from '../components/IngredientsDropdown';
import CookTimeDropdown from '../components/CookTimeDropdown';
import DietaryFilterDropdown from '../components/DietaryFilterDropdown';
import { fetchUserPantry } from '../fetchData';

export default function RecipeFilterScreen({ navigation }) {
  const [inventoryOnly, setInventoryOnly] = useState(true);
  const [pantryItems, setPantryItems] = useState([]);
  const [selectedCookTimes, setSelectedCookTimes] = useState<string[]>([]);
  const [selectedDietaryFilters, setSelectedDietaryFilters] = useState<string[]>([]);

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const data = await fetchUserPantry('tinned-tomato', null, null);
        setPantryItems(data);
      } catch (error) {
        console.error('Error fetching pantry items:', error);
      }
    };
    getIngredients();
  }, []);

  return (
    <View className="flex-1 bg-white relative">
      <BackButton />
      <ScrollView className="flex-1 px-6 pt-20">
        <Text className="text-2xl font-bold mb-4">Find Recipes</Text>

        {/* Ingredients Dropdown */}
        <IngredientsDropdown ingredients={pantryItems} />

        {/* Cook Time Dropdown */}
        <CookTimeDropdown selected={selectedCookTimes} onSelect={(val) => {
          setSelectedCookTimes((prev) =>
            prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
          );
        }} />

        {/* Dietary Filter Dropdown */}
        <DietaryFilterDropdown selected={selectedDietaryFilters} onSelect={(val) => {
          setSelectedDietaryFilters((prev) =>
            prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
          );
        }} />

        {/* Inventory Only Toggle */}
        <View className="items-center mb-6">
          <Text className="text-lg font-semibold mb-2">Inventory only</Text>
          <Switch value={inventoryOnly} onValueChange={setInventoryOnly} />
        </View>

        {/* Generate Button */}
        <Pressable
          onPress={() => navigation.navigate('RecipeResult')}
          className="bg-purple-600 py-3 rounded-lg mb-10"
        >
          <Text className="text-white text-center text-lg font-bold">Generate</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}