import { useState } from 'react';

const PhoneInput = () => {
  const [phone, setPhone] = useState('');
  const [errorPhone, setErrorPhone] = useState('Поле не может быть пустым!');
  const [isValidPhone, setIsValidPhone] = useState(false);

  const blurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
   event.target.name === 'phone' ? setIsValidPhone(true) : setIsValidPhone(false);
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

  return (
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
  )
}

export default PhoneInput;
