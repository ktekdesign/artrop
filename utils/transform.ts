import { JsonValue } from '@prisma/client/runtime/library';
import dompurify from 'dompurify';

export const sanitize = (value: string) => dompurify.sanitize(value).trim();

export const transformDate = (value?: string) => {
  const response = value ? new Date(value) : null;
  return response;
};

export const transformNumber = (value: string) => Number(value) || 0;

export const getOnlyDigit = (data: string) => data.replaceAll(/[^0-9]/gi, '');

export const transformJsonValue = (data?: JsonValue) =>
  data && typeof data === 'object' && !Array.isArray(data) ? data : {};

export const JsonValuetoString = (data: JsonValue) =>
  data && typeof data === 'string' ? data : '';

export const minutesDiff = (dateTimeValue2: Date, dateTimeValue1: Date) => {
  var differenceValue =
    (dateTimeValue2.getTime() - dateTimeValue1.getTime()) / 1000;
  differenceValue /= 60;
  return Math.abs(Math.round(differenceValue));
};
