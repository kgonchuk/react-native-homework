import { useState } from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ComponentInput({  onSend }) {
    const [comment, setComment] = useState("");
  return (
    <View style={styles.commentContainer}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Напишіть коментар..."
          value={comment}
          onChangeText={setComment}
        />
      </View>
      <TouchableOpacity style={styles.sendButton} onPress={() => { onSend(comment); setComment(""); }}>
        <Text>Відправити</Text>
      </TouchableOpacity>
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