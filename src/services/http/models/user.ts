import { ImageSourcePropType } from 'react-native';

export interface CurrentUser {
  id: string;
  username: string;
  email: string;
  avatar: ImageSourcePropType | undefined;
}
