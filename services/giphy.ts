// src/services/giphy.ts

import axios from 'axios';
import { Gif } from '@/models/Gif';

const API_KEY = 'FvnH7toHSm28xY8iuf3vu5JYCe87bkIq'; // Replace with your actual Giphy API key
const GIFS_BASE_URL = 'https://api.giphy.com/v1/gifs';
const STICKERS_BASE_URL = 'https://api.giphy.com/v1/stickers';

export const fetchTrendingGifs = async (limit: number, offset: number): Promise<Gif[]> => {
  const response = await axios.get(`${GIFS_BASE_URL}/trending`, {
    params: {
      api_key: API_KEY,
      limit,
      offset,
    },
  });
  return response.data.data;
};

export const fetchGifsByCategory = async (category: string, limit: number, offset: number): Promise<Gif[]> => {
  const response = await axios.get(`${GIFS_BASE_URL}/search`, {
    params: {
      api_key: API_KEY,
      q: category,
      limit,
      offset,
    },
  });
  return response.data.data;
};

export const fetchRelatedGifs = async (gifId: string, limit: number = 25): Promise<Gif[]> => {
  const response = await axios.get(`${GIFS_BASE_URL}/related`, {
    params: {
      api_key: API_KEY,
      gif_id: gifId,
      limit,
    },
  });
  return response.data.data;
};

export const fetchTrendingStickers = async (limit: number, offset: number): Promise<Gif[]> => {
  const response = await axios.get(`${STICKERS_BASE_URL}/trending`, {
    params: {
      api_key: API_KEY,
      limit,
      offset,
    },
  });
  return response.data.data;
};

export const fetchStickersByCategory = async (category: string, limit: number, offset: number): Promise<Gif[]> => {
  const response = await axios.get(`${STICKERS_BASE_URL}/search`, {
    params: {
      api_key: API_KEY,
      q: category,
      limit,
      offset,
    },
  });
  return response.data.data;
};

export const fetchEmojis = async (limit: number, offset: number): Promise<Gif[]> => {
  // Giphy does not have a specific emojis endpoint, so use search with 'emoji'
  const response = await axios.get(`${GIFS_BASE_URL}/search`, {
    params: {
      api_key: API_KEY,
      q: 'emoji',
      limit,
      offset,
    },
  });
  return response.data.data;
};
