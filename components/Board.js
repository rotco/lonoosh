import { useState, useEffect, useContext } from "react";
import AppContext from "./AppContext";
import useSound from "use-sound";
import FeaturedImage from "./FeaturedImage";

export default function Board({ hero, removeHero, game }) {
  const [currentCards, setCurrentCards] = useState();
  const [progressIndex, setProgressIndex] = useState(0);
  const [optionalCards, setOptionalCards] = useState(null);
  const [requiredCard, setRequiredCard] = useState(null);
  const [completeBoard, setCompleteBoard] = useState(false);
  const context = useContext(AppContext);
  const [playBad] = useSound("/assets/sounds/step_bad.mp3");
  const [playGood] = useSound("/assets/sounds/step_good.mp3");
  const [playApplause] = useSound("/assets/sounds/applause.mp3");
  function incScore() {
    context.setScoreContext(context.scoreContext + 1);
    context.setActionContext("inc");
    playGood();
  }
  function decScore() {
    context.setScoreContext(Math.max(0, context.scoreContext - 1));
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
      {
        <div
          className="board"
          style={{
            height: currentCards?.length > 0 ? "auto" : 0,
          }}
        >
          <div>
            <div className="optional-cards">
              {optionalCards && (
                <div className={game.constructor.name}>
                  {optionalCards.map((ch, i) => {
                    if (true || !ch.completed)
                      return (
                        <div
                          className="letterCard"
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
              <FeaturedImage hero={hero} game={game} />
            </div>
          </div>
          {currentCards && (
            <div className="currentCards">
              {currentCards.map((ch, i) => {
                return (
                  <div className="letterCard" key={i}>
                    {ch}
                  </div>
                );
              })}
            </div>
          )}
          <div className="next-step">
            {completeBoard && (
              <img
                onClick={() => {
                  playApplause();
                  removeHero();
                }}
                src="/assets/gift.svg"
                height="200px"
              />
            )}
          </div>
        </div>
      }
    </div>
  );
}
