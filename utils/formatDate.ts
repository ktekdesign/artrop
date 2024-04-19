import { JsonValue } from '@prisma/client/runtime/library';

export default function formatDate(date?: JsonValue | Date): string {
  if (typeof date === 'string') return date.split('T')[0];
  if (date instanceof Date) {
    const format = new Date(date);
    return format.toISOString().split('T')[0];
  }
  return '';
}
