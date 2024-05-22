import { JsonValue } from '@prisma/client/runtime/library';
import dompurify from 'dompurify';

export const sanitize = (value: string) => dompurify.sanitize(value).trim();

export const transformDate = (value?: string) =>
  value ? new Date(value) : null;

export const transformNumber = (value: string) =>
  Number(value.toString().replaceAll('.', '')) ?? 0;

export const getOnlyDigit = (data: string) => data.replaceAll(/[^0-9]/gi, '');

export const transformJsonValue = (data: (JsonValue | undefined)[]) =>
  data.map((obj) =>
    typeof obj === 'object' && !Array.isArray(obj) ? obj : {}
  );

export const JsonValuetoString = (data: JsonValue) =>
  data && typeof data === 'string' ? data : '';

export const minutesDiff = (dateTimeValue2?: Date, dateTimeValue1?: Date) => {
  if (!dateTimeValue1 || !dateTimeValue2) return 0;
  var differenceValue =
    (new Date(dateTimeValue2).getTime() - new Date(dateTimeValue1).getTime()) /
    1000;
  differenceValue /= 60;
  return Math.abs(Math.round(differenceValue));
};
