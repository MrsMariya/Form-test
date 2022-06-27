type PropsType = {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: PropsType) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      onChange={(e) => props.setValue(e)}
      onBlur={(e) => props.setBlur(e)}
    />
  )
}

export default Input;
