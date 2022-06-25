import React, { useState } from "react";
import NameInput from "../inputs/NameInput";
import PhoneInput from "../inputs/PhoneInput";

const Form = () => {

  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [message, setMessage] = useState('');

  const [errorEmail, setErrorEmail] = useState('Поле не может быть пустым!');

  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  const blurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch(event.target.name){
      case 'email' : setIsValidEmail(true)
      break
    }
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

  return (
    <div className={'wrapper'}>
      <form className={'contact-form'} onSubmit={handleSubmit}>
        <h1>Свяжитесь с нами!</h1>
          <NameInput />
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
          <PhoneInput />
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
             onChange={(e) => setMessage(e.target.value)}
                />
          </label>
        <button className={'send-button'} type={'submit'}>
          Отправить
        </button>
      </form>
    </div>
  )
};

export default Form;
