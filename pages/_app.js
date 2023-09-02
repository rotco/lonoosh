import { useState, createContext } from "react";
import AppContext from "../components/AppContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";

function MyApp({ Component, pageProps }) {
  const [scoreContext, setScoreContext] = useState(0);
  const [actionContext, setActionContext] = useState(null);
  const [gameContext, setGameContext] = useState(null);

  return (
    <AppContext.Provider
      value={{
        scoreContext,
        setScoreContext,
        actionContext,
        setActionContext,
        gameContext,
        setGameContext,
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
