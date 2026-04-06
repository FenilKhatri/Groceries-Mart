import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async ({ userEmail, subject, html }) => {
  const response = await resend.emails.send({
    from: "FreshMart <onboarding@resend.dev>",
    to: process.env.EMAIL_USER, // admin email
    reply_to: userEmail,
    subject,
    html,
  });

  return response;
};