import { useState } from "react";
import {StyleSheet,TextInput, TouchableOpacity, View } from "react-native";
import {SendIcon} from "../SendIcon"

export default function ComponentInput({  onSend }) {
    const [comment, setComment] = useState("");
  return (
    <View style={styles.commentContainer}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Коментувати..."
          value={comment}
          onChangeText={setComment}
        />
      </View>
      <TouchableOpacity style={styles.sendButton} onPress={() => { onSend(comment); setComment(""); }}>
  <SendIcon size={34} color={"#BDBDBD"}/>
      </TouchableOpacity>
    
    </View>
  );
}       

const styles = StyleSheet.create({
  commentContainer: {
    padding: 10,
 flexDirection: "row",
    justifyContent: "space-between",
        alignItems: "center",
      borderWidth:1,
    borderColor:"#E8E8E8",
    backgroundColor:"#F6F6F6",
    borderRadius:100
  },
  inputWrapper: {
    marginTop: 5,

  },
  input: {
    color:"#BDBDBD",
    fontSize:16,
    fontWeight:500,
    padding:16
  },
  commentText: {
    fontSize: 14,
    marginBottom: 5,
    borderBottomColor: "#eee",
  },
  commentAuthor: {
    fontSize: 12,
    color: "#888",
  },
}); 