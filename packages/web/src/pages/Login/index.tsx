import React, { useState, FormEvent} from 'react';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';

import farmImg from '../../assets/farm-login.svg';
import logoImg from '../../assets/logo.svg'

import { ContainerLogin, FormInput } from './styles';

export default function Login() {
    const [access, setAccess] = useState("");
    const [password, setPassword] = useState("");
    const [formPhone, setFormPhone] = useState(true);

    const history = useHistory();


    const handleChange = async (event: FormEvent) => {
        event.preventDefault();
        if(!access)
            return alert(`Acesso não preenchido!`);
        if(!password)
            return alert(`Senha não preenchido!`);

        try {
            const response = await api.post('auth/authenticate', {access, password});

            localStorage.setItem('userToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            history.push('/');

        } catch (err){
            if(err.response.status===400){
                alert(`Celular ou Email não encontrado!`);
                setAccess("");
            } else if(err.response.status===403){
                alert(`Senha incorreta!`);
            }
        }
    }


    const inputAccess = () => {
        if(formPhone){
            return (
                <FormInput>
                    <label htmlFor="access">seu celular ou <span onClick={()=>{setFormPhone(false)}}>seu email aqui</span></label>
                    <input type="number" id="access" value={access} onChange={e=> setAccess(e.target.value)} required={true}/>
                </FormInput>
                )
        } else {
            return (
                <FormInput>
                    <label htmlFor="access">seu email ou <span onClick={()=>{setFormPhone(true)}}>seu celular aqui</span></label>
                    <input type="email" id="access" value={access} onChange={e=> setAccess(e.target.value)} required={true}/>
                </FormInput>
                )
        }
    }
    
    return (
        <ContainerLogin>
            <section className="form">
                <img src={logoImg} alt="Logo ModeraVaca" />
                <form onSubmit={handleChange}>
                    <h1>fazer login</h1>
                    { inputAccess() }
                    <div className="from-input">
                        <label htmlFor="pass">sua senha</label>
                        <input type="password" id="pass" value={password} onChange={e=> setPassword(e.target.value)}/>
                    </div>
                    <button className="button" type="submit">entrar</button>
                </form>
                <p>ainda não tem conta?</p>
                <Link to="/registrar">se cadastrar</Link>
            </section>

            <img src={farmImg} alt="Fazenda" />
        </ContainerLogin>
    )
}