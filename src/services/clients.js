import axios from 'axios';
import { isNull, getItem, setItem } from '../helpers';

export const getClientList = async () => {
  await axios('https://test-frontend-uolpp.web.app/customers.json')
    .then(({ data }) => {
      setItem('clients', data.customers);
      return data.customers;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const getClient = (clientId) => {
  try {
    if (!clientId) {
      throw new Error({ status: 401, message: 'Não há cliente selecionado.' });
    }

    const clientList = getItem('clients');
    const selectedClient = clientList.find((client) => client.id === clientId);

    if (isNull(selectedClient)) {
      throw new Error({ status: 404, message: 'Cliente não encontrado.' });
    }

    return selectedClient;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateClient = (client) => {
  const clients = getItem('clients');

  if (!clients.find(({ id }) => id === client.id)) {
    throw new Error({ message: 'Cliente não encontrado', status: 'error' });
  }

  const newClients = clients.filter(({ id }) => id !== client.id);
  newClients.push(client);

  setItem('clients', newClients);

  return { message: `Cliente ${client.name} adicionado com sucesso`, status: 'success' };
};

export const createClient = (client) => {
  try {
    if (!client) {
      throw new Error({
        message: 'você precisa preencher os dados do cliente antes de salvar',
        status: 'error',
      });
    }

    let clients = getItem('clients');

    if (isNull(clients)) {
      clients = [client];
      setItem('clients', clients);
      return { message: 'cliente criado com sucesso', status: 'success' };
    }

    clients.push(client);
    setItem('clients', clients);

    return { message: 'cliente criado com sucesso', status: 'success' };
  } catch (error) {
    throw new Error(error);
  }
};
