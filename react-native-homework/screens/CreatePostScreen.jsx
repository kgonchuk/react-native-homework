import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux"; // <-- ЦЕ ОБОВ'ЯЗКОВО
import CreatePosts from "../components/CreatePosts";
import { createPost } from "../redux/posts/postOperation";
import { router, useFocusEffect } from "expo-router";

export default function CreatePostScreen() {
  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");

  const [place, setPlace] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    setShowCamera(true);
  }, []);

  // const getLocation = async () => {
  //   const { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== "granted") {
  //     alert("Немає доступу до геолокації");
  //     return;
  //   }
  //   const loc = await Location.getCurrentPositionAsync({});

  //   if (location && location.coords) {
  //     return {
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //     };
  //   }
  //   setLocation(loc.coords);
  //   const addr = await Location.reverseGeocodeAsync(loc.coords);
  //   if (addr.length > 0) {
  //     const placeName = `${addr[0].city || ""}, ${addr[0].country || ""}`;
  //     setAddress(placeName);
  //     setPlace(placeName); 
  //   }
  //    return {
  //   latitude: location.coords.latitude,
  //   longitude: location.coords.longitude,
  // };
  // };
   
// const getLocation = async (placeName) => {
//   try {
//     // 1. Якщо користувач ввів назву міста
//     if (placeName && placeName.trim() !== "") {
//       const geoResult = await Location.geocodeAsync(placeName);
      
//       if (geoResult.length > 0) {
//         return {
//           latitude: geoResult[0].latitude,
//           longitude: geoResult[0].longitude,
//         };
//       } else {
//         // Якщо місто не знайдено, можна видати алерт або повернути 0,0
//         console.log("Місто не знайдено, використовуємо GPS");
//       }
//     }

//     // 2. Якщо користувач нічого не ввів або місто не знайшлось -> GPS
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") return { latitude: 0, longitude: 0 };

//     const location = await Location.getCurrentPositionAsync({});
//     return {
//       latitude: location.coords.latitude,
//       longitude: location.coords.longitude,
//     };
//   } catch (error) {
//     console.error("Помилка отримання локації:", error);
//     return { latitude: 0, longitude: 0 };
//   }
// };


const getLocation = async (placeName) => {
  try {
    // 1. Якщо користувач ВЖЕ ввів назву (ручний ввід)
    if (placeName && placeName.trim() !== "") {
      const geoResult = await Location.geocodeAsync(placeName);
      if (geoResult.length > 0) {
        return {
          latitude: geoResult[0].latitude,
          longitude: geoResult[0].longitude,
        };
      }
    }

    // 2. Якщо це GPS (автоматичний режим)
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return { latitude: 0, longitude: 0 };

    const location = await Location.getCurrentPositionAsync({});
    
    // ДОДАЄМО: Зворотне геокодування, щоб отримати назву міста
    const addr = await Location.reverseGeocodeAsync(location.coords);
    if (addr.length > 0) {
      const newPlaceName = `${addr[0].city || ""}, ${addr[0].country || ""}`;
      setPlace(newPlaceName); // Оновлюємо стан інпуту
    }

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error("Помилка:", error);
    return { latitude: 0, longitude: 0 };
  }
};
  const handleTakePhoto = (uri) => {
    setPhoto(uri);
    setShowCamera(false);
    getLocation();
  };

  const uploadPhoto = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === "granted") {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
          setPhoto(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      Alert.alert("Помилка", "Додайте назву!");
      return;
    }
    if (!photo) {
      Alert.alert("Помилка", "Додайте фото!");
      return;
    }
   
const coords = await getLocation(place);
    const postData = {
      title,
    place: place || "Невідома локація",
    latitude: coords.latitude,
    longitude: coords.longitude,
      photo,
      token,
    };

    dispatch(createPost(postData));
      Alert.alert("Успіх", "Пост успішно створено!");
      handleClearForm();
      router.push("/posts");
  };

useFocusEffect(
  useCallback(() => {
    setShowCamera(true);
    setPhoto(null); 
    setTitle("");
    setPlace("");
    return () => {
    };
  }, [])
);

  const handleClearForm = () => {
    setName("");
    setPlace("");
    setPhoto(null);
    setLocation(null);
    setAddress(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          {showCamera ? (
            <CreatePosts onTakePhoto={handleTakePhoto} />
          ) : (
            <>
              {photo && (
                <Image
                  source={{ uri: photo }}
                  style={{ width: "100%", height: "100%", borderRadius: 8 }}
                />
              )}
            </>
          )}
        </View>

        {photo && (
          <TouchableOpacity onPress={() => setPhoto(null)}>
            <Text style={{ color: "red", marginTop: 8 }}>Видалити фото</Text>
          </TouchableOpacity>
        )}

        <View style={styles.inputWrap}>
          {!photo && (
            <TouchableOpacity onPress={uploadPhoto} style={styles.uploadPhoto}>
              <Text style={styles.photoText}>Завантажте фото</Text>
            </TouchableOpacity>
          )}
          <TextInput
            placeholder="Назва..."
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={styles.input}
          />

          {/* Локація */}
          <View style={styles.locationWrap}>
            <Pressable onPress={() => getLocation(place)}>
              <Feather name="map-pin" size={20} color="#BDBDBD" />
            </Pressable>
            <TextInput
              placeholder="Місцевість..."
              value={place}
              onChangeText={setPlace}
              style={styles.inputPlace}
            />
          </View>
        </View>
        <Pressable
          onPress={handlePublish}
          style={styles.loadButtonactive}
        >
          <Text style={styles.btnText}>Опубліковати</Text>
        </Pressable>

        <Pressable style={styles.trashBtn} onPress={handleClearForm}>
          <Feather name="trash-2" size="24" color="rgba(189, 189, 189, 1)" />
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  photoContainer: {
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    position: "relative",
    marginBottom: 8,
  },
  photoBtnWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF4D",
    position: "absolute",
    top: "40%",
    left: "40%",
    padding: 20,
  },
  uploadPhoto: {},
  photoText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#BDBDBD",
  },
  inputWrap: {
    marginTop: 32,
    gap: 16,
  },
  input: {
    fontSize: 16,
    fontWeight: "400",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    paddingVertical: 16,
  },
  inputPlace: {
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
    paddingVertical: 16,
    marginLeft: 8,
  },
  locationIcon: {},
  loadButtonDisabled: {
    width: "100%",
    padding: 16,
    backgroundColor: "#F6F6F6",
    color: "#BDBDBD",
    borderRadius: 100,
    alignItems: "center",
    marginTop: 32,
    zIndex: 999,
    elevation: 10,
  },
  loadButtonactive: {
    width: "100%",
    padding: 16,
    backgroundColor: "#FF6C00",

    borderRadius: 100,
    alignItems: "center",
    marginTop: 32,
    zIndex: 999,
    elevation: 10,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#FFFFFF",
  },
  btnTextDisabled: {
    color: "#BDBDBD",
  },
  trashBtn: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    alignItems: "center",
    padding: 8,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 120,
  },
  locationWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
  },
});
