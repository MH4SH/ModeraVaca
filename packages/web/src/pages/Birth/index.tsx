import React from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/Auth';

import Header from '../../components/Header';

import { HeaderBirth, Container } from './styles';

export default function Home() {
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
}
