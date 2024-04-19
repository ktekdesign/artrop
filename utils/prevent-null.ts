import { JsonValue } from '@prisma/client/runtime/library';

export default function preventNull(data?: JsonValue) {
  return data?.toString() || '';
}
