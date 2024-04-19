import { useEffect, useState } from "react";
import Grid from "./components/Grid/Grid";
import Header from "./components/Header/Header";
import { fetchAnswer, startNewGame } from "./gameSlice";
import { useDispatch, useSelector } from "react-redux";
import Keyboard from "./components/Keyboard/Keyboard";
import Confetti from "react-confetti";
import useViewportWidth from "./hooks/useViewPortSize";
import { createPortal } from "react-dom";

export default function App() {
  const dispatch = useDispatch();
  const answer = useSelector((state) => state.game.answer.word);
  const isLoading = useSelector((state) => state.game.answer.loading);
  const error = useSelector((state) => state.game.answer.error);

  const gameStatus = useSelector((state) => state.game.gameStatus);
  const { width, height } = useViewportWidth();

  const numberOfAttempts = useSelector(
    (state) => state.game.attempts.previousAttempts
  ).length;

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (gameStatus === "playing") {
      dispatch(fetchAnswer());
    }
  }, [dispatch, gameStatus]);

  useEffect(() => {
    if (gameStatus === "WIN") {
      let timer = setTimeout(() => setShowModal(true), 4000);

      return () => {
        clearTimeout(timer);
      };
    } else if (gameStatus === "FAIL") {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [gameStatus]);

  return (
    <main className="game-container">
      {gameStatus === "WIN" && <Confetti width={width} height={height} />}
      <Header />
      {answer ? (
        <>
          <Grid />
          <Keyboard />
        </>
      ) : isLoading ? (
        "Loading..."
      ) : (
        error
      )}
      {showModal &&
        createPortal(
          <div className="modal-container">
            <div className="modal">
              <h1 className="modal__heading">{gameStatus}</h1>
              <p className="modal__text">
                {gameStatus === "WIN" &&
                  `On the ${numberOfAttempts}${
                    numberOfAttempts === 1
                      ? "rst"
                      : numberOfAttempts === 2
                      ? "nd"
                      : numberOfAttempts === 3
                      ? "rd"
                      : "th"
                  }
                  try
                  `}
                {gameStatus === "FAIL" && `The answer was ${answer}`}
              </p>
              <button
                onClick={() => dispatch(startNewGame())}
                className="modal__new-game-btn"
              >
                New Game
              </button>
            </div>
          </div>,
          document.body
        )}
    </main>
  );
}
