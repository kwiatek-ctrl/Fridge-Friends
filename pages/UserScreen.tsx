import { View, Text, ScrollView, Image } from 'react-native';

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
   
      <ScrollView className="flex-1 bg-gray-100 p-6">
      <View className="bg-white rounded-2xl shadow p-6 max-w-lg mx-auto w-full">
        {/* Profile Picture */}
        {loggedInUser.profilePicURL ? (
          <Image
            source={{ uri: loggedInUser.profilePicURL }}
            className="w-32 h-32 rounded-full mx-auto mb-6"
          />
        ) : (
          <View className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-6 flex items-center justify-center">
            <Text className="text-gray-500 text-6xl">👤</Text>
          </View>
        )}

        {/* Username */}
        <Text className="text-3xl font-bold text-center mb-4">
          {loggedInUser.username}
        </Text>

        {/* Name */}
        <Text className="text-xl text-center mb-6">{loggedInUser.name}</Text>

        {/* Details */}
        <View className="space-y-4">
          <Text className="text-gray-700">
            <Text className="font-semibold">Email: </Text>
            {loggedInUser.emailAddress}
          </Text>

          <Text className="text-gray-700">
            <Text className="font-semibold">Allergies: </Text>
            {loggedInUser.allergies}
          </Text>

          <Text className="text-gray-700">
            <Text className="font-semibold">Dietary Requirements: </Text>
            {loggedInUser.dietaryRequirements}
          </Text>

          <Text className="text-gray-700">
            <Text className="font-semibold">Date Added: </Text>
            {new Date(loggedInUser.dateAdded).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
