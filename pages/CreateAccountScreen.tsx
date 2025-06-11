import { View, Text } from "react-native";
import  CreateAccount from "components/CreateAccount";

export default function CreateAccountScreen({onUserAdded}) {
  return (
    <View className="flex-1  bg-white">
       <Text className="text-2xl font-bold mb-6">Create Account</Text>
      <CreateAccount onUserAdded={onUserAdded} />
    </View>
  );
}