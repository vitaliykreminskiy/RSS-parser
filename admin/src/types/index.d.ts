declare type UserCredentials = {
  username: string;
  password: string;
};

declare type PostPageOptions = {
  page: number;
  perPage?: number;
  search?: string;
  sort?: "newest" | "oldest";
};

declare type Page<T> = {
  count: number;
  results: T[];
};

declare type Post = {
  id: number;
  title: string;
  author: string;
  content: string;
  published_at: string;
};
