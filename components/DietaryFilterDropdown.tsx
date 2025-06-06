import { View, Text, Pressable, FlatList } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const dietaryOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten free',
  'Dairy free',
  'Nut free',
  
];

export default function DietaryFilterDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleItem = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  return (
    <View className="mb-4">
      <Text className="text-lg font-semibold mb-1">Dietary Filters</Text>
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        className="border rounded p-3 bg-gray-100 flex-row justify-between items-center"
      >
        <Text className="text-gray-600">
          {selected.length > 0 ? selected.join(', ') : 'None'}
        </Text>
        <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="gray" />
      </Pressable>

      {isOpen && (
        <View className="mt-2 border rounded bg-white max-h-60">
          <FlatList
            data={dietaryOptions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              const isSelected = selected.includes(item);
              return (
                <Pressable
                  onPress={() => toggleItem(item)}
                  className="px-4 py-2 border-b border-gray-200 flex-row justify-between items-center"
                >
                  <Text
                    className={`${
                      isSelected ? 'font-bold text-purple-600' : 'text-black'
                    }`}
                  >
                    {item}
                  </Text>
                  {isSelected && <Ionicons name="checkmark" size={20} color="#9333ea" />}
                </Pressable>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}