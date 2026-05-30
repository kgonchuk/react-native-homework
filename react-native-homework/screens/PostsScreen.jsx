import { Feather } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function PostsScreen() {
  const user = useSelector((state) => state.auth.user);
  const baseUrl = "http://192.168.0.108:3000/";
  const avatarUrl = user.avatar ? `${baseUrl}${user.avatar}` : null;

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={{ uri: avatarUrl }}
          alt="user"
          style={styles.userPhoto}
        />
        <View>
          <Text style={styles.userName}>{user.username}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>
      <View style={styles.postsContainer}>
        <Image
          source={require("../assets/images/post1.png")}
          alt="post"
          style={styles.postImage}
        />
        <Text style={styles.postTitle}>Ліс</Text>
        <View style={styles.comment}>
          <Feather name="message-circle" size={24} color="#FF6C00" />
          <Text style={styles.commentCount}>0</Text>
        </View>
        <View style={styles.location}>
          <Feather name="map-pin" size={24} color="#FF6C00" />
          <Text style={styles.locationName}>Україна</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userName: {
    fontSize: 13,
    fontWeight: 700,
  },
  userEmail: {
    fontSize: 11,
    fontWeight: 400,
  },
});
