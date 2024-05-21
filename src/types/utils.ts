export type ResponseError = {
  data: { message: string[]; error: string; statusCode: number };
  status: number;
};
