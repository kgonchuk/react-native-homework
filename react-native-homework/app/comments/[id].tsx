
import { Feather } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ComponentInput from "../../components/Comments/ComponentInput";
import { addComment } from "../../redux/posts/postOperation";



export default function CommentsScreen() {

const dispatch=useDispatch();
const { id } = useLocalSearchParams();
 const baseUrl = "http://192.168.0.135:3000/";
const posts = useSelector((state: any) => state.posts.items);
const post = posts.find((p) => p._id === id);

const authState = useSelector((state: any) => state.auth);
console.log("ПОВНИЙ СТЕЙТ AUTH:", authState);
const userId = useSelector((state: any) => state.auth.id || state.auth.user?.id || state.auth.user?._id);

const imageUrl = post?.image
    ? `${baseUrl.replace(/\/$/, "")}/${post.image.replace(/^\//, "")}`
    : null;

// @ts-ignore
const handleSend = (text) => {
    if (!userId) {
     console.log("ПОМИЛКА: userId не знайдено в Redux!");
     return; 
   }
   dispatch(addComment({ postId: id, commentText: text, userId }));
  };




  return (
   <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen 
  options={{
    headerShown: true,
    title: "Коментарі",
    headerTitleAlign: "center",
  headerLeft: () => (
      <TouchableOpacity 
        onPress={() => router.back()} 
        style={{ paddingLeft: 10 }}
      >
        <Feather name="arrow-left" size={24} color="#212121" />
      </TouchableOpacity>
    ),
     }} 
/>
<Image
  source={{ uri: imageUrl }}
  style={{ width: "100%", height: 200 }}
/>      
 <Text>ID поста: {id}</Text>

<FlatList
 data={post?.comments.filter(c => c !== null && c !== undefined) || []}
  keyExtractor={(item, index) => (item?._id ? item._id : index.toString()) }
  renderItem={({ item }) => {
   const date = new Date(item.createdAt).toLocaleDateString("uk-UA", {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const time = new Date(item.createdAt).toLocaleTimeString("uk-UA", {
      hour: '2-digit',
      minute: '2-digit',
    });
    return (
      <View style={{ padding: 10 }}>
       <Text style={styles.commentAuthor}>
 {item.author?.username ? item.author.username : "Анонім"}
</Text>
        <Text style={styles.commentText}>{item.text}</Text>
        <Text style={styles.commentDate}>{date} | {time}</Text>

      </View>
    );
  }}
/>
<ComponentInput onSend={handleSend} />
    </View>


  );
}

const styles = StyleSheet.create({
  commentText: {
    fontSize: 14,
    marginBottom: 5,
    borderBottomColor: "#eee",
  },
  commentAuthor: {
    fontSize: 12,
    color: "#888",
  },
  commentDate: {
    fontSize: 12,
    color: "#888",
  },
});