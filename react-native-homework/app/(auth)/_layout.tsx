import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: "Увійти",
        }}
      />

      <Stack.Screen
        name="registration"
        options={{
          title: "Реєстрація",
        }}
      />
    </Stack>
  );
}
