import { WeatherType } from '../../types';
import styles from './Main.module.scss';

interface MainProps {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  data: WeatherType;
}

const Main = ({ isOpened, setIsOpened, data }: MainProps) => {
  const date = new Date();

  return (
    <>
      {data.location ? (
        <div className={styles.container}>
          <div className={styles.cityContainer}>
            <div className={styles.cityWrapper}>
              <p className={styles.name}>{data.location.name}</p>
              <p className={styles.country}>{data.location.country}</p>
            </div>
            <div className={styles.search}>
              <p onClick={() => setIsOpened(!isOpened)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="whitesmoke"
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </p>
            </div>
          </div>
          <div className={styles.tempContainer}>
            <div className={styles.decPill}></div>
            <div className={styles.date}>
              <p>
                {String(date.toLocaleString('default', { day: 'numeric' })) +
                  ' ' +
                  String(date.toLocaleString('default', { month: 'short' }))}
              </p>
            </div>
            <div className={styles.temp}>
              <p>{data.current.temp_c}°</p>
            </div>
            <div className={styles.weatherIcon}>
              <img src={data.current.condition.icon} alt="" />
            </div>
          </div>
          <p className={styles.conditionText}>{data.current.condition.text}</p>
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
        </div>
      ) : null}
    </>
  );
};

export default Main;
