import { Auth } from './auth';
import { User } from './users';

export const api = {
  auth: new Auth(),
  users: new User(),
};
