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
        },
        current: {
          temp_c: data.current.temp_c,
          condition: {
            icon: data.current.condition.icon,
          },
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
        <p>{data.location.name}</p>
        <p>{data.current.temp_c}</p>
        <img src={data.current.condition.icon} alt="" />
      </div>
    </>
  );
}

export default App;
