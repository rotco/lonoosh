import styles from "../../styles/Home.module.css";
import Score from "../../components/Score";
import Board from "../../components/Board";
import { useState, useEffect, useCallback } from "react";
import WinningVideo from "../../components/winningVideo";
import SayName from "../../components/SayName";
import CampaignIcon from "@mui/icons-material/Campaign";
import ReactHowler from "react-howler";
import { display } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import Image from "next/image";
import { ShuffledCharacters } from "../../utils/ShuffledCharacters";
import { MissingCharacters } from "../../utils/MissingCharacters";
import PageHead from "../../components/PageHead";

function Home({ data }) {
  const [hero, setHero] = useState(null);
  const [game, setGame] = useState(null);
  const [runSayName, setRunSayName] = useState(false);
  const chooseHero = (tempGame) => {
    console.log("chooseHero");
    console.log("game in chooseHero=", tempGame);
    const rand = Math.round(Math.random() * (data.collection.length - 1));
    const choosen = data.collection[rand];
    setHero(choosen);
    console.log("choosen = ", data.collection[rand]);
  };
  const getGame = (gameName) => {
    if (gameName === "shuffledcharacters") return new ShuffledCharacters();
    if (gameName === "missingchar") return new MissingCharacters();
    if (gameName === "missingvowel") return new ShuffledCharacters();
  };
  const removeHero = () => {
    console.log("removeHero, data = ", data);
    console.log("hero = ", hero);
    data.collection = data.collection.filter((obj) => obj._id !== hero._id);
    chooseHero();
  };

  useEffect(() => {
    console.log("USEEFFECT INDEX");
    console.log("data=", data);
    const tempGame = getGame(data.gameName);
    setGame(tempGame);
    console.log("tempGame = ", tempGame);

    chooseHero(tempGame);
  }, []);

  return (
    <div className="main-app">
      <PageHead width={100} height={108} />
      <WinningVideo />
      <Score />

      {hero && (
        <div>
          <div
            style={{
              // display: "flex",
              alignItems: "center",
              alignContent: "center",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              onClick={() => setRunSayName(true)}
              style={{
                position: "absolute",
              }}
            >
              <CampaignIcon
                style={{
                  fontSize: "50px",
                  color: "#af1f1f",
                  variant: "outlined",
                }}
              />
            </IconButton>
            <Image src={hero.imageurl} height={400} width={400} />
          </div>
          <Board hero={hero} removeHero={removeHero} game={game} />
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

  // const getGame = () => {
  //   if (context.query.endpoint === "missingchar") {
  //     return new MissingChar();
  //   }
  //   if (context.query.endpoint === "shufflecharacters") {
  //     return new ShuffledCharacters();
  //   }
  // };
  const getCollection = async () => {
    const res = await axios.get(`${process.env.BE_SERVER}/api/heros`);
    return res.data.data;
  };

  const collection = await getCollection();
  const data = {
    gameName: context.query.endpoint,
    collection: collection,
    // completeCards: game.completeCards,
    // currentCards: game.currentCards,
    // missingChar: game.missingChar,
    // optionalCards: game.optionalCards,
  };
  return { props: { data } };
}
