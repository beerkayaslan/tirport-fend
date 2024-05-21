export type ResponseError = {
  data: { message: string[] | string; error: string; statusCode: number };
  status: number;
};

export interface PaginationRequest {
  take: number;
  skip: number;
}
