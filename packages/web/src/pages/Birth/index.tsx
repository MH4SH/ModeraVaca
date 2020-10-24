import React from 'react';

import { useAuth } from '../../hooks/Auth';

import Header from '../../components/Header';

import { HeaderBirth, Container } from './styles';

const Birth: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <Header>
        <HeaderBirth className="grid-2" />
      </Header>
      <Container>
        Nascidos
        <br />
        {JSON.stringify(user)}
      </Container>
    </>
  );
};

export default Birth;
