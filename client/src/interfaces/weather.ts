export interface Weather {
    // City name + Country code
    id: string;
    // City name
    city: string;
    // Country Code
    countryCode: string;
    // Temperature in celsius
    temperature: number;
    // Sunrise time in 24h format (example 07:10)
    sunrise: string;
    // Sunset time in 24h format (example 18:22)
    sunset: string;
}
