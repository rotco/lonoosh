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
import Image from "next/image";
import Link from "next/link";

function Home({ data }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    console.log("USEEFFECT INDEX");
    setGames(data);
    console.log("games=", games);
    // chooseHero();
  }, [games, data]);

  return (
    <div className="main-app">
      <div className="alona-banner">
        <span>Alona Games</span>
      </div>
      <div className="games-cards">
        {games.length > 0 &&
          games.map((game, index) => {
            return (
              <div key={index} className="game-card">
                {/* <Link href={`/games/name/${game.endpoint}`}> */}
                <Link
                  href={{
                    pathname: "/games/commongame",
                    query: { endpoint: game.endpoint },
                  }}
                >
                  <div>{game.name}</div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
export default Home;

export async function getServerSideProps() {
  const res = await axios.get("http://localhost:3000/api/games");
  const data = await res.data.data;
  console.log("data:", data);
  return { props: { data } };
}
