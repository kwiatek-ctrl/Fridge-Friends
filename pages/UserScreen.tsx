
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import BackButton from 'components/BackButton';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation<any>();

  const handleEditprofile = () => {
    navigation.navigate('EditProfile', { userData: loggedInUser });
  };
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="min-h-screen flex-1 items-center justify-center px-4 py-8">
        <View className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
          <BackButton />

          <View className="mb-6 items-center">
            <Image className={styles.appleLogo} source={require('../assets/apple-logo.png')} />
          </View>
          <View className="relative">
            <TouchableOpacity
              className="absolute right-0 top-0 z-10 rounded-full bg-purple-600 p-2"
              onPress={handleEditprofile}>
              <Text className="text-xs font-bold text-white">Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Username */}

          <Text className="mb-2 text-center text-3xl font-extrabold text-blue-700">
            Hello, {loggedInUser.username}!
          </Text>

          {/* Name */}
          <Text className="mb-6 text-center text-lg text-gray-700">{loggedInUser.name}</Text>

          {/* Details */}
          <View className="space-y-3">
            <View className="mb-2 flex-row items-center">
              <Text className="w-32 font-semibold text-gray-500">Email:</Text>
              <Text className="flex-1 text-gray-800">{loggedInUser.emailAddress || '-'}</Text>
            </View>
            <View className="mb-2 flex-row items-center">
              <Text className="w-32 font-semibold text-gray-500">Allergies:</Text>
              <Text className="flex-1 text-gray-800">{loggedInUser.allergies || '-'}</Text>
            </View>
            <View className="mb-2 flex-row items-center">
              <Text className="w-32 font-semibold text-gray-500">Dietary:</Text>
              <Text className="flex-1 text-gray-800">
                {loggedInUser.dietaryRequirements || '-'}
              </Text>
            </View>
            <View className="mb-2 flex-row items-center">
              <Text className="w-32 font-semibold text-gray-500">Date Added:</Text>
              <Text className="flex-1 text-gray-800">
                {new Date(loggedInUser.dateAdded).toLocaleDateString()}
              </Text>
            </View>
            <TouchableOpacity className="ml-0 mt-2 w-auto rounded bg-purple-600 px-2 py-0.5">
              <Text className="text-center text-xs font-bold text-white">Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = {
  appleLogo: 'object-scale-down h-40 w-40 mx-auto mb-4 ',
};
