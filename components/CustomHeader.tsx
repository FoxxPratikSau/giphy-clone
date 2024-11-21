// src/components/CustomHeader.tsx

import React, { useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CategoryContext } from '@/app/context/CategoryContext';


const CustomHeader: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);
  const categories = ['Trending', 'Stickers', 'Emoji', 'Reactions', 'Artists'];

  return (
    <SafeAreaView>
      <View className="bg-[#000428]">
        {/* Search Section */}
        <View className="flex-row items-center bg-white overflow-hidden h-14 w-full px-4">
          {/* Search Box */}
          <View className="flex-row items-center flex-1 h-full">
            {/* Logo Placeholder */}
            {/* <Image
              source={require('../assets/logo.png')} // Ensure logo.png exists in assets
              style={{ width: 24, height: 24, marginRight: 8 }}
              resizeMode="contain"
            /> */}
            {/* TextInput */}
            <TextInput
              placeholder="Search GIPHY"
              placeholderTextColor="#A0A0A0"
              className=" text-black text-lg px-2 py-2"
              style={{ paddingLeft: 0 }} // Padding handled by logo
            />
          </View>

          {/* Search Button */}
          <TouchableOpacity
            onPress={() => console.log("Search pressed")}
            className="flex-initial h-full w-14"
          >
            <LinearGradient
              colors={['#FF5A79', '#FFA500']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="flex-1 items-center justify-center rounded-full"
            >
              <Feather name="search" size={24} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Categories Section */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 16, paddingVertical: 8 }}
          className="mt-5"
        >
          <View className="flex-row items-center space-x-4">
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full ${
                  selectedCategory === category
                    ? 'bg-purple-600'
                    : 'bg-transparent'
                }`}
              >
                <Text
                  className={`text-lg font-medium ${
                    selectedCategory === category
                      ? 'text-white'
                      : 'text-gray-300'
                  }`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;
