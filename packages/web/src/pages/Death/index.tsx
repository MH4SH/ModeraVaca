import React from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../hooks/Auth";

import Header from "../../components/Header";

import "./styles.css";

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <div>
        Mortes
        <br />
        {JSON.stringify(user)}
      </div>
    </>
  );
}
