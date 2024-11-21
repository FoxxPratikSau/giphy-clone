import { useEffect, useState } from 'react';
import axios from 'axios';

interface Category {
  name: string;
  slug: string;
}

export const useGiphyCategories = (): Category[] => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api.giphy.com/v1/gifs/categories', {
          params: {
            api_key: 'FvnH7toHSm28xY8iuf3vu5JYCe87bkIq',
          },
        });

        const data = response.data.data;

        const categoriesData: Category[] = data.map((item: any) => ({
          name: item.name,
          slug: item.slug,
        }));

        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return categories;
};
