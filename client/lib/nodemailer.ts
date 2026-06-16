import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sentOtp(email: string, otp: string) {
  return transporter.sendMail({
    from: process.env.SMT_USER, // sender address
    to: email, // list of recipients
    subject: "Hello", // subject line
    text: "Hello world?", // plain text body
    html: `<div style="font-family: Arial;">
        <h2>OTP Code</h2>
        <p style="font-size:20px"><b>${otp}</b></p>
        <p>This code expires in 5 minutes.</p>
      </div>`,
  });
}
