 import { View, Image, SafeAreaView, Pressable } from 'react-native';
import { ShelfButton } from 'components/ShelfButton';

export function HomeScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-white relative">
      {/* Fridge shelves background */}
      <Image
        source={require('../assets/fridge-shelves.png')}
        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-25 z-[-10]"
        resizeMode="cover"
      />

      {/* Main content */}
      <View className="flex-1 w-full justify-center items-center pt-12 pb-28">
        <ShelfButton label="ADD ITEM" onPress={() => navigation.navigate('AddItem')} />
        <ShelfButton label="MY FOOD" onPress={() => navigation.navigate('Inventory')} />
        <ShelfButton label="FIND RECIPES" onPress={() => navigation.navigate('RecipeFilter')} />
        <ShelfButton label="FIND FOOD" onPress={() => navigation.navigate('FindFood')} />
      </View>

      {/* Bottom nav */}
      <View className="absolute bottom-0 left-0 right-0 flex-row justify-between items-center px-16 pb-8 z-10 shadow-md">
        <Image
          source={require('../assets/inbox-icon.png')}
          style={{ width: 56, height: 56 }}
          resizeMode="contain"
        />
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Image
            source={require('../assets/apple-logo.png')}
            style={{ width: 56, height: 56 }}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}