import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import { z } from 'zod';
config() ;
const schema = z.object({
    PORT : z.string().default('3000'),
    MONGODB_URL  : z.string() ,
    EMAIL : z.email().trim().toLowerCase() ,
    PASSWORD : z.string() ,
    JWT_SECRET: z.string() ,
    CLIENT_ID : z.string() ,
    REDIS_HOST : z.string(),
    REDIS_PORT : z.string().default('6379'),
    REDIS_PASSWORD : z.string(),
    MAILJET_API_KET  :z.string(),
    MAILJET_API_secrete :z.string(),
    fromemail: z.string() ,
    fromname :z.string(),


})
const parsed = schema.parse(process.env);
export const env = {
    port : Number(parsed.PORT), 
    db : {
        url : parsed.MONGODB_URL ,

    } ,
    redis : {host : parsed.REDIS_HOST ,
        port : Number(parsed.REDIS_PORT),
        password : parsed.REDIS_PASSWORD ,
    } ,
   
    nodemailer : {
        user : parsed.EMAIL ,
        pass : parsed.PASSWORD ,
    } ,
    jwt : {secret : parsed.JWT_SECRET} ,
    google : {
        clientId : parsed.CLIENT_ID ,
    } ,
    mailjet : {
        apiKey : parsed.MAILJET_API_KET ,
        apisecret :parsed.MAILJET_API_secrete ,
        fromemail : parsed.fromemail ,
        fromname : parsed.fromname ,
    }

} ;