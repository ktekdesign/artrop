import { pk } from '../interfaces';

export default function pickObjectKeys<T extends pk, K extends keyof T>(
  obj: T,
  keys: K[]
) {
  let result = { id: obj.id || '' } as Pick<T, K | 'id'>;
  for (const key of keys) {
    if (obj[key]) {
      result[key] = obj[key];
    }
  }
  return result;
}
