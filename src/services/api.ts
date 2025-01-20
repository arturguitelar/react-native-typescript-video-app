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

class Api {
  REQUEST_TIMER = 500;

  signIn(data: SignInProps) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          data.email === userAdmin.email &&
          data.password === userAdmin.password
        ) {
          resolve({
            status: 'success',
          });
        } else {
          reject(new Error('No registered user.'));
        }
      }, this.REQUEST_TIMER);
    });
  }

  createUser(
    user: CreateUserProps
  ): Promise<{ status: string; message: string }> {
    console.log(user);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          status: 'success',
          message: `Can't create an user in this app version. Please log in with 'admin@email.com' 'Admin@123' instead.`,
        });
      }, this.REQUEST_TIMER);
    });
  }

  getCurrentUser(): Promise<CurrentUser> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(userAdmin);
      }, this.REQUEST_TIMER);
    });
  }
}

export const api = new Api();
