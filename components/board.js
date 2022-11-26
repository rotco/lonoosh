import { useState, useEffect, useContext } from "react";
import AppContext from "./AppContext";
import useSound from "use-sound";
// import bad1 from "../public/assets/sounds/bad1.mp4";
// import good1 from "../public/assets/sounds/good1.mp4";

export default function Board({ hero, removeHero }) {
  const [progress, setProgress] = useState();
  const [progressIndex, setProgressIndex] = useState(0);
  const [shuffledLetters, setShuffledLetters] = useState(null);
  const [completeBoard, setCompleteBoard] = useState(false);
  const context = useContext(AppContext);
  const [playBad] = useSound("/assets/sounds/bad1.mp4");
  const [playGood] = useSound("/assets/sounds/good1.mp4");
  function incScore() {
    context.setScoreContext(context.scoreContext + 1);
    playGood();
  }
  function decScore() {
    context.setScoreContext(context.scoreContext - 1);
    playBad();
  }
  useEffect(() => {
    setProgress([...Array(hero.hebrew.length)]);
    setProgressIndex(0);
    let tempShuffledLetters = [...Array(hero.hebrew.length)];
    hero.hebrew.split("").forEach((letter) => {
      while (true) {
        const rand = Math.round(
          Math.random() * (hero.hebrew.split("").length - 1)
        );
        if (tempShuffledLetters[rand] === undefined) {
          tempShuffledLetters[rand] = { value: letter, completed: false };
          break;
        }
      }
      setCompleteBoard(false);
      setShuffledLetters(tempShuffledLetters);
    });
  }, [hero.hebrew]);
  const handleClickLetter = (ch) => {
    if (ch.value === hero.hebrew[progressIndex]) {
      let tempArray = progress;
      incScore();
      tempArray[progressIndex] = ch.value;
      ch.completed = true;
      setProgress(tempArray);
      if (hero.hebrew.length === progressIndex + 1) {
        setCompleteBoard(true);
      }
      setProgressIndex(progressIndex + 1);
    } else {
      decScore();
    }
  };
  return (
    <div>
      {progress && (
        <div>
          {console.log(progress)}
          <div className="board">
            {shuffledLetters && (
              <div>
                {shuffledLetters.map((ch, i) => {
                  if (!ch.completed)
                    return (
                      <div
                        className="letter"
                        key={i}
                        onClick={() => handleClickLetter(ch)}
                      >
                        {ch.value}
                      </div>
                    );
                })}
              </div>
            )}
          </div>
          <div className="progress">
            {progress.map((ch, i) => {
              return (
                <div className="letter" key={i}>
                  {ch}
                </div>
              );
            })}
          </div>
          {completeBoard && (
            <div className="next">
              <img
                onClick={() => {
                  removeHero();
                }}
                src="/assets/gift.svg"
                height="200px"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
