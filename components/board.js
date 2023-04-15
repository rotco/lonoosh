import { useState, useEffect, useContext } from "react";
import AppContext from "./AppContext";
import useSound from "use-sound";
// import bad1 from "../public/assets/sounds/bad1.mp4";
// import good1 from "../public/assets/sounds/good1.mp4";

export default function Board({ hero, removeHero, game }) {
  const [currentCards, setCurrentCards] = useState();
  const [progressIndex, setProgressIndex] = useState(0);
  const [optionalCards, setOptionalCards] = useState(null);
  const [requiredCard, setRequiredCard] = useState(null);
  const [completeBoard, setCompleteBoard] = useState(false);
  const context = useContext(AppContext);
  const [playBad] = useSound("/assets/sounds/bad1.mp4");
  const [playGood] = useSound("/assets/sounds/good1.mp4");
  function incScore() {
    context.setScoreContext(context.scoreContext + 1);
    context.setActionContext("inc");
    playGood();
  }
  function decScore() {
    context.setScoreContext(context.scoreContext - 1);
    context.setActionContext("dec");

    playBad();
  }
  useEffect(() => {
    setCurrentCards([...Array(hero.hebrew.length)]);
    setProgressIndex(0);
    setCompleteBoard(false);
    console.log("board hero=", hero);
    const [optional, required] = game.initCards(hero);
    console.log("optional", optional);
    console.log("required", required);
    setOptionalCards(optional);
    setRequiredCard(required);
  }, [hero.hebrew]);
  const handleClickLetter = (userSelectedCardIndex) => {
    const checkMove = game.checkMove(
      optionalCards,
      currentCards,
      requiredCard,
      hero,
      userSelectedCardIndex
    );
    console.log("checkMove", checkMove);
    setOptionalCards(checkMove.nextMoveOptionalCards);
    setRequiredCard(checkMove.nextMoveRequiredCard);
    setCompleteBoard(checkMove.isComplete);
    if (checkMove.correctMove) {
      incScore();
    } else {
      decScore();
    }
  };
  return (
    <div>
      {currentCards && (
        <div>
          <div>
            {optionalCards && (
              <div className="board">
                {optionalCards.map((ch, i) => {
                  if (!ch.completed)
                    return (
                      <div
                        className="letter"
                        key={i}
                        onClick={() => handleClickLetter(i)}
                      >
                        {ch.value}
                      </div>
                    );
                })}
              </div>
            )}
          </div>
          <div className="progress">
            {currentCards.map((ch, i) => {
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
