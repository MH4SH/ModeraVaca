import React from 'react';

import { useAuth } from '../../hooks/Auth';

import Header from '../../components/Header';

import { HeaderPurchase, Container } from './styles';

const Purchase: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <Header>
        <HeaderPurchase className="grid-2" />
      </Header>
      <Container>
        Compras
        <br />
        {JSON.stringify(user)}
      </Container>
    </>
  );
};

export default Purchase;
