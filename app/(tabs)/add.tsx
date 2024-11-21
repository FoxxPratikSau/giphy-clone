import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { CameraView } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

const Add = () => {
  const [type, setType] = useState('back');

  const toggleCameraType = () => {
    setType(current => current === 'back' ? 'front' : 'back');
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        // type={type}
      >
        <TouchableOpacity 
          style={styles.button} 
          onPress={toggleCameraType}
        >
          <Ionicons name="camera-reverse" size={30} color="white" />
        </TouchableOpacity>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 12,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});

export default Add;