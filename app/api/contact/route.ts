import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Adjust based on your NextAuth setup

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message } = await req.json();
    const userEmail = session.user.email; // Logged-in user's email
    const adminEmail = "vrajpatel2022@vitbhopal.ac.in";

    // Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password
      },
    });

    // Email Options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Your email
      to: adminEmail, // You will receive the emails
      subject: "New Contact Form Submission",
      text: `Message from ${userEmail}:\n\n${message}`,
      replyTo: userEmail, // User's email for replying
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ error: "Failed to send email, Please Login first." }, { status: 500 });
  }
}
