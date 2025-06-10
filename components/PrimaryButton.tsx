import { Pressable, Text, Platform, StyleSheet } from 'react-native';

export default function PrimaryButton({ title, onPress, className = '' }) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: '#0D4A59' }}
      className={`bg-[#125E70] active:bg-[#0D4A59] py-3 px-4 rounded-xl ${className}`}
      style={[styles.shadow]}
    >
      <Text className="text-white text-center font-bold text-base">{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});
