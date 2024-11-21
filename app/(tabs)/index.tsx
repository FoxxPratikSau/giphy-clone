import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import {
  fetchTrendingGifs,
  fetchGifsByCategory,
  fetchTrendingStickers,
  fetchStickersByCategory,
  fetchEmojis,
} from '@/services/giphy';
import { Gif } from '@/models/Gif';

import GifItem from '@/components/GifItem';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { CategoryContext } from '../context/CategoryContext';
import { ThemeContext } from '../context/ThemeContext';
import { MasonryFlashList } from '@shopify/flash-list';

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - 32) / numColumns; // Adjusted for padding and margin

const Home: React.FC = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const limit = 25;
  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);
  const { theme } = useContext(ThemeContext);
  const categories = ['Trending', 'Stickers', 'Emoji', 'Reactions', 'Artists'];
  const [query, setQuery] = useState<string>('');

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Fetch GIFs based on search query or selected category
  const fetchGifs = async (
    searchQuery: string,
    category: string,
    newOffset: number = 0,
    append: boolean = false
  ) => {
    setLoading(true);
    let fetchedGifs: Gif[] = [];
    try {
      if (searchQuery.trim() !== '') {
        // Use search query
        fetchedGifs = await fetchGifsByCategory(searchQuery, limit, newOffset);
      } else {
        // Use category
        if (category === 'Trending') {
          fetchedGifs = await fetchTrendingGifs(limit, newOffset);
        } else if (category === 'Stickers') {
          fetchedGifs = await fetchTrendingStickers(limit, newOffset);
        } else if (category === 'Emoji') {
          fetchedGifs = await fetchEmojis(limit, newOffset);
        } else {
          // For other categories, use search endpoint
          fetchedGifs = await fetchGifsByCategory(category, limit, newOffset);
        }
      }
      setGifs((prevGifs) => (append ? [...prevGifs, ...fetchedGifs] : fetchedGifs));
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce the search input
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      setOffset(0);
      fetchGifs(query, selectedCategory, 0, false);
    }, 500);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query]);

  // Fetch when selectedCategory changes
  useEffect(() => {
    if (query.trim() === '') {
      setOffset(0);
      fetchGifs(query, selectedCategory, 0, false);
    }
  }, [selectedCategory]);

  // Load more GIFs for infinite scroll
  const handleLoadMore = () => {
    if (!loading) {
      const newOffset = offset + limit;
      setOffset(newOffset);
      fetchGifs(query, selectedCategory, newOffset, true);
    }
  };

  // Handle pull-to-refresh
  const handleRefresh = () => {
    setRefreshing(true);
    setOffset(0);
    fetchGifs(query, selectedCategory, 0, false).then(() => setRefreshing(false));
  };

  // Render footer with loading indicator
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ paddingVertical: 16 }}>
        <ActivityIndicator size="large" color="#FF5A79" />
      </View>
    );
  };

  // Override item layout for MasonryFlashList
  const overrideItemLayout = (
    layout: { span?: number; size?: number },
    item: Gif,
    index: number
  ) => {
    // Get the image dimensions
    const width = parseInt(item.images.fixed_width.width);
    const height = parseInt(item.images.fixed_width.height);

    // Calculate the item height based on the desired item width
    const desiredWidth = (screenWidth - 16) / 2; // Adjusted for padding and margins
    const scaleFactor = desiredWidth / width;
    const scaledHeight = height * scaleFactor;

    layout.size = scaledHeight; // Set the item height
  };

  // Define styles based on theme
  const isDarkMode = theme === 'dark';

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <SafeAreaView>
        <View style={styles.headerContainer}>
          {/* Search Section */}
          <View style={styles.searchSection}>
            {/* Search Box (80% width) */}
            <View style={styles.searchBox}>
            <Image
    source={require('@/assets/logo.png')}
    style={styles.logo}
    resizeMode="contain"
  />

              {/* TextInput */}
              <TextInput
                placeholder="Search GIPHY"
                placeholderTextColor={isDarkMode ? '#A0A0A0' : '#666'}
                style={styles.searchInput}
                value={query}
                onChangeText={(text) => setQuery(text)}
              />
            </View>

            {/* Search Button (20% width) */}
            <TouchableOpacity
              onPress={() => {
                if (query.trim() !== '') {
                  // Immediate search without debounce
                  setOffset(0);
                  fetchGifs(query.trim(), selectedCategory, 0, false);
                }
              }}
              style={styles.searchButton}
            >
              <LinearGradient
                colors={['#FF5A79', '#FFA500']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.searchButtonGradient}
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
            style={{ marginTop: 5 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSelectedCategory(category);
                    setQuery(''); // Clear search query when a category is selected
                  }}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.selectedCategoryButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === category && styles.selectedCategoryText,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>

      {/* GIF Grid */}
      <MasonryFlashList
        data={gifs}
        numColumns={2}
        renderItem={({ item }) => (
          <GifItem gif={item} width={(screenWidth - 16) / 2} />
        )}
        estimatedItemSize={200}
        overrideItemLayout={overrideItemLayout}
        optimizeItemArrangement={true} // Enable optimized item arrangement
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default Home;

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000428' : '#ffffff',
    },
    headerContainer: {
      backgroundColor: isDarkMode ? '#000428' : '#ffffff',
      paddingTop: 50,
    },
    logo: {
      width: 30,
      height: 30,
      // marginRight: 8,
      marginLeft: 8,
    },
    searchSection: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#ffffff' : '#f0f0f0',
      height: 56, // Adjust the height as needed
      width: '100%',
    },
    searchBox: {
      flex: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchInput: {
      flex: 1,
      color: 'black',
      fontSize: 16,
      paddingHorizontal: 16,
    },
    searchButton: {
      flex: 2,
      height: '100%',
    },
    searchButtonGradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    categoryButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 9999,
      backgroundColor: 'transparent',
      marginRight: 8,
    },
    selectedCategoryButton: {
      backgroundColor: '#6B21A8',
    },
    categoryText: {
      fontSize: 16,
      fontWeight: '500',
      color: isDarkMode ? '#D1D5DB' : '#555',
    },
    selectedCategoryText: {
      color: 'white',
    },
  });
