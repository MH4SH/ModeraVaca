import styled from "styled-components";
import { shade } from "polished";

export const ButtonElement = styled.button`
  display: inline-block;
  width: 50%;
  height: 40px;
  background: #6999ea;
  border: 0;
  border-radius: 5px;

  color: #fff;
  font-family: "Ubuntu", sans-serif;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  font-size: 18px;

  transition: background 0.3s;
  cursor: pointer;

  &:hover {
    background: ${shade(0.2, "#6999ea")};
  }
`;
