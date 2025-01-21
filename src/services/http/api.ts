import { Auth } from './controllers/auth.controller';
import { Post } from './controllers/posts.controller';
import { User } from './controllers/users.controller';

export const api = {
  auth: new Auth(),
  users: new User(),
  posts: new Post(),
};
