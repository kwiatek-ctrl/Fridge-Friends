import { useState } from 'react'
import { Text, TextInput, View, Image } from 'react-native'
import BackButton from './BackButton'
import { resetPassword } from '../fetchData'

export const PasswordReset = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const handlePasswordReset = async () => {
    try {
        await resetPassword(emailRegex.test(email))
        setMessage('Password reset link sent to your email.')
    } catch (error) {
        setMessage('Error sending password reset link. Please try again.')
    }
    }
    return (
    <View className="flex-1 px-6 pt-20">
        <BackButton />
        <Image className="w-32 h-32 mx-auto" source={require('../assets/logo_transparent.png')} />
        <Text className="text-lg font-bold text-center mt-4">Reset Password</Text>
        <TextInput
        className="border border-gray-300 rounded p-2 mt-4"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        />
        <Text className="text-red-500 mt-2">{message}</Text>
        <Text
        className="bg-[#0D4A59] rounded-md py-3 w-full text-white text-center "
        onPress={handlePasswordReset}
        >
        Send Reset Link
        </Text>
    </View>
    )
}