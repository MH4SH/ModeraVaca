/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";

import farmImg from "../../assets/farm-login.svg";
import logoImg from "../../assets/logo.svg";

import { ContainerLogin, FormInput } from "./styles";

const SignIn: React.FC = () => {
  const [access, setAccess] = useState("");
  const [password, setPassword] = useState("");
  const [formPhone, setFormPhone] = useState(true);

  const history = useHistory();

  const handleChange = async (event: FormEvent) => {
    event.preventDefault();
    if (!access) return alert(`Acesso não preenchido!`);
    if (!password) return alert(`Senha não preenchido!`);

    try {
      const response = await api.post("auth/authenticate", {
        access,
        password,
      });

      localStorage.setItem("@ModeraVaca/token", response.data.token);
      localStorage.setItem(
        "@ModeraVaca/user",
        JSON.stringify(response.data.user)
      );

      history.push("/nascimentos");
    } catch (err) {
      if (err.response.status === 400) {
        alert(`Celular ou Email não encontrado!`);
        setAccess("");
      } else if (err.response.status === 403) {
        alert(`Senha incorreta!`);
      }
    }
  };

  const inputAccess = () => {
    if (formPhone) {
      return (
        <FormInput>
          <label htmlFor="accessPhone">
            seu celular ou
            <span
              onClick={() => {
                setFormPhone(false);
              }}
            >
              seu email aqui
            </span>
            <input
              type="number"
              id="accessPhone"
              value={access}
              onChange={(e) => setAccess(e.target.value)}
              required
            />
          </label>
        </FormInput>
      );
    }
    return (
      <FormInput>
        <label htmlFor="accessEmail">
          seu email ou
          <span
            onClick={() => {
              setFormPhone(true);
            }}
          >
            seu celular aqui
          </span>
          <input
            type="email"
            id="accessEmail"
            value={access}
            onChange={(e) => setAccess(e.target.value)}
            required
          />
        </label>
      </FormInput>
    );
  };

  return (
    <ContainerLogin>
      <section className="form">
        <img src={logoImg} alt="Logo ModeraVaca" />
        <form onSubmit={handleChange}>
          <h1>fazer login</h1>
          {inputAccess()}
          <FormInput>
            <label htmlFor="pass">
              sua senha
              <input
                type="password"
                id="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </FormInput>
          <button className="button" type="submit">
            entrar
          </button>
        </form>
        <p>ainda não tem conta?</p>
        <Link to="/registrar">se cadastrar</Link>
      </section>

      <img src={farmImg} alt="Fazenda" />
    </ContainerLogin>
  );
};

export default SignIn;
