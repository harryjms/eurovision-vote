import nodemailer from "nodemailer";
let transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 465,
  secure: true,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  message: string
) => {
  try {
    const t = await transporter.verify();
    let envelope = {
      from: "no-reply@harryjms.uk",
      to,
      subject,
      html: message,
    };
    return transporter.sendMail(envelope);
  } catch (err) {
    throw err;
  }
};
