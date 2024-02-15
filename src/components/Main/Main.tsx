import styles from './Main.module.scss';

interface iData {
  data: {
    location: {
      name: string;
      country: string;
    };
    current: {
      temp_c: number;
      condition: {
        icon: string;
      };
      feelslike_c: number;
      wind_kph: number;
      humidity: number;
    };
    forecast: {
      forecastday: {
        day: {
          maxtemp_c: number;
          mintemp_c: number;
        };
      }[];
    };
  };
}

const Main = ({ data }: iData) => {
  const date = new Date();

  return (
    <div className={styles.container}>
      <p className={styles.name}>{data.location.name}</p>
      <p className={styles.country}>{data.location.country}</p>
      <p className={styles.temp}>{data.current.temp_c}°</p>
      <p className={styles.date}>
        {String(date.toLocaleString('default', { day: 'numeric' })) +
          ' ' +
          String(date.toLocaleString('default', { month: 'short' }))}
      </p>
      <p>Max {data.forecast.forecastday[0].day.maxtemp_c}</p>
      <p>Min {data.forecast.forecastday[0].day.mintemp_c}</p>
      <p>Feels {data.current.feelslike_c}</p>
      <p>Wind speed {data.current.wind_kph}</p>
      <p>humidity {data.current.humidity}%</p>
      <img src={data.current.condition.icon} alt="" />
    </div>
  );
};

export default Main;
