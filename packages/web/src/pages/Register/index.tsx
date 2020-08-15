import React, {useState, FormEvent} from 'react';
import {Link, useHistory} from 'react-router-dom';

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
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    const history = useHistory();
    //history.push('/perfil')

    const handleChange = async (event: FormEvent) => {
        event.preventDefault();

        if(password!==passwordCheck){
            alert("Senhas não são idênticas!");
            return setPasswordCheck("");
        }
        try {
            const response = await api.post('auth/register', {phone, email, name, city, uf, password});

            localStorage.setItem('userToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            history.push('/');
        } catch (err){
            console.log(err);
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
                            <label htmlFor="phone">seu celular para login com ddd</label>
                            <input type="number" id="phone" value={phone} onChange={e=>setPhone(e.target.value)} required={true} minLength={10} />
                        </div>
                        <div>
                            <label htmlFor="email">email</label>
                            <input type="email" id="email" value={email} onChange={e=>setEmail(e.target.value)} required={true} />
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <label htmlFor="name">nome</label>
                            <input type="text" id="name" value={name} onChange={e=>setName(e.target.value)} required={true} />
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <label htmlFor="city">cidade</label>
                                <input type="text" id="city" value={city} onChange={e=>setCity(e.target.value)} required={true} />
                            </div>
                            <div className="col-1">
                                <label htmlFor="uf">uf</label>
                                <select id="uf" value={uf} onChange={e=>setUf(e.target.value)} required={true}>
                                    <option value=""></option>
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
                                </select> 
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <label htmlFor="password">senha</label>
                            <input type="password" id="password" value={password} onChange={e=>setPassword(e.target.value)} required={true} />
                        </div>
                        <div>
                            <label htmlFor="passwordB">confirme a senha</label>
                            <input type="password" id="passwordB" value={passwordCheck} onChange={e=>setPasswordCheck(e.target.value)} required={true} />
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