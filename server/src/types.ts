import { Request } from "express";

export interface AuthRequest<
  P = any, // Params
  ResBody = any, // Response body
  ReqBody = any, // Request body
  ReqQuery = any // Query
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: { id: string };          // JWT user
  file?: Express.Multer.File;     // for file uploads
}
