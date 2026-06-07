import {StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SendIcon } from "./Comments/SendIcon";


export default function CommentComponent({ comment }) {
  return (
    <View style={styles.commentContainer}>
    <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Напишіть коментар..."
          value={comment.text}
        />
      </View>
      <TouchableOpacity style={styles.sendButton} onPress={() => console.log("Відправлено:", comment.text)}>
        <Text>Відправити</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
<SendIcon size={30} color={"#BDBDBD"}/>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  inputWrapper: {
    marginTop: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    padding: 5,
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