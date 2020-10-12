/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/Auth';
import getValidationErros from '../../utils/getValidationErros';

import farmImg from '../../assets/farm-login.svg';
import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { ContainerLogin, FormInput } from './styles';

interface SingInData {
  email?: string;
  phone?: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [formPhone, setFormPhone] = useState(true);

  const { singIn } = useAuth();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SingInData) => {
      formRef.current?.setErrors({});
      try {
        if (data.email !== undefined) {
          const schema = Yup.object().shape({
            email: Yup.string()
              .required('E-mail obrigatório')
              .email('Digite um e-mail válido'),
            password: Yup.string().required('Senha obrigatória'),
          });
          await schema.validate(data, {
            abortEarly: false,
          });
        } else {
          const schema = Yup.object().shape({
            phone: Yup.string().required('Numero de Telefone obrigatório'),
            password: Yup.string().required('Senha obrigatória'),
          });
          await schema.validate(data, {
            abortEarly: false,
          });
        }

        await singIn({
          access: data?.email || data?.phone || '',
          password: data.password,
        });

        history.push('/nascimentos');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          console.log('Errors', err);
          return formRef.current?.setErrors(getValidationErros(err));
        }

        if (err.response.status === 400) {
          alert(`Celular ou Email não encontrado!`);
        } else if (err.response.status === 403) {
          alert(`Senha incorreta!`);
        }
      }
    },
    [history, singIn],
  );

  const inputAccess = () => {
    if (formPhone) {
      return (
        <FormInput>
          <Input type="number" name="phone">
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
        <Input type="string" name="email">
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
