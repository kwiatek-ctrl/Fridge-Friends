import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EditProfile({ route, navigation }) {
  const { userData } = route.params;
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.emailAddress);

  const handleSave = () => {
    
    navigation.goBack();
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        className="border p-2 mb-4"
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        className="border p-2 mb-4"
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}