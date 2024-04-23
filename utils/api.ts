import { toast } from 'react-toastify';
import getError from './getError';

export async function getRecords<T>({ url }: { url: string }) {
  return fetch(url, {
    next: { revalidate: 60 * 60 * 10000 },
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
    .then((res) => res.json())
    .then((data) => data as T[]);
}
export async function getRecord<T>({ url, id }: { url?: string; id?: string }) {
  return fetch(`${url}${id}`, {
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
    .then((res) => res.json())
    .then((data) => data as T);
}
export async function updateRecord({
  url,
  data
}: {
  url: string;
  data: unknown;
}) {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data)
  })
    .then((data) => data.json())
    .then((data) => ({
      message: 'Informação atualizada com sucesso',
      data
    }))
    .catch((err) => {
      toast(getError(err));
    });
}

export async function deleteRecord({ url }: { url: string }) {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return {
      message: 'Informação excluída com sucesso',
      data: await response.json()
    };
  } catch (err) {
    getError(err);
  }
}

export async function insertRecord({
  url,
  data
}: {
  url: string;
  data: unknown;
}) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data)
    });
    return {
      message: 'Informação registrada com sucesso',
      data: await response.json()
    };
  } catch (err) {
    getError(err);
  }
}
