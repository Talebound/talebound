import { differenceInHours, format, formatDistanceToNow, parseISO } from 'date-fns';

type MaxFormattedDistance = 'hour' | 'day' | 'week' | 'month' | 'year' | 'none';

export const formatDate = (
  date: Date | undefined | string,
  includeTime = false,
  maxFormattedDistance: MaxFormattedDistance = 'day',
): string => {
  if (!date) return ' --- ';
  if (typeof date === 'string') date = parseISO(date);

  const hourDifference = Math.abs(differenceInHours(date, new Date()));

  if (
    (hourDifference < 1 && maxFormattedDistance === 'hour') ||
    (hourDifference < 24 && maxFormattedDistance === 'day') ||
    (hourDifference < 24 * 7 && maxFormattedDistance === 'week') ||
    (hourDifference < 24 * 30 && maxFormattedDistance === 'month') ||
    (hourDifference < 24 * 365 && maxFormattedDistance === 'year')
  ) {
    return formatDistanceToNow(date, {
      addSuffix: true,
      includeSeconds: true,
    });
  }

  return format(date, `do MMM yyyy ${includeTime ? 'HH:mm' : ''}`);
};
