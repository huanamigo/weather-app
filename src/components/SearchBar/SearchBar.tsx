import { useEffect, useState } from 'react';
import styles from './SearchBar.module.scss';

interface IProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: (URL: string) => Promise<void>;
  fetchErr: string;
  URL: string;
}

const SearchBar = ({
  handleQueryChange,
  query,
  isOpened,
  setIsOpened,
  fetchData,
  URL,
  setQuery,
  fetchErr,
}: IProps) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineChange);
    window.addEventListener('offline', handleOnlineChange);

    return () => {
      window.removeEventListener('online', handleOnlineChange);
      window.removeEventListener('offline', handleOnlineChange);
    };
  }, [isOnline]);

  return (
    <>
      {isOpened ? (
        <div className={styles.searchBar}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (isOnline) {
                fetchData(URL);
                setIsOpened(false);
                setQuery('');
              }
            }}
          >
            <input
              type="text"
              name="search"
              placeholder="query"
              autoFocus
              autoComplete="off"
              value={query}
              onChange={(e) => handleQueryChange(e)}
            />
          </form>
          {!isOnline ? (
            <div>
              <p className={styles.error}>
                {
                  'It seems like you are offline. Please check your internet connection and try again'
                }
              </p>
            </div>
          ) : fetchErr === '' ? null : (
            <div>
              <p className={styles.error}>{fetchErr}</p>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default SearchBar;
