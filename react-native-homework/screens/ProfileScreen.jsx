import { updateAvatar } from "@/redux/auth/authOperation";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
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
import { selectPostsByAuthor } from "../redux/posts/postSelector";
import { PostItem } from "@/components/PostItem";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [avatar, setAvatar] = useState(null);
  const baseUrl = "http://192.168.0.135:3000/";


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

const myPosts = useSelector((state) => selectPostsByAuthor(state, user._id || user.id));

  return (

    <View style={styles.container}>
      <Image source={BgImage} style={styles.img} />
      <FlatList
       data={myPosts}
        keyExtractor={(item) => item._id}
      style={styles.list} 
  contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <View style={styles.headerBackground}>
      <View style={styles.avatarWrapper}>
        <TouchableOpacity onPress={uploadPhoto}>
          {displayAvatar ? (
            <Image source={{ uri: displayAvatar }} style={styles.userPhoto} />
          ) : (
            <View style={styles.userPhotoPlaceholder} />
          )}
          <Image source={DeleteBtn} style={styles.deleteplus} />
        </TouchableOpacity>
      </View>

      <Pressable onPress={() => router.push("/(auth)/login")} style={styles.logOutBtn}>
        <Feather name="log-out" size={24} color="#BDBDBD" />
      </Pressable>

      <Text style={styles.username}>{user.username}</Text>
      </View>
    </View>
        }
        renderItem={({ item }) => {
          return (

            <View style={styles.postContainer}>
             <PostItem post={item} />

             </View>
        
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    
  },
 img: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
list: {
flex: 1,
    overflow: "visible",
  },
  listContent: {
    backgroundColor: "#FFFFFF", 
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 150, 
    minHeight: '100%', 
     paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  headerContainer: {
    overflow: "visible",
  },
  headerBackground: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    paddingBottom: 20,
    
  },
  avatarWrapper: {
   width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    marginTop: -60, 
    zIndex: 10,
  },
 userContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32, 
    alignItems: "center",
    overflow: 'visible',
  },
  avatarFixedWrapper: {

    top: 149 - 60, 
    alignSelf: 'center', 
    width: 120,
    height: 120,
    zIndex: 999, 
    elevation: 10, 
  },
 userPhoto: {
width: 120, 
height: 120, 
borderRadius: 16 
},
  userPhotoPlaceholder: { 
  width: 120, 
  height: 120, 
  borderRadius: 16, 
  backgroundColor: "#F6F6F6" 
},
 deleteplus: {  
  marginTop: -40,
  alignSelf: 'flex-end',
  marginRight: -5,
  bottom: 10, 
  right: -12 
},
  logOutBtn: { 
   marginTop: -40,
  alignSelf: 'flex-end',
    marginRight: 20,
  top: 16, 
  right: 16 
},
  username: {
    fontSize: 30,
    fontWeight: "500",
    marginTop: 20, 
  },
  userInfo: {
    alignItems: "center",
    gap: 8,
  },
  userEmail: {
    fontSize: 16,
    fontWeight: "400",
    color: "#BDBDBD",
  },
   postsContainer: {
    marginTop: 32,
      paddingHorizontal: 16,
      backgroundColor: "#FFFFFF",
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
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    
  },
  locationName: {
    fontSize: 16,
    fontWeight: 500,
    textDecorationLine: "underline",
  },
  postContainer:{

  }
});