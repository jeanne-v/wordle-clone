import { useSelector, useDispatch } from "react-redux";
import { addLetter, deleteLetter, submitGuess } from "../../gameSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import "./Keyboard.css";
import { useCallback, useEffect } from "react";

export default function Keyboard() {
  const dispatch = useDispatch();
  const letters = useSelector((state) => state.game.letters);

  const currentAttempt = useSelector(
    (state) => state.game.attempts.currentAttempt
  );

  const gameStatus = useSelector((state) => state.game.gameStatus);

  function handleLetterClick(e) {
    if (currentAttempt.length < 5 && gameStatus === "playing") {
      dispatch(addLetter(e.target.dataset.key));
    }
  }

  function handleDeleteClick() {
    if (currentAttempt.length > 0 && gameStatus === "playing") {
      dispatch(deleteLetter());
    }
  }

  function handleEnterClick() {
    if (currentAttempt.length === 5 && gameStatus === "playing") {
      dispatch(submitGuess());
    }
  }

  const handleKeyUp = useCallback(
    (e) => {
      if (gameStatus === "playing") {
        if (
          currentAttempt.length < 5 &&
          e.key.match(/[a-z]/i) &&
          e.key.length === 1
        ) {
          dispatch(addLetter(e.key.toUpperCase()));
        } else if (currentAttempt.length > 0 && e.key === "Backspace") {
          dispatch(deleteLetter());
        } else if (currentAttempt.length === 5 && e.key === "Enter") {
          dispatch(submitGuess());
        }
      }
    },
    [currentAttempt, gameStatus, dispatch]
  );

  useEffect(() => {
    document.body.addEventListener("keyup", handleKeyUp);

    return () => {
      document.body.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  const letterTiles = letters.map((letter, index) => {
    let classes = "keyboard__tile";

    if (letter.status === "not in the word") {
      classes += ` keyboard__tile--not-in-the-word`;
    } else if (letter.status === "incorrect place") {
      classes += ` keyboard__tile--incorrect-place`;
    } else if (letter.status === "correct place") {
      classes += ` keyboard__tile--correct-place`;
    }

    return (
      <button
        onClick={handleLetterClick}
        data-key={letter.letter}
        className={classes}
        key={index}
      >
        {letter.letter}
      </button>
    );
  });

  return (
    <div className="keyboard">
      <div className="keyboard__row">{letterTiles.slice(0, 10)}</div>

      <div className="keyboard__row">{letterTiles.slice(10, 19)}</div>

      <div className="keyboard__row">
        <button
          className="keyboard__tile keyboard__tile--enter"
          onClick={handleEnterClick}
        >
          ENTER
        </button>

        {letterTiles.slice(19)}

        <button
          className="keyboard__tile keyboard__tile--delete"
          onClick={handleDeleteClick}
        >
          <FontAwesomeIcon icon={faDeleteLeft} />
        </button>
      </div>
    </div>
  );
}
