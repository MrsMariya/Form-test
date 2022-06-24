import React, { useState } from "react";

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [message, setMessage] = useState('');
  const [errorName, setErrorName] = useState('Поле не может быть пустым!');
  const [errorEmail, setErrorEmail] = useState('Поле не может быть пустым!');
  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  const blurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch(event.target.name){
      case 'nameLastname' : setIsValidName(true)
      break
      case 'email' : setIsValidEmail(true)
      break
    }
  }

  const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value.toUpperCase())
    const firstName = event.target.value.split(' ')[0]
    const lastName = event.target.value.split(' ')[1]
    console.log(typeof(firstName))
    if(firstName.length < 3) {
      setErrorName('Длина должна быть не менее 3 букв')
    }
      else if(name.split(' ').length < 2) {
      setErrorName('Необходимо ввести имя и фамилию')
    } else if(lastName.length < 3) {
      setErrorName('Длина должна быть не менее 3 букв')
    }  else {
      setErrorName('')
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
          <label htmlFor={'nameLastname'}>
            Имя, фамилия
            <input type={'text'}
             placeholder={'Введите Ваши имя, фамилию'}
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
            <input type={'text'}
             placeholder={'Введите Ваш номер телефона'}
             name={'phone'}
             value={phone}
             onChange={(e) => setPhone(e.target.value)}
             />
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
