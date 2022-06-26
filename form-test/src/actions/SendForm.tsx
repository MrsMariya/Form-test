import axios from 'axios';

const TOKEN = '5486518024:AAF2Qv9uMwlMIEVtl1_5edN--8OBFpbTqeI';
const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
const ID = '-1001685911322'


const sendForm = async (name: string, email: string, phone: string, birthDate: string, message: string) => {
  let mes = `Информация о пользователе!\n`
      mes += `<b>Отправитель ${name}</b>\n`
      mes += `<b>Почта ${email}</b>\n`
      mes += `<b>Номер телефона ${phone}</b>\n`
      mes += `<b>Дата рождения ${birthDate}</b>\n`
      mes += `<b>Сообщение\n ${message}</b>`
  try {
     await axios.post( URL, {
      chat_id: ID,
      parse_mode: 'html',
      text: mes
      })
  } catch(e) {
    console.log(e)
  }
}

export default sendForm;