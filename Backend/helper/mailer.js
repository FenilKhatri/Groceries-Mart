import "dotenv/config";
import { Resend } from "resend";

export const sendMailWithLogo = async ({ to, subject, html, text }) => {
  if (!process.env.RESEND_API_KEY) throw new Error("Missing RESEND_API_KEY");

  if (!process.env.RESEND_FROM) throw new Error("Missing RESEND_FROM");

  if (!to) throw new Error("Missing recipient email (to)");

  const resend = new Resend(process.env.RESEND_API_KEY);

  return await resend.emails.send({
    from: process.env.RESEND_FROM,
    to: [to],
    subject,
    html,
    text,
  });
};
