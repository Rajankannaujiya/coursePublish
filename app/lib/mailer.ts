
import nodemailer from "nodemailer";

console.log( process.env.MAILUSER);
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAILUSER,
    pass: process.env.MAILPASS,
  },
});

const adminEmails = process.env.ADMIN_EMAILS?.split(",").map((email) => email.trim());
console.log(adminEmails)

export async function sendSignInNotification(user:any) {
    console.log("this is the user",user);
    console.log("📧 Sending sign-up notification for:", user.email);
  if (!adminEmails || adminEmails.length === 0) {
    console.error("No admin emails configured");
    return;
  }

  try {

    const info = await transporter.sendMail({
      from: process.env.MAILUSER,
      to: adminEmails,
      subject: "New Sign-in notification to Pytechhub",
      text: `Hello Admin,\n\nA new user just signed up.\n\nName: ${user.name}\nEmail: ${user.email}`});

    console.log("Notification email sent:", info.messageId);
  } catch (err) {
    console.error("Error sending sign-in notification:", err);
  }
}

export async function sentDetailNotification(name:string, email:string, profession:string, yearOfGraduation:number, course:string) {
  console.log("this is the user",name);
if (!adminEmails || adminEmails.length === 0) {
  console.error("No admin emails configured");
  return;
}

try {

  const info = await transporter.sendMail({
    from: process.env.MAILUSER,
    to: adminEmails,
    subject: "New detail submission notification to Pytechhub",
    text: `Hello Admin,\n\nA A user just submitted there details. \n\nName: ${name}\nEmail: ${email} \nProfession: ${profession} \nYear of Graduation: ${yearOfGraduation} \nCourse: ${course}`});

  console.log("Notification email sent:", info.messageId);
} catch (err) {
  console.error("Error sending sign-in notification:", err);
}
}
