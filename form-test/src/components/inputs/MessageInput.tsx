import { useState } from 'react';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isValidMessage, setIsValidMessage] = useState(false);

  const blurHandler = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    event.target.name === 'message' ? setIsValidMessage(true) :  setIsValidMessage(false);
   }

  const messageHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = event.target.value;
    value.length < 10 || value.length > 300 ? setErrorMessage('Необходимо ввести от 10 до 300 символов') : setErrorMessage('');
    setMessage(value);
  }

  return (
    <label htmlFor={'message'}>
      Сообщение
      <textarea name={'message'}
      placeholder={'Сообщение...'}
      rows={5}
      value={message}
      onChange={(e) => messageHandler(e)}
      onBlur={(e) => blurHandler(e)}
      />
       {(isValidMessage && errorMessage) && <span className={'error-message'}>{errorMessage}</span>}
  </label>
  )
}

export default MessageInput;
