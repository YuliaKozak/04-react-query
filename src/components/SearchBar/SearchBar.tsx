import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (topic: string) => void;
}

function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSearch = (formData: FormData) => {
    const topic = formData.get("query") as string;

    if (!topic || topic.trim() === "") {
      toast.error("Please enter your search query.");
      return;
    }
    onSubmit(topic.trim());
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form action={handleSearch} className={css.form}>
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

export default SearchBar;
