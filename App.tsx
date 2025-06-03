import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';

import './global.css';
import { Route, NativeRouter, Routes } from 'react-router-native';
import Home from 'components/Home';

export default function App() {
  return (
    <>
      <NativeRouter>
        <StatusBar style="auto" />
        <Routes>
          <Route
            path="/"
            element={<ScreenContent title="Sign in to Fridge Friends" path="App.tsx" />}
          />
          <Route path="/home" element={<Home />} />
        </Routes>
      </NativeRouter>
    </>
  );
}
