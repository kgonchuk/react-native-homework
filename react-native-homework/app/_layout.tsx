
import { Stack } from "expo-router";
import { Provider, useSelector } from "react-redux";
import { useFonts } from "expo-font";
import { Text } from "react-native";
import { persistor, RootState, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <RootLayoutContent />
      </PersistGate>
    </Provider>
  );
}


function RootLayoutContent() {

  const isLoggedIn = useSelector((state: RootState) => state.auth?.isLoggedIn) ?? false;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
  );
}