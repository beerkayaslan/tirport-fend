export type ResponseError = {
  data: { message: string[] | string; error: string; statusCode: number };
  status: number;
};
