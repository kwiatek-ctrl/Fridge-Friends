import { View, Text, Switch, Pressable, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import IngredientsDropdown from '../components/IngredientsDropdown';
import CookTimeDropdown from '../components/CookTimeDropdown';
import DietaryFilterDropdown from '../components/DietaryFilterDropdown';
import { fetchUserPantry, getRecipes } from '../fetchData';


export default function RecipeFilterScreen({ navigation }) {
  const [onlyInventoryText, setOnlyInventoryText] = useState('Using these available ingredients');
  const [inventoryOnly, setInventoryOnly] = useState(true);
  const [pantryItems, setPantryItems] = useState([]);
  const [selectedCookTimes, setSelectedCookTimes] = useState('< 1 hr');
  const [selectedDietaryFilters, setSelectedDietaryFilters] = useState<string[]>([]);

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const getIngredients = async () => {
      try {
        const data = await fetchUserPantry('lettuce-eat', null, null);
        setPantryItems(data);
        setSelectedIngredients(data.map((item)=>item.name));
      } catch (error) {
        console.error('Error fetching pantry items:', error);
      }
    };
    getIngredients();
  }, []);

if (loading) {
  return (<View className="flex-1 justify-center items-center bg-white">
    <Image source={require('../assets/loading2.gif')}
  style={{width:560, height:560}}
  resizeMode="contain"/>
  </View>)}
  

  return (
    <View className="flex-1 bg-white relative">
      <BackButton />
      <ScrollView className="flex-1 px-6 pt-20">
        <Text className="text-2xl font-bold mb-4">Find Recipes</Text>

        {/* Ingredients Dropdown */}
        <IngredientsDropdown
       ingredients={pantryItems}
        selected={selectedIngredients}
        onChange={setSelectedIngredients}
/>

        {/* Cook Time Dropdown */}
        <CookTimeDropdown selected={selectedCookTimes} onSelect={setSelectedCookTimes}/>

        {/* Dietary Filter Dropdown */}
        <DietaryFilterDropdown
       selected={selectedDietaryFilters}
      onSelect={setSelectedDietaryFilters}
        />

        {/* Inventory Only Toggle */}
        <View className="items-center mb-6">
          <Text className="text-lg font-semibold mb-2">Inventory only</Text>
          <Switch value={inventoryOnly} onValueChange={(val) => {
            setInventoryOnly(val);
            if (val) { setOnlyInventoryText('Using these available ingredients')}
            else { setOnlyInventoryText('Using these available ingredients and optionally others - mark extra ingredients with (extra) in the ingredients list')}
          }} />
        </View>

        {/* Generate Button */}
              <Pressable
  onPress={() => {(async () => {setLoading(true); try {const response = await 
   getRecipes({ingredients: selectedIngredients, allergies: '', 
    dietaryRequirements: selectedDietaryFilters, 
    cookingTime: selectedCookTimes, onlyInventory: onlyInventoryText })
   
    
    navigation.navigate('RecipeResult', {recipes: response.recipes})
   }finally {setLoading(false)}})();

    
  }}
  className="bg-[#0D4A59] py-3 rounded-lg mb-10"
>
  <Text className="text-white text-center text-lg font-bold">Generate</Text>
</Pressable>



      </ScrollView>
    </View>
  );
}