import { user } from "../user/model/user.model.js";
import {AppError} from "../../pkg/error/error.js";

export const otpexpired =  new AppError( 'otp expired , please resend otp', 400);
export const invalidcode = new AppError('Invalid code',400);
export const passwordnotmatch = new AppError('Password incorrect',403);
