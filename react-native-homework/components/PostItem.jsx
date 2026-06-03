import { Image, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

export const PostItem = ({ post }) => {
    console.log("ДАНІ ПОСТА:", post);
const baseUrl = "http://192.168.0.135:3000";
  

  const imageUrl = post.image
    ? `${baseUrl.replace(/\/$/, "")}/${post.image.replace(/^\//, "")}`
    : null;

  return (
    
    <View style={styles.postsContainer}>
        <Text style={styles.authorName}>
        {post.author ? post.author.username : "Анонім"}
      </Text>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      <Text style={styles.postTitle}>{post.title}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.comment}>
          <Feather name="message-circle" size={24} color="#BDBDBD" />
          <Text style={styles.commentCount}>0</Text>
        </View>
        <View style={styles.like}>
                       <Feather name="thumbs-up" size={24} color="#BDBDBD" />
                       <Text style={styles.likeCount}>0</Text>
                     </View>
                     <View style={styles.location}>
                       <Feather name="map-pin" size={24} color="#BDBDBD" />
                       <Text style={styles.locationName}>Україна</Text>
                     </View>
                   </View>
                 </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
 image: {
    width: "100%", // Переконайтеся, що це є
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 8,
  },
  location: {
    fontSize: 14,
    color: "#666",
  },
});
