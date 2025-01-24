import { AuthController } from './controllers/AuthController';
import { PostController } from './controllers/PostsController';
import { UserController } from './controllers/UsersController';

export const api = {
  auth: new AuthController(),
  users: new UserController(),
  posts: new PostController(),
};
