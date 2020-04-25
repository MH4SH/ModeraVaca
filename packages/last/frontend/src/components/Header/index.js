import React from 'react';
import {NavLink} from 'react-router-dom';

import logoImg from '../../assets/logo-white.svg';
import perfilImg from '../../assets/perfil.png';

import './styles.css';

export default function Header(){
    return (
        <header className="header">
            <div className="container">
                <NavLink to="/" className="grid-3">
                    <img src={logoImg} alt="Modera Vaca" />
                </NavLink>
                <div className="grid-13 row header_menu">
                    <div>
                        <img src={perfilImg} alt="Perfil"/>
                    </div>
                    <button>sitio oliveira</button>
                    <nav>
                        <ul>
                            <li><NavLink to="/" exact activeClassName='active'>Inicio</NavLink></li>
                            <li><NavLink to="/fichas" activeClassName='active'>Fichas</NavLink></li>
                            <li><NavLink to="/pendente" activeClassName='active'>Rebanho Pendente</NavLink></li>
                            <li><NavLink to="/transacoes" activeClassName='active'>Transações</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}