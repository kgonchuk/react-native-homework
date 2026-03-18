
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { useState } from 'react';
import {useFonts} from 'expo-font';
import { Text } from 'react-native';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
const [isAuth, setIsAuth]=useState(false)
const [fontsLoaded] = useFonts({
  "Robor-Regular":require("../assets/fonts/Roboto-Regular.ttf"),
  "Robor-Bold":require("../assets/fonts/Roboto-Bold.ttf"),
  "Robor-Medium":require("../assets/fonts/Roboto-Medium.ttf"),
})
if(!fontsLoaded){
  return(
    <Text> Loaded...</Text>
  )
}
  return (
   <Stack>
{!isAuth ? (<Stack.Screen name='auth'/>
) : (<Stack.Screen name='tabs'/>) }
   </Stack>
  );
}
