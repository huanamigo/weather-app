import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({
    location: {
      name: '',
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
  const date = new Date();

  const fetchData = async (URL: string) => {
    const res = await fetch(URL);
    if (!res.ok) {
      console.log(String(res.status));
    } else {
      const data = await res.json();
      setData({
        location: {
          name: data.location.name,
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
    <>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => handleQueryChange(e)}
        />
        <p>Name {data.location.name}</p>
        <p>
          Date
          {String(date.toLocaleString('default', { day: '2-digit' })) +
            String(date.toLocaleString('default', { month: 'short' }))}
        </p>
        <p>Current {data.current.temp_c}</p>
        <p>Max {data.forecast.forecastday[0].day.maxtemp_c}</p>
        <p>Min {data.forecast.forecastday[0].day.mintemp_c}</p>
        <p>Feels {data.current.feelslike_c}</p>
        <p>Wind speed {data.current.wind_kph}</p>
        <p>humidity {data.current.humidity}%</p>
        <img src={data.current.condition.icon} alt="" />
      </div>
    </>
  );
}

export default App;
