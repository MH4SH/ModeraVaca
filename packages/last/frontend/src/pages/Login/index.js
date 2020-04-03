import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import farmImg from '../../assets/farm-login.svg';
import logoImg from '../../assets/logo.svg'

import './styles.css';

export default function Login() {
    const [id, setId] = useState("");
    const [formPhone, setFormPhone] = useState(true);

    const history = useHistory();
    //history.push('/perfil')

    const inputAccess = () => {
        if(formPhone){
            return (
                <div className="from-input">
                    <label for="access">seu celular ou <span onClick={()=>{setFormPhone(false)}}>seu email aqui</span></label>
                    <input type="number" id="access"/>
                </div>
                )
        } else {
            return (
                <div className="from-input">
                    <label for="access">seu email ou <span onClick={()=>{setFormPhone(true)}}>seu celular aqui</span></label>
                    <input type="email" id="access"/>
                </div>
                )
        }
    }
    
    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Logo ModeraVaca" />
                <form>
                    <h1>fazer login</h1>
                    { inputAccess()}
                    <div className="from-input">
                        <label for="pass">sua senha</label>
                        <input type="password" id="pass"/>
                    </div>
                    <button className="button" type="submit">entrar</button>
                </form>
                <p>ainda não tem conta?</p>
                <Link to="/registrar">se cadastrar</Link>
            </section>

            <img src={farmImg} alt="Fazenda" />
        </div>
    )
}