import {OAuth2Client} from "google-auth-library";
import { AppError } from "../../pkg/error/error.js";
import { env } from "../config/env.js";

        const client = new OAuth2Client({client_id: process.env.CLIENT_ID });

 export async function verifyGoogletoken(idToken){
    try {
        const ticket =  await client.verifyIdToken({idToken: idToken,
            audience: env.google.clientId,
     } );
        return ticket.getPayload() ;
    } catch(err) {
        throw  new  AppError('invalid google token',403);
    }

}