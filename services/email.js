import nodemailer from "nodemailer";
export async function sendEmail(dest, subject, message, attachments = []) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "roucloud724@gmail.com", // generated ethereal user
      pass: "ntgycawzrunkejfm", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Alexa" <roucloud724@gmail.com>`, // sender address
    to: dest, // list of receivers
    subject, // Subject line
    html: message, // html body
    attachments,
  });
  return info;
}
