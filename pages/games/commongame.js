import styles from "../../styles/Home.module.css";
import Score from "../../components/Score";
import Board from "../../components/Board";
import { useState, useEffect, useCallback } from "react";
import WinningVideo from "../../components/winningVideo";
import SayName from "../../components/SayName";
import ReactHowler from "react-howler";
import { display } from "@mui/system";
import axios from "axios";
import { ShuffledCharacters } from "../../utils/ShuffledCharacters";
import { MissingCharacters } from "../../utils/MissingCharacters";
import { MissingVowel } from "../../utils/MissingVowel";
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
    if (gameName === "missingvowel") return new MissingVowel();
  };
  const removeHero = () => {
    console.log("hero = ", hero);
    data.collection = data.collection.filter((obj) => obj._id !== hero._id);
    chooseHero();
  };

  useEffect(() => {
    const tempGame = getGame(data.gameName);
    setGame(tempGame);
    chooseHero(tempGame);
  }, []);

  return (
    <div className="main-app">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0 20px 0 20px;",
        }}
      >
        <PageHead width={100} height={108} />
        <Score />
      </div>
      <WinningVideo />

      {hero && (
        <div>
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
  const getGame = (gameName) => {
    if (gameName === "shuffledcharacters") return new ShuffledCharacters();
    if (gameName === "missingchar") return new MissingCharacters();
    if (gameName === "missingvowel") return new MissingVowel();
  };
  const game = getGame(context.query.endpoint);
  // const getCollection = async () => {
  //   const res = await axios.get(`${process.env.BE_SERVER}/api/heros`);
  //   return res.data.data;
  // };
  const filter = await game.getHeroFilter();
  await game.setCollection(filter);
  // const collection = await getCollection();
  const data = {
    gameName: context.query.endpoint,
    collection: game.collection,

    // completeCards: game.completeCards,
    // currentCards: game.currentCards,
    // missingChar: game.missingChar,
    // optionalCards: game.optionalCards,
  };
  return { props: { data } };
}
