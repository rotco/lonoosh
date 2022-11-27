import { useState, createContext } from "react";
import AppContext from "../components/AppContext";
import "../styles/App.css";

function MyApp({ Component, pageProps }) {
  const [scoreContext, setScoreContext] = useState(0);
  const [actionContext, setActionContext] = useState(null);

  return (
    <AppContext.Provider
      value={{ scoreContext, setScoreContext, actionContext, setActionContext }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
