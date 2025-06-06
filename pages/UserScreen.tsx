import { View, Text } from 'react-native';

export default function UserScreen() {
  const loggedInUser = {
    allergies: 'biscuit',
    dateAdded: '2025-06-06T09:49:46.402Z',
    dietaryRequirements: 'biscuit',
    emailAddress: 'biscuit',
    householdID: null,
    name: 'biscuit',
    pantry: [],
    profilePicURL: '',
    username: 'biscuit',
    __v: 0,
    _id: '6842b9ba3572c18e80b05a1c',
  };
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl">User Profile Screen</Text>
    </View>
  );
}
