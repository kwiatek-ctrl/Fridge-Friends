import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { HomeScreen } from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';

import RecipeFilterScreen from './pages/RecipeFilterScreen';
import RecipeResultScreen from './pages/RecipeResultScreen';
import InventoryScreen from './pages/InventoryScreen';
import AddItemScreen from './pages/AddItemScreen';
import UserScreen from './pages/UserScreen';

import './global.css';
import { UserProvider } from 'contexts/UserContext';
import CreateAccountScreen from 'pages/CreateAccountScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
          <Stack.Screen name="RecipeFilter" component={RecipeFilterScreen} />
          <Stack.Screen name="RecipeResult" component={RecipeResultScreen} />
          <Stack.Screen name="Inventory" component={InventoryScreen} />
          <Stack.Screen name="AddItem" component={AddItemScreen} />
          <Stack.Screen name="User" component={UserScreen} />
        </Stack.Navigator>
      <StatusBar style="auto" />
      </UserProvider>
    </NavigationContainer>
  );
}
