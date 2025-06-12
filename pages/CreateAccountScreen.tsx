import { View, Text } from "react-native";
import  CreateAccount from "components/CreateAccount";
import BackButton from "components/BackButton";


export default function CreateAccountScreen({onUserAdded}) {
  return (
    <View className="flex-1 bg-white">
      <BackButton />
      <CreateAccount onUserAdded={onUserAdded} />
    </View>
  );
}