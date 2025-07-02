import { cva } from "class-variance-authority";
import { RightIcon } from "../RightArrow/RightArrow";
import { useTerminal } from "../../main";
import { useState } from "react";
import type {
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEventHandler,
  ChangeEventHandler,
} from "react";

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const inputStyles = cva([
  "text-emerald-500",
  "w-full",
  "focus:border-0",
  "focus:outline-0",
]);

export function Input({ onChange, onKeyDown, ...props }: InputProps) {
  const [value, setValue] = useState<string>();
  const { updateInputHistory } = useTerminal();

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (
    inputChangeEvent
  ) => {
    if (onChange) onChange(inputChangeEvent);
    setValue(inputChangeEvent.target.value);
  };

  const keyDownHandler: KeyboardEventHandler<HTMLInputElement> = (
    keyDownEvent
  ) => {
    if (onKeyDown) onKeyDown(keyDownEvent);
    const { key } = keyDownEvent;
    if (key !== "Enter" || !value) return;
    updateInputHistory(value);
    setValue("");
  };

  return (
    <div className="flex items-center">
      <RightIcon className="fill-emerald-500" height={12} width={12} />
      <input
        value={value}
        className={`${inputStyles()}`}
        {...props}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
      />
    </div>
  );
}
