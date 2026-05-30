import { login } from "@/redux/auth/authOperation";
import { Button } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import BgImage from "../assets/images/BG.png";

export default function RegistrationScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    if (!email || !password) {
      alert("Будь ласка, заповніть всі поля!");
      return;
    }
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        router.push("/posts");
      })
      .catch((error) => {
        console.log("Отримана помилка від сервера:", error);
        alert(typeof error === "string" ? error : "Щось пішло не так");
      });
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image source={BgImage} style={styles.img} />
        <View style={styles.userContainer}>
          <Text style={styles.title}>Увійти</Text>
          <View style={styles.form}>
            <TextInput
              placeholder="Адреса електронної пошти"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            ></TextInput>
            <TextInput
              placeholder="Пароль"
              autoComplete="password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            ></TextInput>
            <Button style={styles.signUp} onPressIn={onLogin}>
              <Text style={styles.singUpText}>Увійти</Text>
            </Button>
            <TouchableOpacity
              style={styles.singIn}
              onPress={() => router.push("/(auth)/registration")}
            >
              <Text style={styles.button}>Немає акаунту? Зареєструватися</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  img: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  userContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: "100%",
    height: 549,
    marginTop: 310,
    paddingTop: "92",
    paddingHorizontal: "16",
  },
  photoImg: {},
  photoContainer: {
    width: 120,
    height: 120,
    marginRight: "auto",
    marginLeft: "auto",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    zIndex: 10,
    transform: [{ translateY: 60 }],
    position: "absolute",
    top: -120,
    right: "40%",
  },
  addplus: {
    position: "absolute",
    top: 81,
    left: 107,
  },
  title: {
    fontWeight: "500",
    fontSize: "30",
    color: "#212121",
    marginRight: "auto",
    marginLeft: "auto",
  },
  form: {
    display: "flex",
    gap: 16,
    marginTop: "32",
  },

  input: {
    borderRadius: 8,
    border: "1px",
    backgroundColor: "#E8E8E8",
    padding: "16",
    color: "#BDBDBD",
    borderColor: "#BDBDBD",
  },
  signUp: {
    backgroundColor: "#FF6C00",
    padding: "16",
  },
  singUpText: {
    color: "#FFFFFF",
    fontSize: "16",
    fontWeight: "400",
  },
  singIn: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "16px",
    color: "#1B4371",
  },
  button: {
    color: "#1B4371",
    fontSize: "16",
    fontWeight: "400",
  },
});
