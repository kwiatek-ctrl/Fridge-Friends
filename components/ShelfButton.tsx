import { View, Pressable, Text } from 'react-native';

export function ShelfButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <View
      style={{
        alignItems: 'center',
        width: '100%',
        marginVertical: 16,
      }}
    >
      <Pressable
        onPress={onPress}
        style={{
          backgroundColor: '#0D4A59',
          paddingVertical: 16,
          paddingHorizontal: 32,
          borderRadius: 999,
          elevation: 3,
          width: '90%',
          maxWidth: 360,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {label}
        </Text>
      </Pressable>
    </View>
  );
}
