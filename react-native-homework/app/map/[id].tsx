// import { router, useLocalSearchParams } from "expo-router";
// import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from "react-native";
// import { WebView } from "react-native-webview";

// export default function MapScreen() {
//   const { latitude, longitude } = useLocalSearchParams();
//   const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

//   return (
//     <View style={styles.container}>
//         <TouchableOpacity 
//         style={styles.backButton} 
//         onPress={() => router.back()}
//       >
//         <Text style={styles.backText}>← Назад</Text>
//       </TouchableOpacity>
//       <WebView 
//         source={{ uri: url }} 
//         startInLoadingState={true}
//         renderLoading={() => <ActivityIndicator style={styles.loader} />}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   loader: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 50,
//     left: 20,
//     zIndex: 10, 
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     padding: 10,
//     borderRadius: 8,
//   },
//   backText: { fontSize: 16, fontWeight: 'bold' }
// });

import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Feather } from "@expo/vector-icons";

import * as Location from "expo-location";
import { router, useLocalSearchParams, useRouter } from "expo-router";

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
        console.log("Permission to access location was denied");
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
    // <View style={styles.container}>
    //   <View style={styles.arrowLeft}>
    //     <TouchableOpacity
    //       style={styles.input}
    //       onPress={() => router.back()}
    //     >
    //       <Text style={[styles.inputText, { paddingLeft: 25 }]}>
    //         Локація поста
    //       </Text>
    //       <Feather name="arrow-left" size="24" style={styles.locationIcon} />
    //     </TouchableOpacity>
    //   </View>
    //  <MapView
    //     style={styles.mapStyle}
    //     region={{
    //       ...postLocation,
    //       latitudeDelta: 0.0922,
    //       longitudeDelta: 0.0421,
    //     }}
    //   >
    //     {location && (
    //       <Marker title="I am here" coordinate={location} description="Hello" />
    //     )}
    //   </MapView>
    // </View>
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()} // Тепер повертає точно назад
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
    // alignItems: "center",
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