export const formatWeatherDates = () => {
  const today = new Date();

  // Достаем дату формата 'YYYY-MM-DD' из строки
  const getDate = (date) => date.toISOString().split('T')[0];

  // Увеличиваем дату на один день и забираем погоду в 12 часов дня
  const getTomorrowDate = () => {
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return getDate(tomorrow) + ' 12:00:00';
  };
  // Текущее время в формате Unix +3 часа
  const currentUnixTime = Math.floor(Date.now() / 1000) + 10800;

  return { currentUnixTime, formattedDate: getDate(today), tomorrowDate: getTomorrowDate() };
};
