import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function CustomSelectDropdown({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="mb-4">
      <Text className="text-base font-semibold mb-1">{label}</Text>

      {/* Dropdown button */}
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        className="border rounded p-3 bg-gray-100 flex-row justify-between items-center"
      >
        <Text className="text-gray-800">{selected}</Text>
        <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="gray" />
      </Pressable>

      {/* Dropdown options */}
      {isOpen && (
        <View className="mt-2 border rounded bg-white">
          {options.map((item) => (
  <Pressable
    key={item}
    onPress={() => {
      onSelect(item);
      setIsOpen(false);
    }}
    className="px-4 py-2 border-b border-gray-200"
  >
    <View className="flex-row justify-between items-center">
      <Text className={item === selected ? 'text-[#0D4A59] font-bold' : 'text-black'}>
        {item}
      </Text>
      {item === selected && <Ionicons name="checkmark" size={20} color="#0D4A59" />}
    </View>
  </Pressable>
))}

        </View>
      )}
    </View>
  );
}
