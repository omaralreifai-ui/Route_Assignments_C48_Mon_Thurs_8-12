import 'dotenv/config'
import './lib/db/mongoose.js'


import express from 'express' ;

import authRouter from "./app/auth/auth.route.js"

import userRoute from"./app/user/user.route.js"
import messageRoute from"./app/message/message.route.js"

import { logger } from './lib/logger.js/logger.js';
import cors from 'cors'
import {env} from "./lib/config/env.js";
import {globalerror} from "./lib/error/error.handler.js";
import {router} from "./routes.js";
import {correlationId} from "./lib/correlation/correlationId.js";
import cookieParser from "cookie-parser";


export function createApp() {
    const app =express()
    app.use(cors({
        origin : 'http://localhost:4200',
        credentials: true
    }));
    app.use(cookieParser());
    app.use(express.json())
    app.use(correlationId)
    app.use('/api' , router);
    app.use(globalerror);

    return app;
}