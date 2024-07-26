export type InfiniteScrollResponse<T> = {
  data: T[];
  metaData: {
    cursor?: string | null;
    hasNextPage: boolean;
  };
};
