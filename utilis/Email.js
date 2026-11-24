
import nodemailer from "nodemailer";

const emailSender = async (body) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL,
            ...body
        });

        console.log("Email sent successfully");

    } catch (error) {
        console.log(error.message);
        throw error.message;
    }
};

export default emailSender;
