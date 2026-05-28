import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import BgImage from "../assets/images/BG.png";
import DeleteBtn from "../assets/images/delete.png";
import userPhoto from "../assets/images/user.png";

export default function ProfileScreen() {
  const handleLogOut = () => {
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Image source={BgImage} style={styles.img} />

      <View style={styles.userContainer}>
        <View style={{ position: "relative" }}>
          <Image source={userPhoto} alt="user" style={styles.userPhoto} />
          <Image source={DeleteBtn} style={styles.deleteplus} />
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
        <Text style={styles.username}>Natali Romanova</Text>
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
