/**
 * Convert temperature in kelvin to celsius with two decimal cases
 * @param temperature temperature in Kelvin
 */
export const kelvinToCelsius = (temperature: number) => Number((temperature - 273.15).toFixed(2));

/**
 * Format time to 24h format (example: 15:29)
 * @param time time in seconds
 * @param offset timezone offset in seconds
 */
export const formatTime = (time: number, offset: number = 0) => {
    const date = new Date((time + offset) * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
};
