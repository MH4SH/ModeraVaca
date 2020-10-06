import styled from "styled-components";

export const ButtonElement = styled.button`
  width: 50%;
  height: 40px;
  background: #6999ea;
  border: 0;
  color: #fff;
  font-family: "Ubuntu", sans-serif;
  font-weight: 700;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
  transition: filter 0.3s;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`;
