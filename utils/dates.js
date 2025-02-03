import { addDays, format, getUnixTime } from 'date-fns';

export const getDates = () => {
  const getDay = (day) => {
    return format(day, 'yyyy-MM-dd');
  };

  const now = new Date();
  const currentDate = getDay(now);
  const tomorrowDate = getDay(addDays(now, 1));

  const timeZoneOffsetInSeconds = now.getTimezoneOffset() * 60 * -1; // time zone user
  const unixWithOffset = timeZoneOffsetInSeconds + getUnixTime(now); // unix time user

  return { currentDate, tomorrowDate, unixWithOffset };
};

// get weather data by day
export const getWeatherByDate = (weatherList, unixOffset, date) => {
  return weatherList.filter((obj) => {
    if (obj.dt >= unixOffset && obj.dt_txt.includes(date)) {
      return true;
    }
    return false;
  });
};

// get string date ("2025-02-01 18:00:00") and get hour and minute (18:00)
export const getHourAndMinute = (time) => {
  return time.split(' ')[1].slice(0, 5);
};

// if time 00:00, 03:00 or 21:00, return "n" (night), other "d" (day). For show icon sun or moon
export const getTimeOfDay = (dateString) => {
  const hours = new Date(dateString).getHours(); // get hours

  return [0, 3, 21].includes(hours) ? 'n' : 'd';
};
