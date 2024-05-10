import { pk } from '../interfaces';

const headers = {
  'Content-Type': 'application/json'
};
export const options = {
  headers
};

export async function getDashboard<T>({
  url,
  body
}: {
  url: string;
  body: unknown;
}) {
  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  })
    .then((res) => res.json())
    .then((data) => data as T[]);
}
export async function getRecords<T>({ url }: { url: string }) {
  return fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      return data as T[];
    });
}
export async function getRecord<T>(endpoint: string) {
  return fetch(endpoint, options).then((res) => res.json() as T);
}
export async function updateRecord<T>({
  endpoint,
  data
}: {
  endpoint: string[];
  data: T;
}) {
  return fetch(endpoint.join(''), {
    method: 'PUT',
    headers,
    body: JSON.stringify(data)
  })
    .then((data) => data.json())
    .then((data) => ({
      message: 'Informação atualizada com sucesso',
      ...data
    }));
}

export async function deleteRecord({ endpoint }: { endpoint: string[] }) {
  return fetch(endpoint.join(''), {
    method: 'DELETE',
    headers
  })
    .then((data) => data.json())
    .then((data) => ({
      message: 'Informação excluída com sucesso',
      ...data
    }));
}

export async function insertRecord<T>({
  endpoint,
  data
}: {
  endpoint: string[];
  data: T;
}) {
  return fetch(endpoint.join(''), {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  })
    .then((data) => data.json())
    .then((data) => ({
      message: 'Informação registrada com sucesso',
      ...data
    }));
}

export async function upsertRecord<T extends pk>({
  data,
  endpoint
}: {
  data: T;
  endpoint: string[];
}) {
  return await (
    !endpoint[1].length && (!data.id || data.id === undefined)
      ? insertRecord
      : updateRecord
  )<T>({
    endpoint,
    data
  });
}
