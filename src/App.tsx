import { useState } from 'react';
import Main from './components/Main/Main';
import NoData from './components/NoData/NoData';

import styles from './App.module.scss';
import './reset.css';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  const [data, setData] = useState({
    loaded: false,
    location: {
      name: '',
      country: '',
    },
    current: {
      temp_c: 0,
      condition: {
        text: '',
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
  const [isOpened, setIsOpened] = useState(true);

  const URL: string = `https://api.weatherapi.com/v1/forecast.json?key=${
    import.meta.env.VITE_KEY
  }&q=${query}&days=1&aqi=yes&alerts=no`;

  const fetchData = async (URL: string) => {
    const res = await fetch(URL);
    if (!res.ok) {
      setData({
        ...data,
        loaded: false,
      });
    } else {
      const data = await res.json();
      setData({
        loaded: true,
        location: {
          name: data.location.name,
          country: data.location.country,
        },
        current: {
          temp_c: data.current.temp_c,
          condition: {
            text: data.current.condition.text,
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
    }
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(String(e.target.value));
  };

  return (
    <div className={styles.container}>
      <div>
        <SearchBar
          handleQueryChange={handleQueryChange}
          query={query}
          setQuery={setQuery}
          isOpened={data.loaded ? isOpened : true}
          setIsOpened={setIsOpened}
          fetchData={fetchData}
          URL={URL}
        />
      </div>
      <div className={styles.wrapper}>
        {data.location.name === '' ? (
          <NoData />
        ) : (
          <Main data={data} isOpened={isOpened} setIsOpened={setIsOpened} />
        )}
      </div>
    </div>
  );
}

export default App;
