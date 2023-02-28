import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import { CustomError } from "../helpers/errors";


const idValidation = (req: Request, _: Response, next: NextFunction) => {
    const { todoId } = req.params;

    const resultTodo = isValidObjectId(todoId);

    if (!resultTodo) {
        next(new CustomError('Invalid id format'));
    }
    next();
};

export { idValidation }