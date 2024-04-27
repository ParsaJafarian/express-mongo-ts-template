import { NextFunction, Request, RequestHandler, Response } from "express";

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export default function catchAsyncError(asyncFunc: AsyncFunction): RequestHandler{
    const func : RequestHandler = async (req, res, next) => {
        asyncFunc(req, res, next).catch(next);
    };
    return func;
}
