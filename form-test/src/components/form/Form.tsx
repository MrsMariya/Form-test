import axios from 'axios';
import React, { useState } from 'react';
import { ID, URL } from '../../constants/constants';
import Input from '../inputs/Input';

const Form = () => {

  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isValidMessage, setIsValidMessage] = useState(false);
  const [errorEmail, setErrorEmail] = useState('Поле не может быть пустым!');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState('Поле не может быть пустым!');
  const [isValidName, setIsValidName] = useState(false);
  const [phone, setPhone] = useState('');
  const [errorPhone, setErrorPhone] = useState('Поле не может быть пустым!');
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [text, setText] = useState('');

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
        .then((res) => {
          console.log(res.data.result)
          setText('Сообщение доставлено!')
        })
    } catch(e) {
      setText('Возникла ошибка!')
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendForm(name, email, phone, birthDate, message);
    setName('');
    setErrorName('');
    setEmail('');
    setBirthDate('');
    setPhone('');
    setMessage('');
  }

  const blurHandler = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    switch(event.target.name){
      case 'email' : setIsValidEmail(true)
      break
      case 'message': setIsValidMessage(true)
      break
      case 'nameLastname': setIsValidName(true)
      break
      case 'phone': setIsValidPhone(true)
      break
    }
  }

  const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/[0-9а-яА-Я.]/g, '').toUpperCase();
    const firstName = value.split(' ')[0]
    const lastName = value.split(' ')[1]

    if(value.charAt(0) === ' '){
     return value === ''
    }

    if(firstName.length < 3 || firstName.length > 30) {
      setErrorName('Длина должна быть не менее 3 и не более 30 символов')
    } else if(name.split(' ').length < 2 || name.split(' ').length > 2) {
      setErrorName('Необходимо ввести имя и фамилию')
    } else if(lastName.length < 3 || lastName.length > 30) {
      setErrorName('Длина должна быть не менее 3 и не более 30 символов')
    } else if(lastName.includes(' ')){
      return lastName.replace(/\s/g, '')
    } else {
      setErrorName('')
    }

    setName(value)
  }

  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    const re = /\S+@\S+\.\S+/;
    if(!re.test(event.target.value)){
      setErrorEmail('Некорректный адрес')
    } else {
      setErrorEmail('')
    }
  }

  const phoneHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, '')
    let result;
    const prefixNumber = (str: string) => {
      if (str === '7') {return '7 ('};
      if (str === '8') {return '8 ('};
      if (str === '9') {return '7 (9'};
      return '7 (';
    };

    (value.includes('+8') || value[0] === '8') ? result = '': result = '+';
    for (let i = 0; i < value.length && i < 11; i++) {
      switch (i) {
        case 0:
          result += prefixNumber(value[i]);
          continue;
        case 4:
          result += ') ';
          break;
        case 7:
          result += '-';
          break;
        case 9:
          result += '-';
          break;
        default:
          break;
      }
      result += value[i];
    }
    value = result
    setPhone(value)
    setErrorPhone('')

    if(value.length < 18) {
      setErrorPhone('Необходимо ввести 11 цифр')
    }
  }

  const messageHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = event.target.value;
    value.length < 10 || value.length > 300 ? setErrorMessage('Необходимо ввести от 10 до 300 символов') : setErrorMessage('');
    setMessage(value);
  }

  return (
    <div className={'wrapper'}>
      <form className={'contact-form'} onSubmit={handleSubmit}>
        <h1>Свяжитесь с нами!</h1>
          <label htmlFor={'nameLastname'}>
            Имя, фамилия
            <Input
              type={'text'}
              placeholder={'Введите Ваши имя и фамилию латинскими буквами'}
              name={'nameLastname'}
              value={name}
              setBlur={blurHandler}
              setValue={nameHandler}
              />
              {(isValidName && errorName) && <span className={'error-message'}>{errorName}</span>}
          </label>
          <label htmlFor={'email'}>
            E-mail
            <Input
              type={'text'}
              placeholder={'Введите Ваш e-mail'}
              name={'email'}
              value={email}
              setValue={emailHandler}
              setBlur={blurHandler}
             />
            {(isValidEmail && errorEmail) && <span className={'error-message'}>{errorEmail}</span>}
          </label>
          <label htmlFor={'phone'} >
            Номер телефона
            <Input
              type={'tel'}
              placeholder={'Введите Ваш номер телефона'}
              name={'phone'}
              value={phone}
              setValue={phoneHandler}
              setBlur={blurHandler}
            />
            {(isValidPhone && errorPhone) && <span className={'error-message'}>{errorPhone}</span>}
          </label>
          <label htmlFor={'birthDate'} >
            Дата рождения
            <input 
              type={'date'}
              placeholder={'Выберите Вашу дата рождения'}
              name={'birthDate'}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
             />
          </label>
          <label htmlFor={'message'} >
            Сообщение
            <textarea
              name={'message'}
              placeholder={'Сообщение...'}
              rows={5}
              value={message}
              onChange={(e) => messageHandler(e)}
              onBlur={(e) => blurHandler(e)}
            />
            {(isValidMessage && errorMessage) && <span className={'error-message'}>{errorMessage}</span>}
          </label>
          <button className={'send-button'}
            type={'submit'}
            disabled={!!errorMessage.length || !!errorEmail.length || !!errorPhone.length || !!errorName.length || !birthDate.length}>
            Отправить
          </button>
            { (!name.length && !email.length && !phone.length && !birthDate.length && !message.length) &&
              <div className={'success'}>{text}</div> 
            }
      </form>
    </div>
  )
};

export default Form;
