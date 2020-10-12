import React, { useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

// import api from '../../services/api';

import farmImg from '../../assets/cow-register.svg';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';

import {
  ContainerRegister,
  InfoRegister,
  FormRegister,
  FormInput,
} from './styles';

interface SingUpData {
  phone: number;
  email: string;
  name: string;
  city: string;
  uf: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [uf, setUf] = useState('');

  const handleSubmit = useCallback(async (data: SingUpData) => {
    formRef.current?.setErrors({});
    try {
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }, []);
  // const handleChange = async (event: FormEvent) => {
  //   event.preventDefault();

  //   if (password !== passwordCheck) {
  //     alert('Senhas não são idênticas!');
  //     return setPasswordCheck('');
  //   }
  //   try {
  //     const response = await api.post('auth/register', {
  //       phone,
  //       email,
  //       name,
  //       city,
  //       uf,
  //       password,
  //     });

  //     localStorage.setItem('@ModeraVaca:token', response.data.token);
  //     localStorage.setItem(
  //       '@ModeraVaca:user',
  //       JSON.stringify(response.data.user),
  //     );

  //     history.push('/');
  //   } catch (err) {
  //     console.log(err);
  //     alert(`Falha: ${err.response.data.message} (${err.response.status})`);
  //   }
  // };

  return (
    <ContainerRegister>
      <InfoRegister>
        <h1>benefícios</h1>
        <p>
          - disponível offline
          <br />
          - controle o seu rebanho
          <br />
          - extrato de transações
          <br />
          - transações 100% protegidas
          <br />
          - controle mais de um sítio
          <br />
          - entre outros
          <br />
        </p>
        <img src={farmImg} alt="Fazenda" />
      </InfoRegister>
      <FormRegister>
        <img src={logoImg} alt="Logo ModeraVaca" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>se cadastre</h1>
          <div className="row">
            <FormInput>
              <Input
                type="number"
                name="phone"
                label={{
                  text: 'seu celular para login com ddd',
                }}
              />
            </FormInput>
            <FormInput>
              <Input
                type="email"
                name="email"
                label={{
                  text: 'email',
                }}
              />
            </FormInput>
          </div>
          <div className="row">
            <FormInput>
              <Input
                type="text"
                name="name"
                label={{
                  text: 'nome',
                }}
              />
            </FormInput>
            <div className="row">
              <FormInput className="col-3">
                <Input
                  type="text"
                  name="city"
                  label={{
                    text: 'cidade',
                  }}
                />
              </FormInput>
              <FormInput className="col-1">
                <Select
                  name="uf"
                  required
                  label={{
                    text: 'uf',
                  }}
                >
                  <option value=""> </option>
                  <option value="AC">AC</option>
                  <option value="AL">AL</option>
                  <option value="AP">AP</option>
                  <option value="AM">AM</option>
                  <option value="BA">BA</option>
                  <option value="CE">CE</option>
                  <option value="DF">DF</option>
                  <option value="ES">ES</option>
                  <option value="GO">GO</option>
                  <option value="MA">MA</option>
                  <option value="MT">MT</option>
                  <option value="MS">MS</option>
                  <option value="MG">MG</option>
                  <option value="PA">PA</option>
                  <option value="PB">PB</option>
                  <option value="PR">PR</option>
                  <option value="PE">PE</option>
                  <option value="PI">PI</option>
                  <option value="RJ">RJ</option>
                  <option value="RN">RN</option>
                  <option value="RS">RS</option>
                  <option value="RO">RO</option>
                  <option value="RR">RR</option>
                  <option value="SC">SC</option>
                  <option value="SP">SP</option>
                  <option value="SE">SE</option>
                  <option value="TO">TO</option>
                </Select>
              </FormInput>
            </div>
          </div>
          <div className="row">
            <FormInput>
              <Input
                type="password"
                name="password"
                label={{
                  text: 'senha',
                }}
              />
            </FormInput>
            <FormInput>
              <Input
                type="password"
                name="confirmPassword"
                label={{
                  text: 'confirme a senha',
                }}
              />
            </FormInput>
          </div>
          <div className="row">
            <div>
              <Button type="submit">cadastrar</Button>
            </div>
            <div>
              <p>já esta cadastrado?</p>
              <Link to="/entrar">fazer login</Link>
            </div>
          </div>
        </Form>
      </FormRegister>
    </ContainerRegister>
  );
};

export default SignUp;
