import { User } from './user.type';

export interface Place {
  title: string;
  name: string;
  location: string;
  imageUrl: string;
  description: string;
  id?: string;
  likes: string[];
  creator: User;
}
