export interface IWeatherDto {
  main: {
    temp: string;
  };
  name: string;
  id: number;
}

export type TWeatherStatus = "ACTIVE" | "DELETED";

export interface IWeather {
  id: number;
  temp: string;
  name: string;
  status: TWeatherStatus;
}
