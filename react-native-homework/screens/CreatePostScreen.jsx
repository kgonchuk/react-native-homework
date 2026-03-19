import { Feather, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CreatePostScreen() {
  const [name, setName]=useState("")
  const [place, setPlace]=useState("")

    const onRegistr = () => {
    console.debug("Credential", `${name} + ${place}`);
  };
  return (
    <View style={styles.container}>

      <View style={styles.photoContainer}>
<View style={styles.photoBtnWrap}>
  <TouchableOpacity onPress={()=>Alert.alert("Чііііз)))")}>
    <Ionicons name="camera" size={24} color="#BDBDBD" />
  </TouchableOpacity>
</View>
      </View>
      <Pressable onPress={()=>Alert.alert("Loaded photo")}>
      <Text style={styles.photoText}>Завантажте фото</Text>
      </Pressable>
      {/* <View style={styles.inputWrap}>
      <TextInput 
      placeholder="Назва..."
      value={name}
      onChangeText={setName}
      style={styles.input}>
      </TextInput>

        <View style={{ position: 'relative' }}>
 <TextInput   
      placeholder="Місцевість..."
      value={place}
      onChangeText={setPlace}
      style={styles.inputPlace}>
      </TextInput>
       <Feather
    name="map-pin"
    size={20}
    color="#BDBDBD"
    style={{
      position: 'absolute',
      left: 0,
      top: 18,
    }}
  />
        </View>
      </View> */}
      <View style={styles.inputWrap}>
  
  <TextInput 
    placeholder="Назва..."
    value={name}
    onChangeText={setName}
    style={styles.input}
  />

  {/* Локація */}
  <View style={styles.locationWrap}>
    <Feather name="map-pin" size={20} color="#BDBDBD" />

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
  backgroundColor:"#fff",
  position:"absolute",
  top:"40%",
  left:"40%",
  padding:20
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