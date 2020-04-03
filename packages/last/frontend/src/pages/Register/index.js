import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import farmImg from '../../assets/cow-register.svg';
import logoImg from '../../assets/logo.svg'

import './styles.css';

export default function Login() {
    const [id, setId] = useState("");

    const history = useHistory();
    //history.push('/perfil')
    
    return (
        <div className="register-container">
            
            <section className="info">
                <h1>beneficios</h1>
                <p>
                    - disponivel offline <br/>
                    - controle o seu rebanho <br/>
                    - extrato de transações <br/>
                    - transações 100% protegidas <br/>
                    - controle mais de um sítio <br/>
                    - entre outros
                </p>
                <img src={farmImg} alt="Fazenda" />
            </section>


            <section className="form">
                <img src={logoImg} alt="Logo ModeraVaca" />
                <form>
                    <h1>se cadastre</h1>

                    <label for="phone">seu celular para login</label>
                    <input type="number" id="phone"/>

                    <label for="email">email</label>
                    <input type="email" id="email"/>

                    <label for="name">nome</label>
                    <input type="text" id="name"/>

                    <label for="city">cidade</label>
                    <input type="text" id="city"/>

                    <label for="uf">uf</label>
                    <input type="text" id="uf"/>

                    <label for="pass">senha</label>
                    <input type="password" id="pass"/>

                    <label for="passB">confirme a senha</label>
                    <input type="password" id="passB"/>

                    <button className="button" type="submit">cadastrar</button>
                </form>
                <p>já esta cadastrado?</p>
                <Link to="/entrar">fazer login</Link>
            </section>
        </div>
    )
}