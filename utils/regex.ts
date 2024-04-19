export const phoneRegExp = {
  regex:
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  message: 'O Telefone não está valido'
};

export const cpfRegExp = {
  regex: /^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/,
  message: 'O CPF não está valido'
};

export const cnpjRegExp = {
  regex: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
  message: 'O CNPJ não esta valido'
};

export const cepRegExp = {
  regex: /(\d{5})-?(\d{3})/,
  message: 'O CEP não esta valido'
};
