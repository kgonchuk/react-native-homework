import { Feather } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Tabs } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#212121CC",
        tabBarInactiveTintColor: "#212121CC",
        sceneStyle: { backgroundColor: "#fff" },
      }}
    >

      <Tabs.Screen
        name="posts"
        options={{
          title: "Публікації",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.replace("/login")}>
              <Feather
                name="log-out"
                size={24}
                style={{ paddingRight: 10, color: "rgba(189, 189, 189, 1)" }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Створити публікацію",
          tabBarIcon: () => (
            <View
              style={{
                width: 70,
                height: 40,
                backgroundColor: "#FF6C00",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 9,
              }}
            >
              <Ionicons name="add" size={24} color="#fff" />
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Feather
                name="arrow-left"
                size={24}
                style={{ paddingLeft: 16, color: "rgba(189, 189, 189, 1)" }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>

    
  );
}
