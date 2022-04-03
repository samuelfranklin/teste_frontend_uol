import React from "react";
import { Header, Form } from "../../components";

import "./style.css";

export default function CreateClient() {
  return (
    <div id="create-client">
      <Header title="Clientes">
        <h3>Adicionar Cliente</h3>
      </Header>
      <Form values={{}} />
    </div>
  );
}
