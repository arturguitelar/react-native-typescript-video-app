import { CurrentUser } from './models/user';

interface CreateUserProps {
  username: string;
  email: string;
  password: string;
}

interface SignInProps {
  email: string;
  password: string;
}

const userAdmin = {
  username: 'admin',
  email: 'admin@email.com',
  password: 'Admin@123',
};

const currentUser = {
  ...userAdmin,
  password: null,
};

class Api {
  REQUEST_TIMER = 500;

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
      }, this.REQUEST_TIMER);
    });
  }

  createUser(user: CreateUserProps): Promise<CurrentUser> {
    console.log(user);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(currentUser);
      }, this.REQUEST_TIMER);
    });
  }

  getCurrentUser(): Promise<CurrentUser> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(currentUser);
      }, this.REQUEST_TIMER);
    });
  }
}

export const api = new Api();
