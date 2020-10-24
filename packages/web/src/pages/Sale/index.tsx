import React from 'react';

import { useAuth } from '../../hooks/Auth';

import Header from '../../components/Header';

import { HeaderSale, Container } from './styles';

const Sale: React.FC = () => {
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
};

export default Sale;
