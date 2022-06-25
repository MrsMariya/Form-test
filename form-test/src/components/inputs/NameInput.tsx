import { useState } from "react";

const NameInput = () => {
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState('Поле не может быть пустым!');
  const [isValidName, setIsValidName] = useState(false);

  const blurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.name === 'nameLastname' ? setIsValidName(true) : setIsValidName(false);
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
    } else {
      setErrorName('')
    }

    setName(value)
  }

  return (
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
  )
}

export default NameInput;
