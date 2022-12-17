export interface IPostResponse{
    next?: IPostResponse | null
    previous?: IPostResponse | null
    slug?: string
    id?: string
    uuid?: string
    commentId?: string
    isIndexFile: boolean
    date?: string
    preview: {
        html?: string;
        text: string;
    }
  }