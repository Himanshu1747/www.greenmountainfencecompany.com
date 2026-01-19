import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import nodemailer from 'nodemailer';

// Helper to create transporter with specific Gmail/Vercel settings
const getTransporter = () => {
  return nodemailer.createTransport({
    host: import.meta.env.SMTP_HOST,
    port: Number(import.meta.env.SMTP_PORT),
    secure: false, // Must be false for port 587
    auth: {
      user: import.meta.env.SMTP_USER,
      pass: import.meta.env.SMTP_PASS,
    },
    tls: {
      // Essential for Gmail on serverless environments
      rejectUnauthorized: false,
      minVersion: "TLSv1.2"
    },
  });
};

export const server = {
  sendEmail: defineAction({
    input: z.object({
      email: z.string().email(),
      message: z.string(),
      lastname: z.string(),
      firstname: z.string(),
    }),
    handler: async (input) => {
      const transporter = getTransporter();
      const adminMail = {
        from: `"Website Form" <${import.meta.env.SMTP_USER}>`,
        to: "tech@ogrelogic.com",
        replyTo: input.email,
        subject: `New Contact: ${input.firstname} ${input.lastname}`,
        text: `Name: ${input.firstname} ${input.lastname}\nEmail: ${input.email}\nMessage: ${input.message}`,
      };

      try {
        await transporter.sendMail(adminMail);
        return { success: true };
      } catch (err: any) {
        console.error("ADMIN EMAIL ERROR:", err);
        throw new Error(`Failed to send admin email: ${err.message}`);
      }
    },
  }),

  sendThankYouEmail: defineAction({
    input: z.object({
      email: z.string().email(),
      firstname: z.string(),
    }),
    handler: async (input) => {
      const transporter = getTransporter();
      const userMail = {
        from: `"Green Mountain Fence" <${import.meta.env.SMTP_USER}>`,
        to: input.email,
        subject: "Thanks for contacting us!",
        text: `Hi ${input.firstname},\n\nWe received your message and will get back to you soon.`,
      };

      try {
        await transporter.sendMail(userMail);
        return { success: true };
      } catch (err: any) {
        console.error("THANK YOU EMAIL ERROR:", err);
        throw new Error(`Failed to send thank you email: ${err.message}`);
      }
    },
  }),

  sendEmailestimateemail: defineAction({
    input: z.object({
      firstname: z.string(),
      lastname: z.string(),
      email: z.string().email(),
      message: z.string().optional(),
      streetAddress: z.string().optional(),
      townCity: z.string().optional(),
      phone: z.string().optional(),
      product: z.string().optional(),
      hearAboutUs: z.string().optional(),
      promoCode: z.string().optional(),
    }),
    handler: async (input) => {
      const transporter = getTransporter();
      const adminMail = {
        from: `"Estimate Request" <${import.meta.env.SMTP_USER}>`,
        to: "tech@ogrelogic.com",
        replyTo: input.email,
        subject: `Estimate Request: ${input.firstname} ${input.lastname}`,
        text: `Name: ${input.firstname} ${input.lastname}\nEmail: ${input.email}\nPhone: ${input.phone}\nAddress: ${input.streetAddress}, ${input.townCity}\nProduct: ${input.product}\nMessage: ${input.message}`,
      };

      try {
        await transporter.sendMail(adminMail);
        return { success: true };
      } catch (err: any) {
        console.error("ESTIMATE ERROR:", err);
        throw new Error(`Failed to send estimate email: ${err.message}`);
      }
    },
  }),

  sendThankYouEmailestimate: defineAction({
    input: z.object({
      firstname: z.string(),
      email: z.string().email(),
      product: z.string().optional(),
    }),
    handler: async (input) => {
      const transporter = getTransporter();
      const userMail = {
        from: `"Green Mountain Fence" <${import.meta.env.SMTP_USER}>`,
        to: input.email,
        subject: "Your Estimate Request",
        text: `Hi ${input.firstname},\n\nThank you for your interest in ${input.product}. We will contact you soon.`,
      };

      try {
        await transporter.sendMail(userMail);
        return { success: true };
      } catch (err: any) {
        console.error("ESTIMATE THANK YOU ERROR:", err);
        throw new Error(`Failed to send estimate thank you: ${err.message}`);
      }
    },
  }),
};