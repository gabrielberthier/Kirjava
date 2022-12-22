import type { IPostResponse } from '$domain/models/post'
import { paginate } from '$services/utils/pagination'
import { posts } from './const-posts'

export class PostsSingleton {
  private static instance: PostsSingleton

  readonly posts: IPostResponse[]

  /**
   * The PostsSingleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    this.posts = posts
  }

  /**
   * The static method that controls the access to the PostsSingleton instance.
   *
   * This implementation let you subclass the PostsSingleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): PostsSingleton {
    if (!PostsSingleton.instance) {
      PostsSingleton.instance = new PostsSingleton()
    }

    return PostsSingleton.instance
  }

  paginate(limit: number, page: number){
    return paginate(this.posts, { limit, page })
  }
}
