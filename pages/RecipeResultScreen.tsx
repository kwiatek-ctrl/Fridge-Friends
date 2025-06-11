import { View, Text, Pressable, ScrollView } from 'react-native';
import { useState } from 'react';
import BackButton from '../components/BackButton';
//import recipesData from '../practice-recipes';
import { useRoute } from '@react-navigation/native';

export default function RecipeResultScreen() {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [currentIndex, setCurrentIndex] = useState(0);
  const route = useRoute();
  const recipes =route.params?.recipes || [];

 // const recipes = recipesData.recipes;
  const current = recipes[currentIndex];

  const toggleUnit = () => {
    setUnitSystem((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <View className="flex-1 bg-white">
      <BackButton />

      <ScrollView className="flex-1 px-6 pt-20">
        {/* Header */}
        <Text className="text-2xl font-bold mb-6 mt-4">Recipe Result</Text>

        {/* Difficulty Selector */}
        <View className="flex-row justify-between mb-4">
          {['Easy', 'Medium', 'Hard'].map((label, index) => (
            <Pressable
              key={label}
              onPress={() => setCurrentIndex(index)}
              className={`px-4 py-2 rounded-full ${
                currentIndex === index ? 'bg-[#0D4A59]' : 'bg-gray-300'
              }`}
            >
              <Text className="text-white font-bold">{label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Title */}
        <Text className="text-xl font-bold mb-4">{current.title}</Text>
        {/* Time */}
          <Text className="text-base font-medium mb-4">Cooking time: {current.cookingTime}</Text>

        {/* Ingredients header and toggle */}
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-xl font-semibold">Ingredients</Text>
          <Pressable
            onPress={toggleUnit}
            className="border border-bg-[#0D4A59] px-3 py-1 rounded"
          >
            <Text className="text-bg-[#0D4A59] font-semibold text-sm">
              Switch to {unitSystem === 'metric' ? 'Imperial' : 'Metric'}
            </Text>
          </Pressable>
        </View>

        {/* Ingredient List */}
        <View className="mb-6">
          {current.ingredients.map((item, i) => {
            const qty = item.quantity?.[unitSystem];
            return (
              <Text key={i} className="text-base mb-1">
                {qty ? `${qty.amount} ${qty.unit} ` : ''}{item.name}
              </Text>
            );
          })}
        </View>

        {/* Method */}
        <Text className="text-xl font-semibold mb-2">Method</Text>
        <View className="mb-10">
          {current.method.map((step, i) => (
            <Text key={i} className="text-base mb-2">
              {i + 1}. {step}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}