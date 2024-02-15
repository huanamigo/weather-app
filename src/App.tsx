import { useEffect, useState } from 'react';
import Main from './components/Main/Main';
import NoData from './components/NoData/NoData';

import styles from './App.module.scss';
import './reset.css';

function App() {
  const [data, setData] = useState({
    location: {
      name: '',
      country: '',
    },
    current: {
      temp_c: 0,
      condition: {
        icon: '',
      },
      feelslike_c: 0,
      wind_kph: 0,
      humidity: 0,
    },
    forecast: {
      forecastday: [
        {
          day: {
            maxtemp_c: 0,
            mintemp_c: 0,
          },
        },
      ],
    },
  });
  const [query, setQuery] = useState('');

  const URL: string = `https://api.weatherapi.com/v1/forecast.json?key=${
    import.meta.env.VITE_KEY
  }&q=${query}&days=1&aqi=yes&alerts=no`;

  const fetchData = async (URL: string) => {
    const res = await fetch(URL);
    if (!res.ok) {
      console.log(String(res.status));
    } else {
      const data = await res.json();
      setData({
        location: {
          name: data.location.name,
          country: data.location.country,
        },
        current: {
          temp_c: data.current.temp_c,
          condition: {
            icon: data.current.condition.icon,
          },
          feelslike_c: data.current.feelslike_c,
          wind_kph: data.current.wind_kph,
          humidity: data.current.humidity,
        },
        forecast: {
          forecastday: [
            {
              day: {
                maxtemp_c: data.forecast.forecastday[0].day.maxtemp_c,
                mintemp_c: data.forecast.forecastday[0].day.mintemp_c,
              },
            },
          ],
        },
      });
      console.log(data);
    }
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(String(e.target.value));
  };

  useEffect(() => {
    if (query.length > 3) {
      fetchData(URL);
    }
  }, [query, URL]);

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={query}
          onChange={(e) => handleQueryChange(e)}
        />
      </div>
      <div className={styles.wrapper}>
        {data.location.name === '' ? <NoData /> : <Main data={data} />}
      </div>
    </div>
  );
}

export default App;
