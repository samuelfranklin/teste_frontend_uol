import React from 'react';
import { useParams } from 'react-router-dom';
import { Header, Form } from '../../components';
import { getClient } from '../../services/clients';

import './style.css';

export default function UpdateClient() {
  const { id } = useParams();
  let selectedClient = null;

  try {
    selectedClient = getClient(id);
  } catch (error) {
    throw new Error(error);
  }

  return (
    <div id="update-client">
      <Header title="Clientes">
        <h3>Editar Cliente</h3>
      </Header>
      <Form values={selectedClient} formType="update" />
    </div>
  );
}
