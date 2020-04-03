import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import farmImg from '../../assets/cow-register.svg';
import logoImg from '../../assets/logo.svg'

import './styles.css';

export default function Login() {
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");
    const [pass, setPass] = useState("");
    const [passB, setPassB] = useState("");

    const history = useHistory();
    //history.push('/perfil')

    const handleChange = async (e) => {
        e.preventDefault();

        if(pass!==passB){
            alert("Senhas não são identicas!");
            return setPassB("");
        }
        try {
            const response = await api.post('user/resgister', {phone, email, name, city, uf, pass});

            localStorage.setItem('userToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            history.push('/home');
        } catch (err){
            alert(`Falha: ${err.response.data.message} (${err.response.status})`);
        }
    }
    
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
                <form onSubmit={handleChange}>
                    <h1>se cadastre</h1>
                    <div className="row">
                        <div>
                            <label for="phone">seu celular para login</label>
                            <input type="number" id="phone" value={phone} onChange={e=>setPhone(e.target.value)} required="true" />
                        </div>
                        <div>
                            <label for="email">email</label>
                            <input type="email" id="email" value={email} onChange={e=>setEmail(e.target.value)} required="true" />
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <label for="name">nome</label>
                            <input type="text" id="name" value={name} onChange={e=>setName(e.target.value)} required="true" />
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <label for="city">cidade</label>
                                <input type="text" id="city" value={city} onChange={e=>setCity(e.target.value)} required="true" />
                            </div>
                            <div className="col-1">
                                <label for="uf">uf</label>
                                <input type="text" id="uf" value={uf} onChange={e=>setUf(e.target.value)} required="true" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <label for="pass">senha</label>
                            <input type="password" id="pass" value={pass} onChange={e=>setPass(e.target.value)} required="true" />
                        </div>
                        <div>
                            <label for="passB">confirme a senha</label>
                            <input type="password" id="passB" value={passB} onChange={e=>setPassB(e.target.value)} required="true" />
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <button className="button" type="submit">cadastrar</button>
                        </div>
                        <div>
                            <p>já esta cadastrado?</p>
                            <Link to="/entrar">fazer login</Link>
                        </div>
                    </div>

                </form>
            </section>
        </div>
    )
}