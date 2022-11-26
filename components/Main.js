import { useState, useEffect, useCallback } from "react";
import Board from "./board";
import Score from "./score";
import WinningVideo from "./winningVideo";
import SayName from "./SayName";
import CampaignIcon from "@mui/icons-material/Campaign";
import ReactHowler from "react-howler";
import { display } from "@mui/system";

export default function Main() {
  const [data, setData] = useState([]);
  const [hero, setHero] = useState(null);
  const [count, setCount] = useState(0);
  const [runSayName, setRunSayName] = useState(false);
  const removeHero = () => {
    setData(data.filter((obj) => obj.id !== hero.id));
  };
  useEffect(() => {
    // console.log("main useeffect");
    fetch("api/heros")
      .then((res) => res.json())
      .then((data) => data.data)
      .then((data) => {
        console.log("data=", data);
        const rand = Math.round(Math.random() * (data.length - 1));
        const choosen = data[rand];
        console.log("choosen on is " + choosen.hebrew);
        console.log("data", data);
        setHero(choosen);
        // setRunSayName(true);
      })
      .catch((err) => console.log("ERR=", err));
  }, [data]);

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
            <div onClick={() => setRunSayName(true)}>
              <CampaignIcon style={{ fontSize: "50px", color: "red" }} />
            </div>
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
