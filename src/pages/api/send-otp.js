import nodemailer from 'nodemailer';

export const POST = async ({ request }) => {
    try {
        const { email, otp, firstName } = await request.json();

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "greenmountainfencecompany@gmail.com",
                pass: "jdiw kwrm sflw absj",
            },
        });

        await transporter.sendMail({
            from: '"Green Mountain Fence"',
            to: email,
            subject: `${otp} is your verification code`,
            html: `<h3>Hello ${firstName},</h3>
                   <p>Your verification code for the contact form is: <b>${otp}</b></p>
                   <p>Please enter this code to complete your submission.</p>`,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
};