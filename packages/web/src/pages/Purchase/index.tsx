import React from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../hooks/Auth";

import Header from "../../components/Header";

import { HeaderPurchase, Container } from "./styles";

export default function Home() {
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
}
