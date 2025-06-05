import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { addUser } from 'fetchData';
import BackButton from './BackButton';




export default function CreateAccount({onUserAdded}) {
  const [user, setUser] = useState({
    username: '',
    name: '',
    emailAddress: '',
    householdID: '',
    allergies: '',
    dietaryRequirements: '',
    
  });

  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };
  const handleSubmit = () => {
    
  
    
    addUser(user)
    
    .then((newUser)=>{
      console.log(newUser, "<----- new ");
      
        alert('Account has been successfully created !');
        if(onUserAdded){
          onUserAdded(newUser)
        }
        setUser({
          username: "",
          name: "",
          emailAddress: "",
         
          householdID: "",
          allergies: "",
          dietaryRequirements: "",
        })
       
        })
         .catch((err)=>{
          alert("Something went wrong while adding the user.")
          console.log(err)
    })

    alert('Account created successfully!');
 };
  

  return (
    <>
      <View className={styles.container}>
          <BackButton />
           <ScrollView className="flex-1 px-6 pt-20">
        <Image className={styles.logo} source={require('../assets/logo.png')} />
        <Text className={styles.title}>Create Account</Text>

        <Text className={styles.label}>User name</Text>
        <TextInput
          value={user.username}
          onChangeText={(text) => handleChange('username', text)}
          className={styles.input}
        />
        <Text className={styles.label}>Name</Text>
        <TextInput
          value={user.name}
          onChangeText={(text) => handleChange('name', text)}
          className={styles.input}
        />
        <Text className={styles.label}>Email Adress</Text>
        <TextInput
          value={user.emailAddress}
          onChangeText={(text) => handleChange('emailAddress', text)}
          className={styles.input}
          keyboardType="email-address"
        />
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

        <TouchableOpacity onPress={handleSubmit} className={styles.button}>
          <Text className={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
}

const styles = {
  container: 'p-4 bg-gray-100 rounded-lg m-4',
  title: 'text-2xl font-bold text-center text-gray-800 mb-4',
  input: 'border border-gray-300 rounded-lg p-2 mb-3 bg-white',
  button: 'bg-cyan-500 p-3 rounded-lg mt-4',
  buttonText: 'text-white text-center font-bold',
  logo: 'object-scale-down h-10 w-10 mx-auto mb-3',
  label: 'text-base font-bold mb-1 text-gray-800',
};
