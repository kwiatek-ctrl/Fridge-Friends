import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addItemToPantry } from '../fetchData';
import CustomSelectDropdown from './CustomSelectDropdown'; // asigură-te că path-ul e corect

const units = ['g', 'kg', 'ml', 'l', 'pcs', 'oz', 'lb', 'fl. oz', 'pints'];
const categories = [
  'Dairy, Eggs',
  'Meat, Fish, Seafood',
  'Fruit, Veg',
  'Snacks, Sweets',
  'Drinks',
  'Herbs, Spices, Condiments',
  'Bread, Bakery',
  'Tins, Jars',
  'Other',
];
const locations = ['fridge', 'freezer', 'cupboard'];

export default function AddItem() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState(units[0]);
  const [category, setCategory] = useState(categories[0]);
  const [location, setLocation] = useState(locations[0]);
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = async () => {
    const parsedQuantity = parseFloat(quantity);

    if (!name.trim()) {
      Alert.alert('Validation Error', 'Item name is required.');
      return;
    }

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid quantity greater than 0.');
      return;
    }

    const item = {
      name: name.trim(),
      quantity: parsedQuantity,
      unit,
      category,
      location,
      expiryDate: expiryDate.toISOString(),
    };

    try {
      const username = 'fridge1234'; // Replace later with dynamic user
      await addItemToPantry(username, item);
      Alert.alert('Success', 'Item successfully added to pantry!');
      setName('');
      setQuantity('');
      setUnit(units[0]);
      setCategory(categories[0]);
      setLocation(locations[0]);
      setExpiryDate(new Date());
    } catch (error) {
      if (error.response) {
        Alert.alert('Server Error', JSON.stringify(error.response.data));
      } else {
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formWrapper}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g. Milk"
        />

        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
          placeholder="e.g. 2"
        />

        <CustomSelectDropdown label="Unit" options={units} selected={unit} onSelect={setUnit} />
        <CustomSelectDropdown
          label="Category"
          options={categories}
          selected={category}
          onSelect={setCategory}
        />

        <Text style={styles.label}>Location</Text>
        <View style={styles.radioGroup}>
          {locations.map((loc) => (
            <Pressable
              key={loc}
              style={[styles.radioButton, location === loc && styles.radioSelected]}
              onPress={() => setLocation(loc)}
            >
              <Text style={location === loc ? styles.radioTextSelected : styles.radioText}>
                {loc}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Expiry Date</Text>
        <Pressable style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
          <Text>{expiryDate.toDateString()}</Text>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={expiryDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            onChange={(_, date) => {
              setShowDatePicker(false);
              if (date) setExpiryDate(date);
            }}
            minimumDate={new Date()}
          />
        )}

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  formWrapper: {
    paddingHorizontal: 12,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    gap: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1f2937',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: 'white',
    width: '100%',
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  radioButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  radioSelected: {
    backgroundColor: '#0D4A59',
    borderColor: '#7e22ce',
  },
  radioText: {
    color: 'black',
  },
  radioTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  dateButton: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#ccc',
    backgroundColor: 'white',
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#0D4A59',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    width: '100%',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
