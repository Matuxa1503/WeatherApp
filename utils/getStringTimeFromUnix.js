export const convertToLocalTime = (unixTime) => {
  const date = new Date(unixTime * 1000).toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
  const time = date.split(', ')[1];
  const [hours, minutes] = time.split(':');
  return `${hours}:${minutes}`;
};
