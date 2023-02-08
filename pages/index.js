import styles from "../styles/Home.module.css";
import Score from "../components/score";
import Board from "../components/board";

import { useState, useEffect, useCallback } from "react";
import WinningVideo from "../components/winningVideo";
import SayName from "../components/SayName";
import CampaignIcon from "@mui/icons-material/Campaign";
import ReactHowler from "react-howler";
import { display } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import axios from "axios";

function Home({ data }) {
  const [hero, setHero] = useState(null);
  const [runSayName, setRunSayName] = useState(false);
  const removeHero = () => {
    console.log("removeHero, data = ", data);
    console.log("hero = ", hero);
    data = data.filter((obj) => obj._id !== hero._id);
    chooseHero();
  };
  const chooseHero = () => {
    console.log("chooseHero");
    const rand = Math.round(Math.random() * (data.length - 1));
    const choosen = data[rand];
    setHero(choosen);
    console.log("choosen = ", data[rand]);
  };
  useEffect(() => {
    console.log("USEEFFECT INDEX");
    console.log("data=", data);
    chooseHero();
  }, []);

  return (
    <div className="main-app">
      <WinningVideo />
      <Score />
      {/* <div className="score">
        <span className="number">{count}</span> נקודות
      </div> */}

      {hero && (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <IconButton onClick={() => setRunSayName(true)}>
              <CampaignIcon
                style={{
                  fontSize: "50px",
                  color: "#af1f1f",
                  variant: "outlined",
                }}
              />
            </IconButton>
            <img src={hero.imageurl} height="400"></img>
          </div>
          <Board hero={hero} removeHero={removeHero} />
          {runSayName && (
            <SayName
              audioFile={hero.audioFile}
              runSayName={runSayName}
              setRunSayName={setRunSayName}
            />
          )}
        </div>
      )}
    </div>
  );
}
export default Home;

export async function getServerSideProps() {
  const res = await axios.get("http://127.0.0.1:3000/api/heros");
  const data = await res.data.data;
  return { props: { data } };
}
