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
        const result = [] as Post[];

        if (query) {
          posts.filter((post) =>
            post.title.toLowerCase().includes(query.toLowerCase())
          );
        }

        resolve(result);
      }, REQUEST_TIMER);
    });
  }
}
