// src/context/CategoryContext.tsx

import React, { createContext, useState, ReactNode } from 'react';

interface CategoryContextProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const CategoryContext = createContext<CategoryContextProps>({
  selectedCategory: 'Trending',
  setSelectedCategory: () => {},
});

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Trending');

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
export default CategoryContext;
