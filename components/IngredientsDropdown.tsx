import { View, Text, Pressable, FlatList, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function IngredientsDropdown({
  ingredients = [],
  selected = [],
  onChange,
}: {
  ingredients: { name: string }[];
  selected: string[];
  onChange: (newSelected: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (name: string) => {
    const newSelected = selected.includes(name)
      ? selected.filter((i) => i !== name)
      : [...selected, name];
    onChange(newSelected);
  };

  const filteredIngredients = ingredients.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View className="mb-4">
      <Text className="text-lg font-semibold mb-1">Ingredients</Text>
      <Pressable
        onPress={() => {
          setIsOpen(!isOpen);
          if (isOpen) setSearchTerm('');
        }}
        className="border rounded p-3 bg-gray-100 flex-row justify-between items-center"
      >
        <Text className="text-gray-600">
          {selected.length > 0 ? selected.join(', ') : 'Select ingredients'}
        </Text>
        <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="gray" />
      </Pressable>

      {isOpen && (
        <View className="mt-2 border rounded bg-white max-h-60">
          {/* Search Bar */}
          <TextInput
            placeholder="Search ingredients..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            className="px-3 py-2 border-b border-gray-200 text-base"
          />

          {/* Filtered List */}
          <FlatList
            data={filteredIngredients}
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
                  {isSelected && (
                    <Ionicons name="checkmark" size={20} color="#9333ea" />
                  )}
                </Pressable>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}