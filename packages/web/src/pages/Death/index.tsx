import React from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../hooks/Auth";

import Header from "../../components/Header";

import { HeaderDeath, Container } from "./styles";

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <Header>
        <HeaderDeath className="grid-2" />
      </Header>
      <Container>
        Mortes
        <br />
        {JSON.stringify(user)}
      </Container>
    </>
  );
}
