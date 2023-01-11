const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { generateError } = require("../../helpers");

const { CLIENT_SECRET, CLIENT_ID, REFRESH_TOKEN, CLIENT_USER } = process.env;

const sendEmail = async (email, registrationCode) => {
  try {
    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oAuth2Client.setCredentials({
      refresh_token: REFRESH_TOKEN,
    });

    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "martin.tc.wdev@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
      },
    });

    const mailOptions = {
      from: `martin - ${CLIENT_USER}`,
      to: email,
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
      </html>`,
    };

    const info = await transporter.sendMail(mailOptions);

    return info;
  } catch (error) {
    generateError("Error en el envio del correo", 409);
  }
};

module.exports = sendEmail;
