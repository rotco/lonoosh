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
  const [origCollection, setOrigCollection] = useState(null);

  const chooseHero = (tempGame) => {
    const rand = Math.round(Math.random() * (data.collection.length - 1));
    const choosen = data.collection[rand];
    setHero(choosen);
  };
  const getGame = (gameName) => {
    if (gameName === "shuffledcharacters") return new ShuffledCharacters();
    if (gameName === "missingchar") return new MissingCharacters();
    if (gameName === "missingvowel") return new MissingVowel();
  };
  const removeHero = () => {
    if (data.collection.length == 1) {
      data.collection = JSON.parse(JSON.stringify(origCollection));
    }
    data.collection = data.collection.filter((obj) => obj._id !== hero._id);
    chooseHero();
  };

  useEffect(() => {
    const tempGame = getGame(data.gameName);
    setGame(tempGame);
    chooseHero(tempGame);
    setOrigCollection(JSON.parse(JSON.stringify(data.collection)));
  }, []);

  return (
    <div className="main-app">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0 20px 0 20px",
        }}
      >
        <div
          style={{
            flex: 1,
          }}
        >
          <PageHead width={100} height={108} />
        </div>
        <div
          style={{
            flex: 1,
            alignSelf: "center",
          }}
        >
          <Score />
        </div>
      </div>
      <WinningVideo />

      {hero && (
        <div>
          <Board hero={hero} removeHero={removeHero} game={game} />
        </div>
      )}
    </div>
  );
}
export default Home;

export async function getServerSideProps(context) {
  const getGame = (gameName) => {
    if (gameName === "shuffledcharacters") return new ShuffledCharacters();
    if (gameName === "missingchar") return new MissingCharacters();
    if (gameName === "missingvowel") return new MissingVowel();
  };
  const game = getGame(context.query.endpoint);
  const filter = await game.getHeroFilter();
  await game.setCollection(filter);
  const data = {
    gameName: context.query.endpoint,
    collection: game.collection,
  };
  return { props: { data } };
}
