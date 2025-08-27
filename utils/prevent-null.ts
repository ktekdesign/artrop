import { JsonValue } from '@prisma/client/runtime/library';

export default function falsy(data?: JsonValue) {
  return data?.toString() || '';
}
