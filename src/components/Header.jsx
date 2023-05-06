import { useState } from "react";
import { LANGUAGES } from "../utils/languageOptions";

export const Header = ({ language, handleLanguageChange }) => {
  const [isLogedIn, setIsLogedIn] = useState(false);

  const handleLoginStatus = () => {
    setIsLogedIn((prevState) => !prevState);
  };

  return (
    <header className="App-header">
      <div className="select-container">
        <select
          name="languageSelect"
          value={language}
          onChange={handleLanguageChange}
        >
          {LANGUAGES.map(({ label, value }) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <b>Termin</b>

      <div>
        {isLogedIn && <h2>Hello, user!</h2>}

        <button type="button" onClick={handleLoginStatus}>
          {isLogedIn ? "Logout" : "Login"}
        </button>
      </div>
    </header>
  );
};
