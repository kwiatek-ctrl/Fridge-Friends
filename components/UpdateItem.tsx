import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { patchItemInPantry } from '../fetchData'; 
import DropDownPicker from 'react-native-dropdown-picker';


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

const [open, setOpen] = useState(false);
const [location, setLocation] = useState(item.location);
const [items, setItems] = useState([
  { label: 'Fridge', value: 'Fridge' },
  { label: 'Freezer', value: 'Freezer' },
  { label: 'Cupboard', value: 'Cupboard' },
]);

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

    patchItemInPantry(username, item._id, {
      ...item,
      quantity: Number(quantity),
      unit,
      location
    })
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
    <View className="mt-4 space-y-2">
      <TextInput
        className="border px-3 py-2 rounded"
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Quantity"
        keyboardType="numeric"
      />
      <TextInput
        className="border px-3 py-2 rounded"
        value={unit}
        onChangeText={setUnit}
        placeholder="Unit"
      />
      <DropDownPicker
        open={open}
        value={location}
        items={items}
        setOpen={setOpen}
        setValue={setLocation}
        setItems={setItems}
        placeholder="Select location"
        listMode="MODAL" 
    />
      <Pressable
        className={`bg-blue-500 px-4 py-2 rounded ${loading ? 'opacity-50' : ''}`}
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