import { REQUEST_TIMER } from '../helpers/constants';
import { CurrentUser } from '../models/user';

import { userAdmin, currentUser } from '@/mocks/users';

interface SignInProps {
  email: string;
  password: string;
}

export class Auth {
  signIn(data: SignInProps): Promise<CurrentUser> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          data.email === userAdmin.email &&
          data.password === userAdmin.password
        ) {
          resolve(currentUser);
        } else {
          reject(new Error('No registered user.'));
        }
      }, REQUEST_TIMER);
    });
  }
}
