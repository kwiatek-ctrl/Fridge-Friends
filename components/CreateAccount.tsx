import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { addUser } from 'fetchData';
import BackButton from './BackButton';
import { useNavigation } from '@react-navigation/native';

export default function CreateAccount() {
  const [user, setUser] = useState({
    username: '',
    name: '',
    emailAddress: '',
    householdID: '',
    allergies: '',
    dietaryRequirements: '',
  });

  const navigation = useNavigation<any>();
  const [loggedInUser, setLoggedInUser] = useState({})

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
    setErrors({ ...errors, [field]: '' }); 
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!user.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (user.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    }

    if (!user.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!user.emailAddress.trim()) {
      newErrors.emailAddress = 'Email address is required';
    } else if (!emailRegex.test(user.emailAddress)) {
      newErrors.emailAddress = 'Invalid email format';
    }

    return newErrors;
  };



    const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    addUser(user)
      .then((newUser) => {

        setLoggedInUser(newUser)
        console.log(newUser)
        navigation.navigate('User')

        setErrors({});
        })

      .catch((err) => {
        setErrors({ general: 'Something went wrong. Please try again later.' });
        console.log(err);
      })
      .finally(() => setLoading(false));
  };


  return (
    <View className={styles.container}>
      <BackButton />
      <ScrollView className="flex-1 px-6 pt-20">
        <Image className={styles.logo} source={require('../assets/logo_transparent.png')} />
        <Text className={styles.title}>Create Account</Text>

        <Text className={styles.label}>Username</Text>
        <TextInput
          value={user.username}
          onChangeText={(text) => handleChange('username', text)}
          className={styles.input}
        />
        {errors.username && <Text className="text-red-500 mb-2">{errors.username}</Text>}

        <Text className={styles.label}>Name</Text>
        <TextInput
          value={user.name}
          onChangeText={(text) => handleChange('name', text)}
          className={styles.input}
        />
        {errors.name && <Text className="text-red-500 mb-2">{errors.name}</Text>}

        <Text className={styles.label}>Email Address</Text>
        <TextInput
          value={user.emailAddress}
          onChangeText={(text) => handleChange('emailAddress', text)}
          className={styles.input}
          keyboardType="email-address"
        />
        {errors.emailAddress && <Text className="text-red-500 mb-2">{errors.emailAddress}</Text>}

        <Text className={styles.label}>Dietary Requirements (optional)</Text>
        <TextInput
          value={user.dietaryRequirements}
          onChangeText={(text) => handleChange('dietaryRequirements', text)}
          className={styles.input}
        />

        <Text className={styles.label}>Allergies (optional)</Text>
        <TextInput
          value={user.allergies}
          onChangeText={(text) => handleChange('allergies', text)}
          className={styles.input}
        />

        {errors.general && <Text className="text-red-500 text-center mb-2">{errors.general}</Text>}

        <TouchableOpacity
          onPress={handleSubmit}
          className={styles.button}
          disabled={loading}
        >
          <Text className={styles.buttonText}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = {
  container: 'flex-1 bg-white ',
  title: 'text-2xl font-bold text-center text-gray-800 mb-6',
  logo: 'object-scale-down h-40 w-40 mx-auto mb-6',
  label: 'text-base font-bold text-gray-800',
  input: 'border border-gray-300 rounded-md p-2 bg-white w-full',
  inputGroup: 'mb-4',
  button: 'bg-[#0D4A59] py-3 rounded-md w-full mt-5',
  buttonText: 'text-white text-center font-bold text-base',
  errorText: 'text-red-500 text-sm mt-1',
};

