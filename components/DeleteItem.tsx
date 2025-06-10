import { Alert, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { deleteItemFromPantry } from '../fetchData'; 

type DeleteItemProps = {
  username: string;
  itemId: string;
  onDelete: (deletedId: string) => void;
};

export default function DeleteItem({ username, itemId, onDelete }: DeleteItemProps) {
  const handleDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteItemFromPantry(username, itemId);
              onDelete(itemId);
            } catch (error) {
              console.error('Failed to delete item:', error);
              Alert.alert('Error', 'Could not delete the item.');
            }
          },
        },
      ]
    );
  };

  return (
    <Pressable onPress={handleDelete} className="p-2">
      <Ionicons name="trash" size={20} color="red" />
    </Pressable>
  );
}