import { View, Text, Pressable, FlatList } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function CookTimeDropdown({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const options = ['< 15 Minutes', '<30 Minutes', '< 1 hr', "I've got all day"];

  return (
    <View className="mb-4">
      <Text className="text-lg font-semibold mb-1">Cook Time</Text>

      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        className="border rounded p-3 bg-gray-100 flex-row justify-between items-center"
      >
        <Text className="text-gray-600">
          {selected || 'Select cook time'}
        </Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="gray"
        />
      </Pressable>

      {isOpen && (
        <View className="mt-2 border rounded bg-white max-h-60">
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              const isSelected = selected === item;
              return (
                <Pressable
                  onPress={() => {
                    onSelect(item);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 border-b border-gray-200 flex-row justify-between items-center"
                >
                  <Text
                    className={`${
                      isSelected
                        ? 'font-bold text-[#0D4A59]'
                        : 'text-black'
                    }`}
                  >
                    {item}
                  </Text>
                  {isSelected && (
                    <Ionicons name="checkmark" size={20} color="#0D4A59" />
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
