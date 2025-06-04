import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Image} from 'react-native';



export default function CreateAccount() {

const [formData, setFormData] = useState({
  username: '',
  name: '',
  emailAddress: '',
  householdID: '',
  dietaryRequirements: '',
  allergies: '',
});

const handleChange = (field, value) => {
  setFormData({ ...formData, [field]: value });
};
const handleSubmit = () => {
  alert('Account created successfully!');
};
  

  return (
    <> 
     <View className={styles.container}>


         <Image className={styles.logo} source={require('../assets/logo.png')} />
      <Text className={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Username"
        value={formData.username}
        onChangeText={(text) => handleChange('username', text)}
        className={styles.input}
      />
      <TextInput
        placeholder="Full Name"
        value={formData.name}
        onChangeText={(text) => handleChange('name', text)}
        className={styles.input}
      />
      <TextInput
        placeholder="Email Address"
        value={formData.emailAddress}
        onChangeText={(text) => handleChange('emailAddress', text)}
        className={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Household ID (optional)"
        value={formData.householdID}
        onChangeText={(text) => handleChange('householdID', text)}
        className={styles.input}
      />
      <TextInput
        placeholder="Dietary Requirements (optional)"
        value={formData.dietaryRequirements}
        onChangeText={(text) => handleChange('dietaryRequirements', text)}
        className={styles.input}
      />
      <TextInput
        placeholder="Allergies (optional)"
        value={formData.allergies}
        onChangeText={(text) => handleChange('allergies', text)}
        className={styles.input}
      />

      <TouchableOpacity onPress={handleSubmit} className={styles.button}>
        <Text className={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
    </>
  )
}

 const styles = {
  container: "p-4 bg-gray-100 rounded-lg m-4",
  title: "text-2xl font-bold text-center text-gray-800 mb-4",
  input: "border border-gray-300 rounded-lg p-2 mb-3 bg-white",
  button: "bg-blue-500 p-3 rounded-lg mt-4",
  buttonText: "text-white text-center font-bold",
  logo: 'object-scale-down h-10 w-10 mx-auto mb-3',
};
