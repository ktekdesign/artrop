export default function preventFalsy<T>(data?: T, defaultData?: T) {
  return data || defaultData;
}
