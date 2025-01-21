import { AuthController } from './controllers/auth.controller';
import { PostController } from './controllers/posts.controller';
import { UserController } from './controllers/users.controller';

export const api = {
  auth: new AuthController(),
  users: new UserController(),
  posts: new PostController(),
};
