export default function preventUndefined<T>(defaultData: T, data?: T) {
  return data || defaultData;
}
