import { useState } from 'react';
import Main from './components/Main/Main';
import NoData from './components/NoData/NoData';

import styles from './App.module.scss';
import './reset.css';
import SearchBar from './components/SearchBar/SearchBar';
import { WeatherType } from './types';

function App() {
  const [data, setData] = useState<WeatherType>();
  const [query, setQuery] = useState('');
  const [isOpened, setIsOpened] = useState(true);

  const URL: string = `https://api.weatherapi.com/v1/forecast.json?key=${
    import.meta.env.VITE_KEY
  }&q=${query}&days=1&aqi=yes&alerts=no`;

  const fetchData = async (URL: string) => {
    const res = await fetch(URL);
    if (!res.ok) {
      setData(data);
    } else {
      const data = await res.json();
      const loadedData = {
        data: WeatherType,
        loaded: true,
      };
      setData(loadedData);
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
