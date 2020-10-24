/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  useRef,
  InputHTMLAttributes,
  useEffect,
  useCallback,
  useState,
} from 'react';
import { v4 } from 'uuid';
import { useField } from '@unform/core';

import { Label, InputElement } from './styles';

interface LabelProps {
  text: string;
  span?: {
    text: string;
    onClick(): void;
  };
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: LabelProps;
}

const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  const hasLabel = !!label;
  const hasSpan = !!label?.span;
  const inputRef = useRef<HTMLInputElement>(null);
  const idElement = v4();
  const [isFocused, setIsFocused] = useState(false);
  const [isField, setIsField] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocused = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsField(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return hasLabel ? (
    <Label htmlFor={idElement}>
      {label?.text}
      {hasSpan && (
        <span onClick={label?.span?.onClick}>{label?.span?.text}</span>
      )}
      <InputElement
        id={idElement}
        hasError={!!error}
        isField={isField}
        isFocused={isFocused}
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Label>
  ) : (
    <InputElement
      hasError={!!error}
      isField={isField}
      isFocused={isFocused}
      onFocus={handleInputFocused}
      onBlur={handleInputBlur}
      defaultValue={defaultValue}
      ref={inputRef}
      {...rest}
    />
  );
};

export default Input;
