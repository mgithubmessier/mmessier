export type BaseResponse = {
  error?: string | null;
};

export type BaseGetResponse = BaseResponse & {
  next_page_key?: string | null;
};
export type BasePostResponse = BaseResponse;
