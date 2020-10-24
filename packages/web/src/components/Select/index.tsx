/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  useRef,
  SelectHTMLAttributes,
  useEffect,
  useCallback,
  useState,
} from 'react';
import { v4 } from 'uuid';
import { useField } from '@unform/core';

import { Label, SelectElement } from './styles';

interface LabelProps {
  text: string;
  span?: {
    text: string;
    onClick(): void;
  };
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: LabelProps;
}

const Input: React.FC<SelectProps> = ({ name, label, children, ...rest }) => {
  const hasLabel = !!label;
  const hasSpan = !!label?.span;
  const inputRef = useRef<HTMLSelectElement>(null);
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
      <SelectElement
        hasError={!!error}
        isField={isField}
        isFocused={isFocused}
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      >
        {children}
      </SelectElement>
    </Label>
  ) : (
    <SelectElement
      hasError={!!error}
      isField={isField}
      isFocused={isFocused}
      onFocus={handleInputFocused}
      onBlur={handleInputBlur}
      defaultValue={defaultValue}
      ref={inputRef}
      {...rest}
    >
      {children}
    </SelectElement>
  );
};

export default Input;
