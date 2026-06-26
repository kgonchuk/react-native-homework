import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';


export default function CreatePosts({ onTakePhoto }) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [type, setType] = useState('back');
  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Потрібен доступ до камери</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Дозволити</Text>
        </TouchableOpacity>
      </View>
    );
  }

   const takePhoto = async () => {
    const photo = await cameraRef.current.takePictureAsync();
    onTakePhoto(photo.uri);
  };

   const toggleCamera = () => {
    setType((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  return (
     <CameraView style={styles.camera} ref={cameraRef} facing={type}>
      <TouchableOpacity style={styles.flipBtn} onPress={toggleCamera}>
        <Ionicons name="camera-reverse" size={28} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.captureBtn} onPress={takePhoto}>
        <Ionicons name="camera" size={24} color="#fff" />
      </TouchableOpacity>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  captureBtn: {
     width:60,
  height:60,
  borderRadius:30,
  backgroundColor:"#FFFFFF4D",
  position:"absolute",
  top:"40%",
  left:"40%",
  padding:20
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flipBtn: {
  position: "absolute",
  top: 20,
  right: 20,
  zIndex: 10,
},
});