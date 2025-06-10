import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import UpdateItem from './UpdateItem';
import { PantryItemType } from '../types';

type PantryItemProps = {
  item: PantryItemType;
  username: string;
  onOptimisticUpdate?: (updatedItem: PantryItemType) => void; 
};

  export default function PantryItem({ item, onOptimisticUpdate }: PantryItemProps) {
    const [expanded, setExpanded] = useState(false);
  
    return (
      <Pressable onPress={() => setExpanded(!expanded)}>
        <View className="mb-4 p-4 border border-gray-300 rounded bg-white" style={{ zIndex: expanded ? 1000 : 1 }}>
          <Text className="text-lg font-semibold">{item.name}</Text>
          <Text>Qty: {item.quantity} {item.unit}</Text>
          <Text>Location: {item.location}</Text>
          <Text>Expires: {new Date(item.expiryDate).toDateString()}</Text>
  
          {expanded && <UpdateItem username="tinned-tomato" item={item} onOptimisticUpdate={onOptimisticUpdate}/>}
        </View>
      </Pressable>
    );
  }