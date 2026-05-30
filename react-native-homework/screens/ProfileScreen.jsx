import { updateAvatar } from "@/redux/auth/authOperation";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BgImage from "../assets/images/BG.png";
import DeleteBtn from "../assets/images/delete.png";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [avatar, setAvatar] = useState(null);
  const baseUrl = "http://192.168.0.108:3000/";
  // Якщо локальний стан 'avatar' не null, показуємо його, інакше - фото з бекенду
  const displayAvatar = avatar
    ? avatar
    : user.avatar
      ? `${baseUrl}${user.avatar}`
      : null;

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
          const uri = result.assets[0].uri;
          setAvatar(uri);
          dispatch(updateAvatar(uri));
        }
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Image source={BgImage} style={styles.img} />
      <View style={styles.userContainer}>
        <View style={{ position: "relative" }}>
          <TouchableOpacity onPress={uploadPhoto}>
            <Image
              source={displayAvatar ? { uri: displayAvatar } : null} // Якщо немає аватара, просто не показуйте нічого
              alt="user"
              style={styles.userPhoto}
            />
            <Image source={DeleteBtn} style={styles.deleteplus} />
          </TouchableOpacity>
          <Pressable
            onPress={() => router.push("/(auth)/login")}
            style={styles.logOutBtn}
          >
            <Feather
              name="log-out"
              size={24}
              style={{ paddingRight: 10, color: "rgba(189, 189, 189, 1)" }}
            />
          </Pressable>
        </View>
        <Text style={styles.username}>{user.username}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  img: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  userContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: "100%",
    height: 549,
    marginTop: 149,
  },
  userPhoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
    position: "absolute",
    top: -68,
    left: 158,
    backgroundColor: "#F6F6F6",
  },
  deleteplus: {
    position: "absolute",
    right: 145,
    top: 22,
  },
  logOutBtn: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  username: {
    fontSize: 30,
    fontWeight: "500",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 92,
  },
});
