import axios from 'axios';
import { isNull } from '../helpers';

const getClientList = async () => {
  try {
    const { customers } = await axios('https://test-frontend-uolpp.web.app/customers.json').then((response) => response.data);
    localStorage.setItem('clients', JSON.stringify(customers));
    return customers || [];
  } catch (error) {
    throw new Error(error);
  }
};

const getClient = (clientId) => {
  try {
    if (!clientId) {
      throw new Error({ status: 401, message: 'Não há cliente selecionado.' });
    }

    const clientList = JSON.parse(localStorage.getItem('clients'));
    const selectedClient = clientList.find((client) => client.id === clientId);

    if (isNull(selectedClient)) {
      throw new Error({ status: 404, message: 'Cliente não encontrado.' });
    }
    return selectedClient;
  } catch (error) {
    throw new Error(error);
  }
};

const createClient = (client) => {
  try {
    if (!client) {
      throw new Error({
        message: 'você precisa preencher os dados do cliente antes de salvar',
        status: 'error',
      });
    }

    const clients = JSON.parse(localStorage.getItem('clients'));
    clients.push(client);

    localStorage.setItem('clients', JSON.stringify(clients));

    return { message: 'cliente criado com sucesso', status: 'success' };
  } catch (error) {
    throw new Error(error);
  }
};

export {
  getClientList, getClient, createClient,
};
