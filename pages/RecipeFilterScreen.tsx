import { View, Text, Switch, Pressable, ScrollView } from 'react-native';
import { useState } from 'react';
import BackButton from '../components/BackButton';

export default function RecipeFilterScreen({ navigation }) {
  const [fridgeOnly, setFridgeOnly] = useState(true);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [cookTime, setCookTime] = useState('');
  const [dietaryFilters, setDietaryFilters] = useState([]);

  return (
    <View className="flex-1 bg-white relative">
      <BackButton />

      <ScrollView className="flex-1 px-6 pt-20">
        <Text className="text-2xl font-bold mb-4">Find Recipes</Text>

        {/* Ingredients Selector */}
        <View className="mb-4">
          <Text className="text-lg font-semibold mb-1">Ingredients</Text>
          <Pressable className="border rounded p-3 bg-gray-100">
            <Text className="text-gray-600">Select ingredients (coming soon)</Text>
          </Pressable>
        </View>

        {/* Cook Time Selector */}
        <View className="mb-4">
          <Text className="text-lg font-semibold mb-1">Cook Time</Text>
          <Pressable className="border rounded p-3 bg-gray-100">
            <Text className="text-gray-600">Select cook time (coming soon)</Text>
          </Pressable>
        </View>

        {/* Dietary Filters */}
        <View className="mb-4">
          <Text className="text-lg font-semibold mb-1">Dietary Filters</Text>
          <Pressable className="border rounded p-3 bg-gray-100">
            <Text className="text-gray-600">Select dietary filters (coming soon)</Text>
          </Pressable>
        </View>

        {/* Fridge Only Toggle */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-lg font-semibold">Fridge only</Text>
          <Switch value={fridgeOnly} onValueChange={setFridgeOnly} />
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