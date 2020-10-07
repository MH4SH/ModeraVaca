import styled from "styled-components";

export const ContainerLogin = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  section {
    width: 100%;
    max-width: 350px;
    margin-right: 30px;
  }

  section form {
    margin-top: 75px;
    margin-left: 25px;
    margin-bottom: 45px;
  }

  section form h1 {
    font-size: 28px;
    margin-bottom: 20px;
  }

  section p {
    font-size: 18px;
    margin-left: 25px;
  }

  section > a {
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    color: #6999ea;
    margin-left: 25px;
  }
`;

export const FormInput = styled.div`
  display: flex;
  flex-direction: column;
`;
