import styles from "../styles/Home.module.css";
import Score from "../components/Score";
import Board from "../components/Board";

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
import PageHead from "../components/PageHead";

function Home({ data }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    setGames(data);
  }, [games, data]);

  return (
    <div className="main-app">
      <PageHead />
      <div className="games-cards">
        {games.length > 0 &&
          games
            .sort((a, b) => a.order - b.order)
            .map((game, index) => {
              return (
                <div key={index} className="game-card">
                  <Link
                    href={{
                      pathname: "/games/commongame",
                      query: { endpoint: game.endpoint },
                    }}
                  >
                    <Image
                      src={"/assets/images/" + game.imageurl}
                      width={300}
                      height={300}
                    ></Image>
                    <div className="label" style={{ font: "1.5rem" }}>
                      {game.hebrew}
                    </div>
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
  const res = await axios.get(`${process.env.BE_SERVER}/api/games`);
  const data = await res.data.data;
  return { props: { data } };
}
