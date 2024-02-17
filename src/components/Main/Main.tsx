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
      <div className={styles.pillContainer}>
        <div className={styles.pill}>
          <p>Min/Max</p>
          <p>
            {data.forecast.forecastday[0].day.maxtemp_c}/
            {data.forecast.forecastday[0].day.mintemp_c}
          </p>
        </div>
        <div className={styles.pill}>
          <p>Feels like</p>
          <p>{data.current.feelslike_c}</p>
        </div>
        <div className={styles.pill}>
          <p>Wind speed</p>
          <p>{data.current.wind_kph}</p>
        </div>
        <div className={styles.pill}>
          <p>Humidity</p>
          <p>{data.current.humidity}%</p>
        </div>
      </div>
      <img src={data.current.condition.icon} alt="" />
    </div>
  );
};

export default Main;
