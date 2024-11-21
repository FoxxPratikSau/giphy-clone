// src/screens/Profile.tsx

import React, { useContext } from 'react';
import { View, Text, StyleSheet, Switch, Image, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const Profile: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isDarkMode = theme === 'dark';

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image
        source={{ uri: 'https://i.pravatar.cc/150?img=12' }} // Replace with user's profile picture URL
        style={styles.profileImage}
      />
      {/* Username */}
      <Text style={styles.username}>John Doe</Text>
      {/* Bio */}
      <Text style={styles.bio}>
        This is a sample bio. You can update this section with your own information.
      </Text>

      {/* Theme Switcher */}
      <View style={styles.themeSwitcher}>
        <Text style={styles.themeText}>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>

      {/* Other Profile Options */}
      <TouchableOpacity style={styles.optionButton}>
        <Text style={styles.optionText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton}>
        <Text style={styles.optionText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton}>
        <Text style={styles.optionText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000428' : '#f0f0f0',
      alignItems: 'center',
      padding: 16,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginTop: 32,
      marginBottom: 16,
    },
    username: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 8,
    },
    bio: {
      fontSize: 16,
      textAlign: 'center',
      color: isDarkMode ? '#dddddd' : '#333333',
      marginBottom: 24,
    },
    themeSwitcher: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    themeText: {
      fontSize: 18,
      color: isDarkMode ? '#ffffff' : '#000000',
      marginRight: 8,
    },
    optionButton: {
      width: '100%',
      paddingVertical: 16,
      paddingHorizontal: 32,
      backgroundColor: isDarkMode ? '#1f1f1f' : '#ffffff',
      borderRadius: 8,
      marginBottom: 16,
      alignItems: 'center',
    },
    optionText: {
      fontSize: 18,
      color: isDarkMode ? '#ffffff' : '#000000',
    },
  });
