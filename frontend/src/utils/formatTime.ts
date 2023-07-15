import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date: Date | string | number) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fInputDate(date: Date | string | number) {
  return format(new Date(date), 'yyyy-MM-dd');
}

export function fDateTime(date: Date | string | number) {
  return format(new Date(date), 'dd MMM yyyy p');
}

export function fTimestamp(date: Date | string | number) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date: Date | string | number) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date: Date | string | number) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

export function getLast15Days() {
  const dates = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 14; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    const formattedDate = day + '/' + month;
    dates.push(formattedDate);
  }

  return dates;
}
