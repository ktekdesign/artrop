export default function enumValue(
  value: (boolean | undefined)[],
  enumType: string[]
) {
  const mappedValue = value.map((op: boolean | undefined, key: number) => {
    return op ? enumType[key] : '';
  });
  const filteredValue = mappedValue.filter((op: string) => op.length);
  return filteredValue;
}
