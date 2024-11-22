import { useState, useEffect } from 'react';
import { Gif } from '@/models/Gif';
import {
  fetchTrendingGifs,
  fetchGifsByCategory,
  fetchTrendingStickers,
  fetchStickersByCategory,
  fetchEmojis,
} from '@/services/giphy';

interface UseGiphyDataProps {
  query: string;
  selectedCategory: string;
  limit: number;
}

export const useGiphyData = ({ query, selectedCategory, limit }: UseGiphyDataProps) => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchGifs = async (
    searchQuery: string,
    category: string,
    newOffset: number = 0,
    append: boolean = false
  ) => {
    setLoading(true);
    try {
      let fetchedGifs: Gif[] = [];
      if (searchQuery.trim() !== '') {
        fetchedGifs = await fetchGifsByCategory(searchQuery, limit, newOffset);
      } else {
        switch (category) {
          case 'Trending':
            fetchedGifs = await fetchTrendingGifs(limit, newOffset);
            break;
          case 'Stickers':
            fetchedGifs = await fetchTrendingStickers(limit, newOffset);
            break;
          case 'Emoji':
            fetchedGifs = await fetchEmojis(limit, newOffset);
            break;
          default:
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

  const handleLoadMore = () => {
    if (!loading) {
      const newOffset = offset + limit;
      setOffset(newOffset);
      fetchGifs(query, selectedCategory, newOffset, true);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setOffset(0);
    await fetchGifs(query, selectedCategory, 0, false);
    setRefreshing(false);
  };

  return {
    gifs,
    loading,
    refreshing,
    fetchGifs,
    handleLoadMore,
    handleRefresh,
    setOffset,
  };
};
