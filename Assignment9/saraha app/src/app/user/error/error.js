import { AppError } from "../../../common/error/error.js";

export const usernotexist = new AppError('User not exist', 400);
export const userAlreadyVerified = new AppError('User already verified', 400);
export const usernotVerified = new AppError('User not verified', 400);
export const userexist1 = new AppError('User already exist', 400);