import styles from './SearchBar.module.scss';

interface IProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: (URL: string) => Promise<void>;
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
}: IProps) => {
  const handleSubmit = (formData: string) => {
    console.log(formData);
  };

  return (
    <>
      {isOpened ? (
        <div className={styles.searchBar}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(query);
              fetchData(URL);
              setIsOpened(false);
              setQuery('');
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
        </div>
      ) : null}
    </>
  );
};

export default SearchBar;
