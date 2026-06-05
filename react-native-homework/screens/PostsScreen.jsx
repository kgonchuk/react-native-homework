import { fetchPosts } from "@/redux/posts/postOperation";
import { Feather } from "@expo/vector-icons";
import { useEffect } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { PostItem } from "../components/PostItem";
import { selectAllPosts } from "@/redux/posts/postSelector";

export default function PostsScreen() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  console.log("ПОСТІВ У STATE:", posts);
  const user = useSelector((state) => state.auth.user);
  const baseUrl = "http://192.168.0.135:3000/";
  const avatarUrl = user.avatar ? `${baseUrl}${user.avatar}` : null;
  const token = useSelector((state) => state.auth.accessToken);
  const allPosts = useSelector(selectAllPosts)


  
  useEffect(() => {
    console.log("ТОКЕН ДЛЯ FETCH:", token); 
    dispatch(fetchPosts(token)).then((result) => {
      console.log("ПОСТ З АВТОРОМ:", JSON.stringify(result.payload, null, 2));
    });
  }, [dispatch, token]);

const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path; 
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
  };
  return (


    <View style={styles.container}>
      <FlatList
  data={allPosts}
  keyExtractor={(item) => item._id}
  contentContainerStyle={{ paddingBottom: 20 }} 
  
  ListHeaderComponent={
    <View style={styles.headerContainer}>
      <View style={styles.userContainer}>
        <Image source={{ uri: avatarUrl }} style={styles.userPhoto} />
        <View>
          <Text style={styles.userName}>{user.username}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>
    </View>
  }

 renderItem={({ item }) => {
    return (
      <>

        <PostItem post={item} />
      </>
    );
  }}
/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,

  },
  headerContainer: {
    marginBottom: 32,
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
  postsContainer: {
    marginTop: 32,
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 8,
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
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 500,
  },
});

