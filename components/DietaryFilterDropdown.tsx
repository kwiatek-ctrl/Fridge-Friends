import { View, Text, Pressable, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const dietaryOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten free',
  'Dairy free',
  'Nut free',
];

export default function DietaryFilterDropdown({
  selected = [],
  onSelect = () => {},
}: {
  selected?: string[];
  onSelect?: (newSelected: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleItem = (name: string) => {
    const newSelected = selected.includes(name)
      ? selected.filter((i) => i !== name)
      : [...selected, name];
    onSelect(newSelected);
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
               isSelected ? 'font-bold text-[#0D4A59]' : 'text-black'
              }`}
                 >

                    {item}
                  </Text>
                  {isSelected && <Ionicons name="checkmark" size={20} color="#0D4A59" />}
                </Pressable>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}