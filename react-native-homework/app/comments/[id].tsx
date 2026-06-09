
import { Feather } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ComponentInput from "../../components/Comments/ComponentInput";
import { addComment } from "../../redux/posts/postOperation";
import { useState } from "react";
import DefaultAvatarIcon from '../../assets/IconSend.svg';



export default function CommentsScreen() {

const dispatch=useDispatch();
const { id } = useLocalSearchParams();
 const baseUrl = "http://192.168.0.135:3000/";
const posts = useSelector((state: any) => state.posts.items);
const post = posts.find((p) => p._id === id);

const userId = useSelector((state: any) => state.auth.id || state.auth.user?.id || state.auth.user?._id);

    const user = useSelector((state) => state.auth.user);

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
   Keyboard.dismiss();
  };




  return (
<KeyboardAvoidingView 
  style={{ flex: 1 }} 
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
>
   <View style={styles.container}>
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
  style={styles.postImage}
/> 

<FlatList
data={post?.comments ? post.comments.filter(c => c !== undefined && c !== null) : []}
  keyExtractor={(item, index) => item?._id ? item._id : index.toString()}
  style={{ flex: 1 }}
  renderItem={({ item }) => {
    const isMyComment = item.author?._id === userId;
    const avatarUri = item.author?.avatar 
  ? (item.author.avatar.startsWith('http') ? item.author.avatar : `${baseUrl}${item.author.avatar}`) 
  : null;
  if (!item || !item.author) return null;
    return (
      <View style={[styles.flatContainer, isMyComment && styles.myComment]}>
{avatarUri ? (
  <Image source={
    item.author?.avatar 
      ? { uri: `http://192.168.0.135:3000/${item.author.avatar}` } 
      : require('../../assets/IconSend.svg')
  }style={styles.userPhoto} />
) : (
  <DefaultAvatarIcon width={28} height={28} />
)}
  <Text style={styles.commentAuthor}>
 {item.author?.username ? item.author.username : "Анонім"}
</Text>

<View style={styles.commentWrapper}>
        <Text style={styles.commentText}>{item.text}</Text>
        <Text style={styles.commentDate}>
          {new Date(item.createdAt).toLocaleDateString("uk-UA", { day: 'numeric', month: 'long', year: 'numeric' })} | 
          {new Date(item.createdAt).toLocaleTimeString("uk-UA", { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
      </View>
   
    );
  }}
/>
<View style={{marginBottom:16}}>
<ComponentInput onSend={handleSend} />
</View>
    </View>

</KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
 flatContainer: {
    flexDirection: "row", // Аватарка і текст поруч
    marginBottom: 24,
    gap: 16, // Відступ між аватаркою і текстом
  },
  myComment: {
    flexDirection: "row-reverse", 
  },
  userPhoto: { 
    width: 28, 
    height: 28, 
    borderRadius: 14, 
    backgroundColor: "#E8E8E8",
  },
  userPhotoPlaceholder: { 
    width: 28, 
    height: 28, 
    borderRadius: 100, 
    backgroundColor: "#F6F6F6" 
  },
  commentWrapper: {
    flex: 1, // Текст займає весь вільний простір
    padding: 16,
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.03)", // Світло-сірий фон як у Figma
  },
  commentText: {
    fontSize: 13,
    color: "#212121",
    marginBottom: 8,
  },
  commentAuthor: {
    fontSize: 12,
    color: "#888",
  },
 commentDate: {
    fontSize: 10,
    color: "#BDBDBD",
    textAlign: "right", // Дата справа знизу
  },
   postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 32, // Більший відступ після картинки
  },
});