import { ImageSourcePropType } from 'react-native';

export interface Creator {
  username: string;
  avatar: ImageSourcePropType | undefined;
}

export interface Post {
  id: string;
  title: string;
  thumbnail: ImageSourcePropType | undefined;
  prompt: string;
  videoUrl: string;
  creator: Creator;
}
