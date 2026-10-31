import nodemailer from "nodemailer";
import { env } from "../config/env.js";

export async function sendemail(to , subject , html) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
        auth  :{
            user :env.nodemailer.user ,
            pass : env.nodemailer.pass
        }

    });
   await transporter.sendMail({
        from : `"first_app" <${env.nodemailer.user}>` ,
        to :to ,
        subject :subject,
        html :html
    })
}