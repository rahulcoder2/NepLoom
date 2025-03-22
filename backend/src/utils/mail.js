import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS,
    },
});

const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Neploom',
        link: process.env.FRONTEND_URL,
    },
});

export const sendEmail = async (options) => {
    try {
        const transporter = createTransporter();
        const emailHtml = mailGenerator.generate(options.mailgenContent);
        const emailText = mailGenerator.generatePlaintext(options.mailgenContent);

        const mailOptions = {
            from: 'mail.neploom@gmail.com',
            to: options.email,
            subject: options.subject,
            text: emailText,
            html: emailHtml,
        };

        return await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Email sending failed:', error);
        throw error;
    }
};

export const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: 'We got a request to reset the password of our account',
            action: {
                instructions: 'To reset your password click on the following button:',
                button: {
                    color: '#22BC66',
                    text: 'Reset password',
                    link: passwordResetUrl,
                },
            },
            outro: "Need help or have questions? Just reply, we're here to help.",
        },
    };
};
