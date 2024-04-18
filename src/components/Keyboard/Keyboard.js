import { useSelector, useDispatch } from "react-redux";
import { addLetter, deleteLetter } from "../../gameSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import "./Keyboard.css";

export default function Keyboard() {
  const dispatch = useDispatch();
  const letters = useSelector((state) => state.game.letters);

  const currentAttempt = useSelector(
    (state) => state.game.attempts.currentAttempt
  );

  function handleLetterClick(e) {
    if (currentAttempt.length < 5) {
      dispatch(addLetter(e.target.dataset.key));
    }
  }

  function handleDeleteClick(e) {
    if (currentAttempt.length > 0) {
      dispatch(deleteLetter());
    }
  }

  const letterTiles = letters.map((letter, index) => {
    return (
      <button
        onClick={handleLetterClick}
        data-key={letter.letter}
        className="keyboard__tile"
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
        <button className="keyboard__tile keyboard__tile--enter">ENTER</button>

        {letterTiles.slice(19)}

        <button className="keyboard__tile keyboard__tile--delete">
          <FontAwesomeIcon icon={faDeleteLeft} onClick={handleDeleteClick} />
        </button>
      </div>
    </div>
  );
}
