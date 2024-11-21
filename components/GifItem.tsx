// src/components/GifItem.tsx

import React, { useState } from 'react';
import { TouchableOpacity, Image, View, StyleSheet, Alert, Share } from 'react-native';
import { Gif } from '@/models/Gif';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

interface GifItemProps {
  gif: Gif;
  width: number;
}

const GifItem: React.FC<GifItemProps> = ({ gif, width }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const imageUrl = isPlaying
    ? gif.images.fixed_width.url
    : gif.images.fixed_width_still.url;

  // Calculate height based on aspect ratio to maintain grid alignment
  const aspectRatio = parseInt(gif.images.fixed_width.width) / parseInt(gif.images.fixed_width.height);
  const height = width / aspectRatio;

  // Handle Share
  const handleShare = async () => {
    try {
      await Share.share({
        message: gif.url,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share GIF.');
    }
  };

  // Handle Download
  const handleDownload = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + `${gif.id}.gif`;
      const { uri } = await FileSystem.downloadAsync(gif.images.original.url, fileUri);
      await Sharing.shareAsync(uri);
    } catch (error) {
      Alert.alert('Error', 'Unable to download GIF.');
    }
  };

  return (
    <TouchableOpacity onPress={handlePlayPause} style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={{ width, height }}
        resizeMode="cover"
      />
      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={handleDownload} style={styles.actionButton}>
          <Image
            source={require('../assets/download-icon.png')} // Ensure download-icon.png exists
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
          <Image
            source={require('../assets/share-icon.png')} // Ensure share-icon.png exists
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
    position: 'relative',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 4,
    left: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 8,
    padding: 4,
  },
  actionButton: {
    padding: 4,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
});

export default GifItem;
