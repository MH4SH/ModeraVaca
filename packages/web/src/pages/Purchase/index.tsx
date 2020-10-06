import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import Header from "../../components/Header";

import "./styles.css";

export default function Home() {
  const userToken = localStorage.getItem("userToken");
  const user = localStorage.getItem("user");
  const history = useHistory();

  if (!userToken) history.push("/entrar");

  useEffect(() => {
    console.log(userToken);
  }, [userToken]);

  return (
    <>
      <Header />
      <div>
        Compras
        <br />
        {userToken}
        {user}
      </div>
    </>
  );
}
