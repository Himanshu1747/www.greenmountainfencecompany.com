import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import nodemailer from 'nodemailer';

export const server = {
  sendEmail: defineAction({
    input: z.object({
      email: z.string().email(),
      message: z.string(),
      lastname: z.string(),
      firstname: z.string(),
    }),
    handler: async (input) => {
      const transporter = nodemailer.createTransport({
        host: import.meta.env.SMTP_HOST,
        port: Number(import.meta.env.SMTP_PORT),
        auth: {
          user: import.meta.env.SMTP_USER,
          pass: import.meta.env.SMTP_PASS,
        },
      });

      // 1. MAIL TO ADMIN (You receive this with all details)
      const adminMail = {
        from: `"Website Form" <${import.meta.env.SMTP_USER}>`,
        to: "tech@ogrelogic.com", // YOUR ADMIN EMAIL
        replyTo: input.email,
        subject: `${input.firstname} ${input.lastname}`,
        text: `You have a new contact form submission:\n\nName: ${input.firstname} ${input.lastname}\nEmail: ${input.email}\nMessage: ${input.message}`,
      };

      try {
        await transporter.sendMail(adminMail);

        return { success: true };
      } catch (err) {
        // console.error("Email Error:", err);
        throw new Error("Failed to send emails");
      }
    }
  }),

  // USEREMAIL NOTIFICATION

  sendThankYouEmail: defineAction({
    input: z.object({
      email: z.string().email(),
      message: z.string(),
      lastname: z.string(),
      firstname: z.string(),
    }),
    handler: async (input) => {
      const transporter = nodemailer.createTransport({
        host: import.meta.env.SMTP_HOST,
        port: Number(import.meta.env.SMTP_PORT),
        auth: {
          user: import.meta.env.SMTP_USER,
          pass: import.meta.env.SMTP_PASS,
        },
      });

      //  MAIL TO USER 
      const userMail = {
        from: ` <${import.meta.env.SMTP_USER}>`,
        to: input.email,
        subject: "Thanks for contacting us!",
        text: `Hi ${input.firstname},\n\nThank you for reaching out to us. We have received your message and our team will get back to you shortly.\n\nBest Regards`,
      };

      try {
        await transporter.sendMail(userMail);

        return { success: true };
      } catch (err) {
        // console.error("Email Error:", err);
        throw new Error("Failed to send emails");
      }
    }
  }),

  sendEmailestimateemail: defineAction({
    input: z.object({
      firstname: z.string(),
      lastname: z.string(),
      email: z.string().email(),
      message: z.string().optional(),
      // New fields added here:
      streetAddress: z.string().optional(),
      townCity: z.string().optional(),
      phone: z.string().optional(),
      product: z.string().optional(),
      hearAboutUs: z.string().optional(),
      promoCode: z.string().optional(),
    }),
    handler: async (input) => {
      const transporter = nodemailer.createTransport({
        host: import.meta.env.SMTP_HOST,
        port: Number(import.meta.env.SMTP_PORT),
        auth: {
          user: import.meta.env.SMTP_USER,
          pass: import.meta.env.SMTP_PASS,
        },
      });

      // 1. MAIL TO ADMIN (You receive this with all details)
      const adminMail = {
        from: `"Website Form" <${import.meta.env.SMTP_USER}>`,
        to: "tech@ogrelogic.com", // YOUR ADMIN EMAIL
        replyTo: input.email,
        subject: `${input.firstname} ${input.lastname}`,
        text: `
New contact form submission:
Name: ${input.firstname} ${input.lastname}
Email: ${input.email}
Phone: ${input.phone || 'N/A'}
Address: ${input.streetAddress}, ${input.townCity}
Product Interest: ${input.product}
How they heard: ${input.hearAboutUs}
Promo Code: ${input.promoCode || 'None'}

Message:
${input.message}
        `,
      };

      try {
        await transporter.sendMail(adminMail);

        return { success: true };
      } catch (err) {
        // console.error("Email Error:", err);
        throw new Error("Failed to send emails");
      }
    }
  }),


    sendThankYouEmailestimate: defineAction({
    input: z.object({
     firstname: z.string(),
      lastname: z.string(),
      email: z.string().email(),
      message: z.string().optional(),
      // New fields added here:
      streetAddress: z.string().optional(),
      townCity: z.string().optional(),
      phone: z.string().optional(),
      product: z.string().optional(),
      hearAboutUs: z.string().optional(),
      promoCode: z.string().optional(),
    }),
    handler: async (input) => {
      const transporter = nodemailer.createTransport({
        host: import.meta.env.SMTP_HOST,
        port: Number(import.meta.env.SMTP_PORT),
        auth: {
          user: import.meta.env.SMTP_USER,
          pass: import.meta.env.SMTP_PASS,
        },
      });

      //  MAIL TO USER 
      const userMail = {
        from: ` <${import.meta.env.SMTP_USER}>`,
        to: input.email,
        subject: "Thanks for contacting us!",
        text: `Hi ${input.firstname},\n\nThank you for reaching out regarding ${input.product}. We have received your message and our team will get back to you shortly.\n\nBest Regards`,
      };

      try {
        await transporter.sendMail(userMail);

        return { success: true };
      } catch (err) {
        // console.error("Email Error:", err);
        throw new Error("Failed to send emails");
      }
    }
  }),

}