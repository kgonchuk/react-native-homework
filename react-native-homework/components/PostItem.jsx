import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { toggleLikeThunk } from "@/redux/posts/postOperation";

export const PostItem = ({ post }) => {
const dispatch=useDispatch();
const userId = useSelector((state) => state.auth.id || state.auth.user?.id || state.auth.user?._id);
const baseUrl = "https://react-native-homework-backend.onrender.com";
const likes = post.likes || [];

const handleLike = () => {
    dispatch(toggleLikeThunk({ postId: post._id }));
  };

  const imageUrl = post.image
    ? `${baseUrl.replace(/\/$/, "")}/${post.image.replace(/^\//, "")}`
    : null;
    
  return (
    
    <View style={styles.postsContainer}>
       
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
            
    <Text style={styles.authorName}>
        {post.author ? post.author.username : "Анонім"}
      </Text>
      <View style={styles.infowrapper}>
        <Text style={styles.postTitle}>{post.title}</Text>
        
        <View >
            <TouchableOpacity   onPress={() => router.push(`/comments/${post._id}`)} style={styles.comment} >
              <Feather name="message-circle" size={24} color="#BDBDBD" />
              <Text style={styles.commentCount}>{post.comments ? post.comments.length : 0}</Text>
            </TouchableOpacity>
        </View>

        <View >
            <TouchableOpacity onPress={handleLike} style={styles.like} >
              <Feather name="thumbs-up" size={24} color={likes?.includes(userId) ? "#FF6C00" : "#BDBDBD"} />
              <Text style={styles.likeCount}>{likes.length}</Text>
            </TouchableOpacity>
         </View>
                     
            <TouchableOpacity style={styles.locationWrapper} 
    onPress={() => router.push({
    pathname: '/map/[postId]',
    params: { 
      id: post.location.id,
      latitude: post.location.latitude, 
      longitude: post.location.longitude,
      title: post.location.name 
    }
  })}>
            <Feather name="map-pin" size={24} color="#BDBDBD" />
           <Text style={styles.locationName}>
  {post.location?.name || "Невідома локація"}
</Text>
            </TouchableOpacity>

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
    width: "100%", 
    height: 200,
    borderRadius: 8,
    marginTop: 32,
  },
  infowrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
        alignItems: "center",
    marginTop: 8,
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
  authorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,

  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  commentCount: {
    fontSize: 16,
    fontWeight: 400,
    color: "#BDBDBD",
  },
  like: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  likeCount: {
    fontSize: 16,
    fontWeight: 400,
    color: "#BDBDBD",
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
   locationName: {
    fontSize: 16,
    fontWeight: 400,
    color: "#BDBDBD",
    textDecorationLine: "underline",
   },   
});
