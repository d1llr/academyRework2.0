
import { mailOptions, transporter } from "../../config/nodemailer";

export default async (req, res) => {
  const data = JSON.parse(req.body);
  console.log(data);
  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: 'Заявка с сайта academy.ru',
      text: "Заявка с сайта academy.ru",
      html: `
      <h1>Новая заявка</h1>
      <ul>
      <li>Имя пользователя - ${data.firstName}</li>
      <li>Номер телефона - ${data.phone}</li>
      <li>Комментарий - ${data.comments}</li>
      </ul>
      `
    })
    res.status(200).json({ status: 'OK' });
  }
  catch (err) {
    console.log(err);
    res.status(400).json({ status: err });
  }
};