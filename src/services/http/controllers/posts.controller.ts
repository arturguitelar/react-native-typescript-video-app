import { REQUEST_TIMER } from '../helpers/constants';
import { posts } from '@/mocks/posts/posts';
import { Post } from '../models/post';

export class PostController {
  getAllPosts(): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (posts.length) {
          resolve(posts);
        } else {
          reject(new Error('No registered posts.'));
        }
      }, REQUEST_TIMER);
    });
  }

  getLatestPosts(): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (posts.length) {
          resolve(posts);
        } else {
          reject(new Error('No registered posts.'));
        }
      }, REQUEST_TIMER);
    });
  }

  searchPosts(query: string): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let filtered;

        if (query) {
          filtered = posts.filter((post) =>
            post.title.toLowerCase().includes(query.toLowerCase())
          );
        }

        resolve(filtered || []);
      }, REQUEST_TIMER);
    });
  }

  getUserPosts(userId: string): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userId === posts[0].creator.id) {
          resolve(posts);
        } else {
          reject(new Error('User error.'));
        }
      }, REQUEST_TIMER);
    });
  }
}
