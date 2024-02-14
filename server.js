const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tayachi.fedi.developer@gmail.com',
    pass: 'qimi wwor omjj klrh',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

app.post('/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    const mailOptions = {
      from: 'your@gmail.com',
      to: 'tayachi.fedi.developer@gmail.com',
      subject: 'New Contact Form Submission',
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    res.status(200).json({ code: 200, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ code: 500, message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
