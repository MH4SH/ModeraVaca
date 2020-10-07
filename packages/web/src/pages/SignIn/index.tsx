/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";

import { useAuth } from "../../hooks/Auth";

import farmImg from "../../assets/farm-login.svg";
import logoImg from "../../assets/logo.svg";

import Button from "../../components/Button";
import Input from "../../components/Input";

import { ContainerLogin, FormInput } from "./styles";

interface SingInData {
  access: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [access, setAccess] = useState("");
  const [password, setPassword] = useState("");
  const [formPhone, setFormPhone] = useState(true);

  const { singIn } = useAuth();

  const history = useHistory();

  const handleSubmit = useCallback(async (data: SingInData) => {
    formRef.current?.setErrors({});
    try {
      await singIn({
        access: data.access,
        password: data.password,
      });
      history.push("/nascimentos");
      console.log(data);
    } catch (err) {
      alert(`Celular ou Email não encontrado!`);
      // if (err.response.status === 400) {
      //   alert(`Celular ou Email não encontrado!`);
      //   setAccess("");
      // } else if (err.response.status === 403) {
      //   alert(`Senha incorreta!`);
      // }
    }
  }, []);

  const inputAccess = () => {
    if (formPhone) {
      return (
        <FormInput>
          <Input type="number" name="access">
            seu celular ou
            <span
              onClick={() => {
                setFormPhone(false);
              }}
            >
              seu email aqui
            </span>
          </Input>
        </FormInput>
      );
    }
    return (
      <FormInput>
        <Input type="email" name="access">
          seu email ou
          <span
            onClick={() => {
              setFormPhone(true);
            }}
          >
            seu celular aqui
          </span>
        </Input>
      </FormInput>
    );
  };

  return (
    <ContainerLogin>
      <section className="form">
        <img src={logoImg} alt="Logo ModeraVaca" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>fazer login</h1>
          {inputAccess()}
          <FormInput>
            <Input type="password" name="password">
              sua senha
            </Input>
          </FormInput>
          <Button type="submit">entrar</Button>
        </Form>
        <p>ainda não tem conta?</p>
        <Link to="/registrar">se cadastrar</Link>
      </section>

      <img src={farmImg} alt="Fazenda" />
    </ContainerLogin>
  );
};

export default SignIn;
