import React from 'react';
import { NavLink } from 'react-router-dom';

import logoImg from '../../assets/logo-white.svg';
// import perfilImg from "../../assets/perfil.png";

import { ContainerHeader, TopBarHeader, HeaderContent } from './styles';

const Header: React.FC = ({ children }) => {
  return (
    <ContainerHeader>
      <TopBarHeader>
        <NavLink to="/nascimentos" className="grid-3">
          <img src={logoImg} alt="Modera Vaca" />
        </NavLink>
        <div className="grid-9 row header_menu">
          <nav>
            <ul>
              {/* <li><NavLink to="/" exact activeClassName='active'>Financeiro</NavLink></li> */}
              {/* <li><NavLink to="/" exact activeClassName='active'>Investimento</NavLink></li> */}
              <li>
                <NavLink to="/nascimentos" activeClassName="active">
                  Nascimentos
                </NavLink>
              </li>
              <li>
                <NavLink to="/mortes" activeClassName="active">
                  Mortes
                </NavLink>
              </li>
              <li>
                <NavLink to="/compras" activeClassName="active">
                  Compras
                </NavLink>
              </li>
              <li>
                <NavLink to="/vendas" activeClassName="active">
                  Vendas
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </TopBarHeader>
      {children && <HeaderContent>{children}</HeaderContent>}
    </ContainerHeader>
  );
};

export default Header;
