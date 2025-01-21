import { currentUser } from '@/mocks/users';
import { REQUEST_TIMER } from './helpers/constants';
import { CurrentUser } from './models/user';

interface CreateUserProps {
  username: string;
  email: string;
  password: string;
}

export class User {
  createUser(user: CreateUserProps): Promise<CurrentUser> {
    console.log(user);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(currentUser);
      }, REQUEST_TIMER);
    });
  }

  getCurrentUser(): Promise<CurrentUser> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(currentUser);
      }, REQUEST_TIMER);
    });
  }
}
