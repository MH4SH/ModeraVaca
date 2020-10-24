import styled, { css } from 'styled-components';

interface SelectProps {
  isField: boolean;
  isFocused: boolean;
  hasError: boolean;
}

export const Label = styled.label`
  margin-bottom: 5px;

  & > span {
    cursor: pointer;
    color: #6999ea;
    margin-left: 5px;
  }
`;

export const SelectElement = styled.select<SelectProps>`
  margin-bottom: 20px;
  border-radius: 5px;
  margin-top: 5px;

  font: 400 18px Roboto, sans-setif;
  color: #212421;

  outline: 0;
  width: 100%;
  height: 40px;
  border: 2px solid #b5e2b6;
  background: #eff6ef;
  border: 0px solid #dcdce6;
  padding: 0 10px;

  ${props =>
    props.isField &&
    css`
      border: 2px solid #b5e2b6;
    `}

  ${props =>
    props.isFocused &&
    css`
      border: 2px solid #b5e2b6;
    `}
  ${props =>
    props.hasError &&
    css`
      background-color: #f6f0ef;
      border: 2px solid #e2bab5;
    `}
`;
