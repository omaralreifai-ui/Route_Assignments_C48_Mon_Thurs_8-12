import {createApp} from "./app.js";
import  http from 'http';
const app =createApp();
import {config} from "dotenv";
import mongoose from "mongoose";
import {env} from "./lib/config/env.js";
import {logger} from "./lib/logger.js/logger.js";
const server = http.createServer(app);
server.listen(3000, () => logger.info(`server started on 3000`));
async function shutdown() {
    server.close( async () => {
        await mongoose.disconnect();
        process.exit(0);
    });
}
server.on('SIGINT', shutdown);
server.on('SIGTERM', shutdown);