import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import UpdateItem from './UpdateItem';
import DeleteItem from './DeleteItem';
import { PantryItemType } from '../types';

type PantryItemProps = {
  item: PantryItemType;
  username: string;
  onOptimisticUpdate?: (updatedItem: PantryItemType) => void;
  onDeleteItem?: (deletedId: string) => void;
};

  export default function PantryItem({ item, username, onOptimisticUpdate, onDeleteItem }: PantryItemProps) {
    const [expanded, setExpanded] = useState(false);
  
    return (
        <View className="mb-4 border border-gray-300 rounded bg-white relative">
        {onDeleteItem && (
          <View style={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}>
            <DeleteItem
              username={username}
              itemId={item._id}
              onDelete={onDeleteItem}
            />
          </View>
        )}
      
        <Pressable onPress={() => setExpanded(!expanded)} className="p-4">
          <Text className="text-lg font-semibold">{item.name}</Text>
          <Text>Qty: {item.quantity} {item.unit}</Text>
          <Text>Location: {item.location}</Text>
          <Text>Expires: {new Date(item.expiryDate).toDateString()}</Text>
      
          {expanded && (
            <UpdateItem
              username={username}
              item={item}
              onOptimisticUpdate={onOptimisticUpdate}
            />
          )}
        </Pressable>
      </View>
    );
  }