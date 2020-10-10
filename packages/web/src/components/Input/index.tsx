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

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: JSX.Element;
}

const Input: React.FC<InputProps> = ({ name, children, ...rest }) => {
  const hasLabel = !!children;
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
      {children}
      <InputElement
        id={idElement}
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
