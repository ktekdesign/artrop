import getError from './getError';

export const getRecords = async ({ url }: { url: string }) => {
  const response = await fetch(url, {
    next: { revalidate: 60 * 60 * 10000 },
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
  return await response.json();
};
export const getRecord = async ({ url, id }: { url: string; id: string }) => {
  const response = await fetch(`${url}${id}`, {
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
  return await response.json();
};
export async function updateRecord<T>({ url, data }: { url: string; data: T }) {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data)
    });
    return {
      message: 'Informação atualizada com sucesso',
      data: await response.json()
    };
  } catch (err) {
    getError(err);
  }
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

export async function insertRecord<T>({ url, data }: { url: string; data: T }) {
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
