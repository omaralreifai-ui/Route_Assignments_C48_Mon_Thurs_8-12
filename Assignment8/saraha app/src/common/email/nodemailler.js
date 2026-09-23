import nodemailer from "nodemailer";

export async function sendemail(to , subject , html) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
        auth  :{
            user :process.env.EMAIL ,
            pass :process.env.PASSWORD
        }
      
    });
   await transporter.sendMail({
        from : `"first_app" <${process.env.EMAIL}>` ,
        to :to ,
        subject :subject,
        html :html
    })
}