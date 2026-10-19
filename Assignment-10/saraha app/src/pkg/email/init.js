import {env} from "../../lib/config/env.js";
import {Maljetprovider} from "../email/mailjet.js"

export const mailjetprovider =
    new Maljetprovider({
        apiKey : env.mailjet.apiKey ,
        apiSecret : env.mailjet.apisecret,
        fromemail : env.mailjet.fromemail,
        fromname:env.mailjet.fromname

    })