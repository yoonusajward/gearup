import nodemailer from "nodemailer";

export const sendEmail = async (recipient, subject, text) => {
  try {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const mailOptions = {
      from: '"GearUp Support" <support@gearup.com>',
      to: recipient,
      subject: subject,
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email.");
  }
};
