import { formatTime, kelvinToCelsius } from '../utils';

describe('kelvinToCelsius', () => {
    it('returns the correct value in celsius when given a kelvin value', () => {
        expect(kelvinToCelsius(0)).toBe(-273.15);
        expect(kelvinToCelsius(100)).toBe(-173.15);
        expect(kelvinToCelsius(282.13)).toBe(8.98);
    });
});

describe('formatTime', () => {
    it('returns the correct format time when given the time and timezone offset in seconds', () => {
        expect(formatTime(1232322112)).toBe('23:41');
        expect(formatTime(1273473123, -25200)).toBe('00:32');
        expect(formatTime(1127372189, 1000)).toBe('08:13');
    });
});
