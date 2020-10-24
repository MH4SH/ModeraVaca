import React from 'react';

import { useAuth } from '../../hooks/Auth';

import Header from '../../components/Header';

import { HeaderHome, Container } from './styles';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <Header>
        <HeaderHome className="grid-2" />
      </Header>
      <Container>
        HOME -
        <br />
        {JSON.stringify(user)}
      </Container>
    </>
  );
};

export default Home;
