import { View, Text, ScrollView, Image } from 'react-native';
import BackButton from 'components/BackButton';

export default function UserScreen() {
  const loggedInUser = {
    allergies: 'pinuts',
    dateAdded: '2025-06-06T09:49:46.402Z',
    dietaryRequirements: 'biscuit',
    emailAddress: 'biscuit@gmail.com',
    householdID: null,
    name: 'Jason',
    pantry: [],
    profilePicURL: '',
    username: 'Biscuit',
    __v: 0,
    _id: '6842b9ba3572c18e80b05a1c',
  };
  return (
    
    <ScrollView className="flex-1 bg-gray-100 p-6">
       
      <View className="mx-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow">
       <BackButton />
        {/* Profile Picture */}
        <Image className={styles.appleLogo} source={require('../assets/apple-logo.png')} />
        {/* {loggedInUser.profilePicURL ? (
          <Image
            source={{ uri: loggedInUser.profilePicURL }}
            className="w-32 h-32 rounded-full mx-auto mb-6"
          />
        ) : (
          <View className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-6 flex items-center justify-center">
            <Text className="text-gray-500 text-6xl">👤</Text>
          </View>
        )} */}

        {/* Username */}
        <Text className="mb-4 text-center text-3xl font-bold">Hello, {loggedInUser.username}!</Text>

        {/* Name */}
        <Text className="mb-6 text-center text-xl">{loggedInUser.name}</Text>

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
const styles = {
  appleLogo: 'object-scale-down h-40 w-40 mx-auto mb-4 ',
};
