import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import classNames from "./utils/classNames";

const App = () => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <main
      className={classNames(
        darkMode
          ? "bg-very-dark-blue text-white"
          : "bg-very-light-grayish-blue",
        "font-josefin-sans",
      )}
    >
      {!user ? (
        <LoginPage handleUser={setUser} />
      ) : (
        <MainPage
          user={user}
          handleUser={setUser}
          darkMode={darkMode}
          handleDarkMode={setDarkMode}
        />
      )}
    </main>
  );
};

export default App;
