import React from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../hooks/Auth";

import Header from "../../components/Header";

import { HeaderHome, Container } from "./styles";

export default function Home() {
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
}
