import avatar from './posts/images/profile.png';

export const userAdmin = {
  id: '1',
  username: 'admin',
  email: 'admin@email.com',
  password: 'Admin@123',
};

export const currentUser = {
  ...userAdmin,
  password: null,
  avatar: avatar,
};