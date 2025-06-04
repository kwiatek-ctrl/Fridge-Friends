import { View, Image, SafeAreaView, Pressable } from 'react-native';
import { ShelfButton } from 'components/ShelfButton'; 

export function HomeScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-white relative">
      {/* Fridge shelves background */}
      <Image
        source={require('../assets/fridge-shelves.png')}
        className="absolute left-0 top-0 w-full h-full"
        style={{ zIndex: -1, opacity: 0.13 }}
        resizeMode="cover"
      />

      {/* Main content */}
      <View className="flex-1 w-full justify-center">
        <View className="items-center w-full pt-12 pb-28">
          <ShelfButton label="ADD ITEM" />
          <ShelfButton label="MY FOOD" />
          <ShelfButton label="FIND RECIPES" />
          <ShelfButton label="FIND FOOD" />
        </View>
      </View>

      {/* Bottom nav */}
      <View className="
        absolute left-0 right-0 bottom-0
        flex-row justify-between items-center
        w-full
        px-[100px] pb-[34px] z-10
      ">
        <Image
          source={require('../assets/inbox-icon.png')}
          style={{ width: 56, height: 56 }}
          resizeMode="contain"
        />
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Image
            source={require('../assets/tomato-icon.png')}
            style={{ width: 56, height: 56 }}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}