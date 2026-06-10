
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Feather } from "@expo/vector-icons";

import * as Location from "expo-location";
import {useLocalSearchParams, useRouter } from "expo-router";

export default function MapScreen() {
    const router = useRouter();
  const [location, setLocation] = useState(null);
  const { latitude, longitude } = useLocalSearchParams();

  

  const postLocation = {
    latitude: parseFloat(latitude) || 50.4501, // Київ за замовчуванням
    longitude: parseFloat(longitude) || 30.5234,
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
Alert.alert("Permission to access location was denied")
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()} 
      >
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <MapView
        style={styles.mapStyle}
        region={{
          ...postLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={postLocation} title="Локація поста" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    display: "flex",
  },
  mapStyle: {
    width: "100%",
    height: "80%",
  },
  backButton: {},

  input: {
    width: 343,
    paddingBottom: 16,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(232, 232, 232, 1)",
  },
  inputText: {
    paddingTop: 11,
    margin: "auto",
    size: 17,
    color: "rgba(33, 33, 33, 1)",
    fontWeight: 500,
    fontFamily: "Roboto-Medium",
    lineHeight: 22,
    letterSpacing: -0.22,
  },
  locationIcon: {
    width: 24,
    position: "absolute",
    bottom: 15,
    color: "rgba(189, 189, 189, 1)",

  },
});