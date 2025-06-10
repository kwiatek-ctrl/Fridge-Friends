import { View, Image, SafeAreaView, Pressable } from 'react-native';
import { ShelfButton } from 'components/ShelfButton';

export function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', position: 'relative' }}>
      {/* Fridge shelves background */}
      <Image
        source={require('../assets/fridge-shelves.png')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          zIndex: -2,
          opacity: 0.25,
        }}
        resizeMode="cover"
      />

      {/* Main content */}
      <View style={{ flex: 1, width: '100%', justifyContent: 'center' }}>
        <View style={{ alignItems: 'center', width: '100%', paddingTop: 48, paddingBottom: 112 }}>
         <ShelfButton label="ADD ITEM" onPress={() => navigation.navigate('AddItem')} />
          <ShelfButton label="MY FOOD"onPress={() => navigation.navigate('Inventory')}/>
          <ShelfButton label="FIND RECIPES" onPress={() => navigation.navigate('RecipeFilter')} />
          <ShelfButton label="FIND FOOD" onPress={() => navigation.navigate('FindFood')} />
        </View>
      </View>

      {/* Bottom nav */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: 100,
          paddingBottom: 34,
          zIndex: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
         elevation: 5,
        }}
      >
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
