import React, { ButtonHTMLAttributes } from 'react';

import { ButtonElement } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <ButtonElement type="button" {...rest}>
    {children}
  </ButtonElement>
);

export default Button;
