import { useState, useEffect, useContext } from "react";
import AppContext from "./AppContext";
import useSound from "use-sound";
// import bad1 from "../public/assets/sounds/bad1.mp4";
// import good1 from "../public/assets/sounds/good1.mp4";
import FeaturedImage from "./FeaturedImage";

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
    setProgressIndex(0);
    setCompleteBoard(false);
    async function fetchData() {
      const initResults = await game.initCards(hero);
      const optional = initResults.optional;
      const required = initResults.required;
      const tempCurrentCards = initResults.tempCurrentCards;
      setCurrentCards(tempCurrentCards);
      setOptionalCards(optional);
      setRequiredCard(required);
    }
    fetchData();
  }, [hero.hebrew]);
  const handleClickLetter = (userSelectedCardIndex) => {
    const checkMove = game.checkMove(
      optionalCards,
      currentCards,
      requiredCard,
      hero,
      userSelectedCardIndex
    );
    setCompleteBoard(checkMove.isComplete);
    setRequiredCard(checkMove.nextMoveRequiredCard);
    setCurrentCards(checkMove.nextMoveCurrentCards);
    setOptionalCards(checkMove.nextMoveOptionalCards);

    if (checkMove.correctMove) {
      incScore();
    } else {
      decScore();
    }
  };
  return (
    <div>
      {currentCards && (
        <div className="board">
          <div>
            <div className="optional-cards">
              {optionalCards && (
                <div>
                  {optionalCards.map((ch, i) => {
                    if (true || !ch.completed)
                      return (
                        <div
                          className="letter"
                          key={i}
                          onClick={() => handleClickLetter(i)}
                        >
                          {ch}
                        </div>
                      );
                  })}
                </div>
              )}
            </div>
            <div>
              <FeaturedImage hero={hero} />
            </div>
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
          <div className="next">
            {completeBoard && (
              <img
                onClick={() => {
                  removeHero();
                }}
                src="/assets/gift.svg"
                height="200px"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
