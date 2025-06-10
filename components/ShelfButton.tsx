import { View, Image, Pressable, Text } from 'react-native';

export function ShelfButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <View
      className="items-center w-full my-8"
      style={{
        height: 85,
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Shelf background image */}
      <Image
        source={require('../assets/shelf.png')}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
          resizeMode: 'stretch',
          zIndex: 0, 
        }}
      />

      {/* Green button */}
      <Pressable
        onPress={onPress}
        className="bg-[#0D4A59] rounded-full px-10 py-4 shadow-lg"

        style={{
          minWidth: 400,
          alignSelf: 'center',
          zIndex: 1, 
        }}
      >
        <Text className="text-white text-xl font-bold text-center">{label}</Text>
      </Pressable>
    </View>
  );
}