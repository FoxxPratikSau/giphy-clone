import React from 'react';
import { Platform, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const searchIcon = require('@/assets/search.png');
const addIcon = require('@/assets/add.png');
const profileIcon = require('@/assets/profile.png');

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['rgba(0, 0, 0, 1)', 'transparent']}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={[
        styles.tabBarContainer,
        {
          paddingBottom: insets.bottom + 10, // Adjust based on safe area
        },
      ]}
    >
      <View style={styles.tabBarContent}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // Define the icon based on the route name
          let iconSource = searchIcon; // Default icon
          switch (route.name) {
            case 'add':
              iconSource = addIcon; 
              break;
            case 'index':
              iconSource = searchIcon;
              break;
            case 'profile':
              iconSource = profileIcon;
              break;
            default:
              iconSource = searchIcon;
          }

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
            >
              <View
                style={[
                  styles.iconContainer,
                  isFocused && styles.focusedIconContainer,
                ]}
              >
                <Image
                  source={iconSource}
                  style={{
                    width: isFocused ? 34 : 30,
                    height: isFocused ? 34 : 30,
                    tintColor: isFocused ? 'white' : 'white',
                  }}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </LinearGradient>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index" // Set 'index' as the default tab
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Hide default labels
        tabBarStyle: {
          display: 'none', // Hide the default tab bar
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      {/* Tabs: explore (Add), index (Search), profile */}
      <Tabs.Screen
        name="add" // Left tab, corresponds to 'explore.tsx'
        options={{
          title: 'Add',
        }}
      />
      <Tabs.Screen
        name="index" // Middle tab, corresponds to 'index.tsx'
        options={{
          title: 'Search',
        }}
      />
      <Tabs.Screen
        name="profile" // Right tab
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -20,
  },
  tabBarContent: {
    flexDirection: 'row', // Ensure icons are in a row
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusedIconContainer: {
    backgroundColor: '#6B21A8', // Purple color when focused
  },
});
