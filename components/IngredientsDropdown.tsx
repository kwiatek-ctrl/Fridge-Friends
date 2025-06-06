import { View, Text, Pressable, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function IngredientsDropdown({ ingredients = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (ingredients.length > 0) {
      setSelected(ingredients.map((item) => item.name));
    }
  }, [ingredients]);

  const toggleItem = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  return (
    <View className="mb-4">
      <Text className="text-lg font-semibold mb-1">Ingredients</Text>
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        className="border rounded p-3 bg-gray-100 flex-row justify-between items-center"
      >
        <Text className="text-gray-600">
          {selected.length > 0 ? selected.join(', ') : 'Select ingredients'}
        </Text>
        <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="gray" />
      </Pressable>

      {isOpen && (
        <View className="mt-2 border rounded bg-white max-h-60">
          <FlatList
            data={ingredients}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => {
              const isSelected = selected.includes(item.name);
              return (
                <Pressable
                  onPress={() => toggleItem(item.name)}
                  className="px-4 py-2 border-b border-gray-200 flex-row justify-between items-center"
                >
                  <Text
                    className={`${
                      isSelected ? 'font-bold text-purple-600' : 'text-black'
                    }`}
                  >
                    {item.name}
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