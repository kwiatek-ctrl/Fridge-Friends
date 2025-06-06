import { View, Text } from "react-native";
import  CreateAccount from "components/CreateAccount";

export default function CreateAccountScreen({onUserAdded}) {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      
      <CreateAccount onUserAdded={onUserAdded} />
    </View>
  );
}