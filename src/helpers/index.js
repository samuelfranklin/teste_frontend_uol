export const setItem = (item, data) => localStorage.setItem(item, JSON.stringify(data));
export const getItem = (item) => JSON.parse(localStorage.getItem(item));

export const isEmpty = (value) => {
  if (value === null) return true;
  if (value === undefined) return true;
  if (value === '') return true;
  if (value === {}) return true;
  if (value === []) return true;
  return false;
};

export const isNull = (value) => {
  if (String(value) !== 'undefined' && value !== null) {
    return false;
  }
  return true;
};

export function clientName(nomeCompleto) {
  const nome = nomeCompleto.split(' ')[0];
  const qtdNome = nomeCompleto.split(' ').length;
  const sobrenome = nomeCompleto.split(' ')[qtdNome - 1];
  return `${nome} ${sobrenome}`;
}

export function clearStringNumbers(text) {
  return text.replace(/[^0-9]/g, '');
}

export function cpfValidator(inputCpf) {
  if (isEmpty(inputCpf)) return false;

  const cpf = clearStringNumbers(inputCpf);
  const invalidCPFNumbers = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ];

  if (invalidCPFNumbers.find((item) => item.toString() === cpf.toString())) {
    return false;
  }

  const validate = (cont) => {
    let isValid = false;
    let contHelper = cont;
    const controlNumber = 11;
    const firstCheckDigit = parseInt(cpf.substring(9, 10), 10);
    const secondCheckDigit = parseInt(cpf.substring(10, 11), 10);

    const numberSequence = cont === 10
      ? Array.from(cpf.substring(0, 9)).map((item) => parseInt(item, 10))
      : Array.from(cpf.substring(0, 10)).map((item) => parseInt(item, 10));

    const sum = controlNumber
      - (numberSequence
        .map((item) => {
          const newItem = item * contHelper;
          contHelper -= 1;
          return newItem;
        })
        .reduce((prev, next) => prev + next, 0)
        % controlNumber);

    if (cont === 10) {
      isValid = firstCheckDigit === sum || (firstCheckDigit === 0 && sum >= 10);
    }

    if (cont === 11) {
      isValid = secondCheckDigit === sum || (secondCheckDigit === 0 && sum >= 10);
    }

    return isValid;
  };

  const isValidFirstSecurityNumber = validate(10);
  const isValidFirstSecondNumber = validate(11);

  return isValidFirstSecurityNumber && isValidFirstSecondNumber;
}

export function emailValidator(email) {
  const validator = /^[a-z0-9]+(([^a-zA-Z@ 0-9]+[a-z0-9]+)+)?([@][a-z0-9]+)([.a-z]+)([a-z0-9])?$/gm;
  return validator.test(email);
}

export function phoneValidator(phoneNumber) {
  if (isEmpty(phoneNumber)) return false;
  const phone = clearStringNumbers(phoneNumber);
  const validator = /^[0-9]{2}[3][0-9]{7}|[0-9]{2}[9][0-9]{8}$/;
  const preValidator = /^[0-9]{2}[1]{8}|[0-9]{2}[2]{8}|[0-9]{2}[3]{8}|[0-9]{2}[4]{8}|[0-9]{2}[5]{8}|[0-9]{2}[6]{8}|[0-9]{2}[7]{8}|[0-9]{2}[9]{8}|[0-9]{2}[1]{9}|[0-9]{2}[2]{9}|[0-9]{2}[3]{9}|[0-9]{2}[4]{9}|[0-9]{2}[5]{9}|[0-9]{2}[6]{9}|[0-9]{2}[7]{9}|[0-9]{2}[9]{9}$/;

  return !preValidator.test(phone) && validator.test(phone);
}

export function translateStatus(status) {
  switch (status) {
    case 'active':
      return 'Ativo';
    case 'inactive':
      return 'Inativo';
    case 'waiting':
      return 'Aguardando';
    case 'disabled':
      return 'Desativado';
    default:
      throw new Error();
  }
}
