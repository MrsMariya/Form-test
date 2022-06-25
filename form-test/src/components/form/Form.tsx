import React, { useState } from 'react';

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    let value = event.target.value.replace(/[0-9а-я.]/g, '').toUpperCase().replace(/\s/g, ' ');
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

    value=value.split(' ').join(' ')
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
            <input type={'text'}
              placeholder={'Введите Ваши имя и фамилию латинскими буквами'}
              name={'nameLastname'}
              value={name}
              onBlur={(e)=> blurHandler(e)}
              onChange={(e) => nameHandler(e)}
              />
              {(isValidName && errorName) && <span className={'error-message'}>{errorName}</span>}
          </label>
          <label htmlFor={'email'}>
            E-mail
            <input type={'text'}
             placeholder={'Введите Ваш e-mail'}
             name={'email'}
             value={email}
             onChange={(e) => emailHandler(e)}
             onBlur={(e)=> blurHandler(e)}
             />
            {(isValidEmail && errorEmail) && <span className={'error-message'}>{errorEmail}</span>}
          </label>
          <label htmlFor={'phone'} >
            Номер телефона
            <input type={'tel'}
              placeholder={'Введите Ваш номер телефона'}
              name={'phone'}
              value={phone}
              onChange={(e) => phoneHandler(e)}
              onBlur={(e) => blurHandler(e)}
            />
            {(isValidPhone && errorPhone) && <span className={'error-message'}>{errorPhone}</span>}
          </label>
          <label htmlFor={'birthDate'} >
            Дата рождения
            <input type={'date'}
             placeholder={'Выберите Вашу дата рождения'}
             name={'birthDate'}
             value={birthDate}
             onChange={(e) => setBirthDate(e.target.value)}
             />
          </label>
          <label htmlFor={'message'} >
            Сообщение
            <textarea name={'message'}
             maxLength={300}
             placeholder={'Сообщение...'}
             rows={5}
             value={message}
             onChange={(e) => messageHandler(e)}
             onBlur={(e) => blurHandler(e)}
            />
            {(isValidMessage && errorMessage) && <span className={'error-message'}>{errorMessage}</span>}
          </label>
        <button className={'send-button'} type={'submit'}>
          Отправить
        </button>
      </form>
    </div>
  )
};

export default Form;
