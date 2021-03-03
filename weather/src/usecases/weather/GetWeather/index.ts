import { GetWeatherUseCase } from './GetWeatherUseCase';
import { GetWeatherController } from './GetWeatherController';
import { OpenWeatherMapProvider } from '../../../providers/implementations/OpenWeatherMapProvider';

const weatherProvider = new OpenWeatherMapProvider();

const getWeatherUseCase = new GetWeatherUseCase(weatherProvider);

const getWeatherController = new GetWeatherController(getWeatherUseCase);

export { getWeatherUseCase, getWeatherController };
