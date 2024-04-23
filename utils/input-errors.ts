import { FieldError } from 'react-hook-form';

export const getInputColor = (error?: FieldError) =>
  !!error ? 'danger' : 'default';

export const getInputErrorMessage = (error?: FieldError) =>
  !!error && error.message;

export const errorMessage = {
  email: {
    required: 'O e-mail não pode estar vazio',
    invalid: 'O e-mail não está invalido'
  },
  phone: {
    required: 'O telefone não pode estar vazio',
    invalid: 'O Telefone não está valido'
  },
  name: {
    required: 'O nome não pode estar vazio'
  },
  cpf: {
    required: 'O CPF não pode estar vazio',
    invalid: 'O CPF não está valido'
  },
  cnpj: {
    required: 'O CNPJ não pode estar vazio',
    invalid: 'O CNPJ não está valido'
  },
  generic: {
    required: 'O campo não pode estar vazio'
  }
};
