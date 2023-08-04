import { UserCredentials, UserData } from './user.type';

export interface Place {
  title: string;
  name: string;
  location: string;
  imageUrl: string;
  description: string;
  id?: string;
  likes: string[];
  visited: string[];
  favorites: string[];
  creator: UserData;
}
