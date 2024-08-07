const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: false, // Use true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

const sendOrderEmail = (orderData, callback) => {
  const { order, username, phoneNumber, email } = orderData;

  let itemsHtml = '';
  order.forEach(item => {
    itemsHtml += `
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
        <td style="border: 1px solid #ddd; padding: 8px;"><img src="${item.image}" alt="${item.name}" width="50" height="50"></td>
        <td style="border: 1px solid #ddd; padding: 8px;">${item.size}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${item.color}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${item.price}</td>
      </tr>
    `;
  });

  const mailOptions = {
    from: 'ottojoash48@outlook.com',
    to: email,
    subject: 'Your Order Confirmation',
    html: `
      <h1>Thank you for your order, ${username}.</h1>
      <p>Order Details:</p>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px;">Product Name</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Image</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Size</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Color</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      <p><strong>Username:</strong> ${username}</p>
      <p><strong>Phone Number:</strong> ${phoneNumber}</p>
      <p><strong>Email:</strong> ${email}</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      callback(error, null);
    } else {
      console.log('Email sent: ' + info.response);
      callback(null, info);
    }
  });
};

module.exports = sendOrderEmail;
