import styles from "../../styles/Home.module.css";

import Score from "../../components/score";
import Board from "../../components/board";

import { useState, useEffect, useCallback } from "react";
import WinningVideo from "../../components/winningVideo";
import SayName from "../../components/SayName";
import CampaignIcon from "@mui/icons-material/Campaign";
import ReactHowler from "react-howler";
import { display } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import Image from "next/image";
import { MissingChar, ShuffledCharacters } from "../../utils/game";

function Home({ data }) {
  const [hero, setHero] = useState(null);
  const [runSayName, setRunSayName] = useState(false);
  const removeHero = () => {
    console.log("removeHero, data = ", data);
    console.log("hero = ", hero);
    data.collection = data.collection.filter((obj) => obj._id !== hero._id);
    chooseHero();
  };
  const chooseHero = () => {
    console.log("chooseHero");
    const rand = Math.round(Math.random() * (data.collection.length - 1));
    const choosen = data.collection[rand];
    setHero(choosen);
    console.log("choosen = ", data.collection[rand]);
  };
  useEffect(() => {
    console.log("USEEFFECT INDEX");
    console.log("data=", data);
    chooseHero();
  }, []);

  return (
    <div className="main-app">
      <div className="alona-banner">
        <span>Alona Games</span>
      </div>

      <WinningVideo />
      <Score />

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

export async function getServerSideProps(context) {
  console.log("context.query", context.query);

  const getGame = () => {
    if (context.query.endpoint === "missingchar") {
      return new MissingChar();
    }
    if (context.query.endpoint === "shufflecharacters") {
      return new ShuffledCharacters();
    }
  };
  const game = getGame();
  await game.run();
  const data = {
    collection: game.collection,
    completeCards: game.completeCards,
    currentCards: game.currentCards,
    missingChar: game.missingChar,
    optionalCards: game.optionalCards,
    players: game.players,
  };
  return { props: { data } };
}
