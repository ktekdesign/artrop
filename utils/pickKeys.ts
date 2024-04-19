export default function pickObjectKeys<T, K extends keyof T>(
  obj: T,
  keys: K[]
) {
  let result = {} as Pick<T, K>;
  for (const key of keys) {
    if (obj[key]) {
      result[key] = obj[key];
    }
  }
  return result;
}
