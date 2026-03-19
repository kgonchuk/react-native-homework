import { Image, StyleSheet, Text, View } from "react-native";
import userPhoto from "../assets/images/user.png"

export default function PostsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image source={userPhoto} alt="user" style={styles.userPhoto}/>
        <View>
 <Text style={styles.userName}>Natali Romanova</Text>
  <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
     
    </View>
  );
}


const styles=StyleSheet.create({
  container:{
paddingTop:32,
paddingLeft:16,
paddingRight:16,
  },
userContainer:{
 flexDirection:"row",
 alignItems:"center",
 gap:8

},
userPhoto:{
  width:60,
  height:60,
  borderRadius:16,
},
userName:{
  fontSize:13,
  fontWeight:700,
},
userEmail:{
    fontSize:11,
  fontWeight:400,
}
})