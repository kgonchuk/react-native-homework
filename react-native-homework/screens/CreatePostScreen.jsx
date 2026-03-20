import { Feather, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CreatePosts from "../components/CreatePosts";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

export default function CreatePostScreen() {
  const [name, setName]=useState("")
  const [place, setPlace]=useState("")
  const [showCamera, setShowCamera] = useState(false);
const [photo, setPhoto] = useState(null);
const [location, setLocation] = useState(null);
const [address, setAddress] = useState(null);

useEffect(() => {
  setShowCamera(true);
}, []);

const getLocation = async () => {
  // запит дозволу
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    alert("Немає доступу до геолокації");
    return;
  }

  // отримання координат
  const loc = await Location.getCurrentPositionAsync({});
  setLocation(loc.coords);

  // 🌍 отримання адреси (reverse geocoding)
  const addr = await Location.reverseGeocodeAsync(loc.coords);

  if (addr.length > 0) {
    const placeName = `${addr[0].city || ""}, ${addr[0].country || ""}`;
    setAddress(placeName);
    setPlace(placeName); // підставляємо в input
  }
};


const handleTakePhoto = (uri) => {
  setPhoto(uri);
  setShowCamera(false);
  getLocation(); 
};

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
          setPhoto(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.photoContainer}>
        {showCamera ? (
    <CreatePosts onTakePhoto={handleTakePhoto} />
  ) : (
    <>
      {photo && (
        <Image
          source={{ uri: photo }}
          style={{ width: "100%", height: "100%", borderRadius: 8 }}
        />
      )}

      {/* <View style={styles.photoBtnWrap}>
        <TouchableOpacity onPress={() => setShowCamera(true)}>
          <Ionicons name="camera" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View> */}
    </>
  )}

      </View>

      {photo && (
  <TouchableOpacity onPress={() => setPhoto(null)}>
    <Text style={{ color: "red", marginTop: 8 }}>
      Видалити фото
    </Text>
  </TouchableOpacity>
)}
     
      <View style={styles.inputWrap}>
     {!photo && (
            <TouchableOpacity onPress={uploadPhoto} style={styles.uploadPhoto}>
              <Text style={styles.photoText}>Завантажте фото</Text>
            </TouchableOpacity>
          )}
  <TextInput 
    placeholder="Назва..."
    value={name}
    onChangeText={setName}
    style={styles.input}
  />

  {/* Локація */}
  <View style={styles.locationWrap}>
    <Pressable onPress={getLocation}>
    <Feather name="map-pin" size={20} color="#BDBDBD" />
</Pressable>
    <TextInput   
      placeholder="Місцевість..."
      value={place}
      onChangeText={setPlace}
      style={styles.inputPlace}
    />
  </View>

</View>
     <Pressable
  onPress={()=>Alert.alert("Published")}
  style={styles.loadButton}
>
  <Text style={styles.btnText}>Опубліковати</Text>
</Pressable>

<Pressable style={styles.trashBtn} onPress={()=>Alert.alert("Delete successfull")}>
    <Feather
                name="trash-2"
                size="24"
                color="rgba(189, 189, 189, 1)"
              />
</Pressable>
    </View>
  );
}


const styles=StyleSheet.create({
  container:{
paddingTop:32,
paddingLeft:16,
paddingRight:16,

},
photoContainer:{
  width:"100%",
  height:240,
backgroundColor:"#F6F6F6",
borderRadius:8,
borderColor:"#E8E8E8" ,
 borderWidth: 1,
 position:"relative",
 marginBottom:8,
},
photoBtnWrap:{
  width:60,
  height:60,
  borderRadius:30,
  backgroundColor:"#FFFFFF4D",
  position:"absolute",
  top:"40%",
  left:"40%",
  padding:20
},
uploadPhoto:{

},
photoText:{
  fontSize:16,
  fontWeight:"400",
  color:"#BDBDBD"
},
inputWrap:{
  marginTop: 32,
  gap: 16,
},
input:{
 fontSize: 16,
  fontWeight: "400",
  borderBottomWidth: 1,
  borderColor: "#E8E8E8",
  paddingVertical: 16,
},
inputPlace: {
  flex: 1,
  fontSize: 16,
  fontWeight: "400",
  paddingVertical: 16,
  marginLeft: 8,
},
locationIcon:{
// position:'absolute',
// top:-55,
},
loadButton:{
  width:"100%",
padding:16,
backgroundColor:"#F6F6F6",
borderRadius:100,
alignItems:"center",
marginTop:32,
  zIndex: 999,
  elevation: 10,
},
btnText:{
  color:"#BDBDBD",
  fontSize:16,
  fontWeight:"400"
},
trashBtn:{
  width:70,
  height:40,
  backgroundColor:"#F6F6F6",
  borderRadius:20,
  alignItems:"center",
  padding:8,
marginLeft:"auto",
marginRight:"auto",
marginTop:120,
},
  locationWrap:{
      flexDirection: "row",
  alignItems: "center",
  borderBottomWidth: 1,
  borderColor: "#E8E8E8",
  }

})