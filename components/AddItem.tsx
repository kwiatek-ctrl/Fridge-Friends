import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  StyleSheet,
  Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const units = ['g', 'kg', 'ml', 'l', 'pieces'];
const categories = [
  'dairyEggs',
  'meatFishSeafood',
  'fruitVeg',
  'snacksSweets',
  'drinks',
  'herbsSpicesCondiments',
  'breadBakery',
  'tinsJars',
  'other',
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

  const handleSubmit = () => {
    const item = {
      name,
      quantity: Number(quantity),
      unit,
      category,
      location,
      expiryDate,
    };
    console.log('Item submitted:', item);
    alert('Item submitted!');
    setName('');
    setQuantity('');
    setUnit(units[0]);
    setCategory(categories[0]);
    setLocation(locations[0]);
    setExpiryDate(new Date());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />

      <Text style={styles.label}>Unit</Text>
      <Picker
        selectedValue={unit}
        onValueChange={setUnit}
        style={styles.picker}
      >
        {units.map((u) => (
          <Picker.Item key={u} label={u} value={u} />
        ))}
      </Picker>

      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={category}
        onValueChange={setCategory}
        style={styles.picker}
      >
        {categories.map((c) => (
          <Picker.Item key={c} label={c} value={c} />
        ))}
      </Picker>

      <Text style={styles.label}>Location</Text>
      <View style={styles.radioGroup}>
        {locations.map((loc) => (
          <Pressable
            key={loc}
            style={[
              styles.radioButton,
              location === loc && styles.radioSelected,
            ]}
            onPress={() => setLocation(loc)}
          >
            <Text style={location === loc ? styles.radioTextSelected : styles.radioText}>
              {loc}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Expiry Date</Text>

      <Pressable
       style={styles.dateButton}
       onPress={() => setShowDatePicker(true)}
       >
       <Text>{expiryDate.toDateString()}</Text>
        </Pressable>
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

      {showDatePicker && (
         <DateTimePicker
         value={expiryDate}
         mode="date"
    display={Platform.OS === 'ios' ? 'spinner' : 'default'}

    onChange={(_, date) => {
      setShowDatePicker(false);
      if (date) setExpiryDate(date);
    }}
  />
)}


      <View style={styles.submitContainer}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  picker: {
    backgroundColor: 'white',
    borderRadius: 6,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  radioButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ccc',
  },
  radioSelected: {
    backgroundColor: '#4ade80',
    borderColor: '#16a34a',
  },
  radioText: {
    color: 'black',
  },
  radioTextSelected: {
    color: 'white',
  },
  dateButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  submitContainer: {
    marginTop: 20,
  },
});
