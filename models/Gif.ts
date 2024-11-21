// src/models/Gif.ts

export interface Gif {
  id: string;
  url: string;
  username: string;
  title: string;
  images: {
    original: {
      url: string;
      width: string;
      height: string;
      size: string;
    };
    fixed_width: {
      url: string;
      width: string;
      height: string;
      size: string;
    };
    fixed_width_still: {
      url: string;
      width: string;
      height: string;
      size: string;
    };
    // Add other image formats if needed
  };
  // Add other properties if needed
}
