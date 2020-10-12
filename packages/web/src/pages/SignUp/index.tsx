import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';
import getValidationErros from '../../utils/getValidationErros';

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
  passwordConfirmation: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SingUpData) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          phone: Yup.string().required('Numero de Telefone obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          name: Yup.string().required('Nome obrigatório'),
          city: Yup.string().required('Cidade obrigatório'),
          uf: Yup.string().required('Estado obrigatório'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          passwordConfirmation: Yup.string()
            .required('Confirmação de senha obrigatória')
            .oneOf([Yup.ref('password')], 'As senhas devem corresponder'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('auth/register', {
          phone: data.phone,
          email: data.email,
          name: data.name,
          city: data.city,
          uf: data.uf,
          password: data.password,
        });

        alert('Cadastro realizado com sucesso!');
        history.push('/entrar');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          console.log('Errors', err);
          return formRef.current?.setErrors(getValidationErros(err));
        }
        // Verificar se email existe e retornar mensagem
        // Retornar erro do de retorno da api.
      }
    },
    [history],
  );

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
                name="passwordConfirmation"
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
