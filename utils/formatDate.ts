import { DateFormatter, getLocalTimeZone } from '@internationalized/date';
import { JsonValue } from '@prisma/client/runtime/library';

export default function formatDate(date?: JsonValue | Date): string {
  if (typeof date === 'string') return date.split('T')[0];
  if (date instanceof Date) {
    const format = new Date(date);
    return format.toISOString().split('T')[0];
  }
  return '';
}
export const dateFormatter = new DateFormatter('pt-BR', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false,
  timeZone: getLocalTimeZone()
});

export const timeFormatter = new DateFormatter('pt-BR', {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false,
  timeZone: getLocalTimeZone()
});
