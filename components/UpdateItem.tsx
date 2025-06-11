import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { patchItemInPantry } from '../fetchData'; 
import CustomSelectDropdown from './CustomSelectDropdown';

type UpdateItemProps = {
  username: string;
  item: {
    _id: string;
    name: string;
    quantity: number;
    unit: string;
    location: string;
    expiryDate: string;
  };
  onOptimisticUpdate: (updatedItem: {
    _id: string;
    name: string;
    quantity: number;
    unit: string;
    location: string;
    expiryDate: string;
  }) => void;
};

export default function UpdateItem({ username, item, onOptimisticUpdate }: UpdateItemProps) {
  const [quantity, setQuantity] = useState(String(item.quantity));
  const [unit, setUnit] = useState(item.unit);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(item.location);

  const handleUpdate = () => {
    setLoading(true);
    const updatedItem = {
      ...item,
      quantity: Number(quantity),
      unit,
      location,
    };

    if (onOptimisticUpdate) {
      onOptimisticUpdate(updatedItem);
    }

    patchItemInPantry(username, item._id, updatedItem)
      .then(() => {
        Alert.alert('Success', 'Item updated successfully!');
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Alert.alert('Error', 'Failed to update item.');
        setLoading(false);
      });
  };

  return (
    <View className="mt-4 space-y-4">
      {/* Quantity */}
      <View className="flex-row items-center">
        <Text className="w-24">Quantity:</Text>
        <TextInput
          className="flex-1 border px-3 py-2 rounded"
          value={quantity}
          onChangeText={setQuantity}
          placeholder="Quantity"
          keyboardType="numeric"
        />
      </View>

      {/* Unit */}
      <View className="flex-row items-center">
        <Text className="w-24">Units:</Text>
        <TextInput
          className="flex-1 border px-3 py-2 rounded"
          value={unit}
          onChangeText={setUnit}
          placeholder="Unit"
        />
      </View>

      {/* Location */}
      <View className="flex-row items-center">
        <Text className="w-24">Location:</Text>
        <View className="flex-1">
          <CustomSelectDropdown
            label=""
            options={['Fridge', 'Freezer', 'Cupboard']}
            selected={location}
            onSelect={setLocation}
          />
        </View>
      </View>

      {/* Submit */}
      <Pressable
        className={`bg-[#0D4A59] px-4 py-2 rounded ${loading ? 'opacity-50' : ''}`}
        onPress={handleUpdate}
        disabled={loading}
      >
        <Text className="text-white font-semibold text-center">
          {loading ? 'Updating...' : 'Update Item'}
        </Text>
      </Pressable>
    </View>
  );
}
