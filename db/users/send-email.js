const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { generateError } = require("../../helpers");

const { CLIENT_PASS, CLIENT_USER } = process.env;

const sendEmail = async (email, registrationCode) => {
  
  try {
 
    const transporter = nodemailer.createTransport({
      host:"smtp.gmail.com",
      port:587,
      auth:{
        user:CLIENT_USER,
        pass:CLIENT_PASS
      }
    })

    const info = await transporter.sendMail({
      from:CLIENT_USER,
      to:email,
      subject: "Verificacion gmail",
      text: `Verificacion Amitas`,
      html: `<!DOCTYPE html>
      <html lang="en">
        <head></head>
        <body >
        <h1>AMitas</h1>
          <article>
            <h1 style="background-color: lightblue">Este es su codigo de registro ${registrationCode}</h1>
          </article>
        </body>
      </html>` 
    })
  
    return info;
  } catch (error) {
    generateError("Error en el envio del correo", 409);
  }
};

module.exports = sendEmail;
