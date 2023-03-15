import type { ChangeEventHandler } from "react";

interface InputProps {
  type: string;
  name: string;
  id?: string;
  placeHolder?: string;
  value?: string;
  classes: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function Input({
  type,
  name,
  id,
  placeHolder,
  value,
  classes,
  onChange,
}: InputProps) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeHolder}
      value={value}
      className={classes}
      onChange={onChange}
    />
  );
}
