import styled from "styled-components";

export const ContainerRegister = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InfoRegister = styled.section`
  width: 100%;
  max-width: 350px;
  margin: 0 30px 0 0;

  h1 {
    font-size: 28px;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    line-height: 30px;
    margin-bottom: 75px;
  }
`;

export const FormRegister = styled.section`
  width: 100%;
  margin-right: 32px;

  form {
    margin-top: 75px;
    margin-left: 25px;
    margin-bottom: 45px;
  }

  form h1 {
    font-size: 28px;
    margin-bottom: 32px;
  }

  form div.row {
    flex-direction: row;
    display: flex;
  }

  form > div.row div + div {
    margin-left: 32px;
  }

  form > div.row div {
    flex: 1;
  }

  form > div.row > div > .col-3 {
    flex: 3;
  }

  form > div.row input,
  select {
    margin-top: 5px;
    margin-bottom: 20px;
    border-radius: 5px;
  }

  p {
    font-size: 18px;
  }

  a {
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    color: #6999ea;
  }
`;
