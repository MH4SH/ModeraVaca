import React from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/Auth';

import Header from '../../components/Header';

import { HeaderSale, Container } from './styles';

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <Header>
        <HeaderSale className="grid-2" />
      </Header>
      <Container>
        Venda
        <br />
        {JSON.stringify(user)}
      </Container>
    </>
  );
}
