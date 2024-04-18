import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import "./Grid.css";

export default function Grid() {
  const currentAttempt = useSelector(
    (state) => state.game.attempts.currentAttempt
  );

  // if the current attempt doesn't have 5 letters yet, add empty slots
  const currentAttemptContent = currentAttempt.concat(
    new Array(5 - currentAttempt.length).fill("")
  );

  const previousAttempts = useSelector(
    (state) => state.game.attempts.previousAttempts
  );

  // if there are remaining attempts, add rows with empty slots
  let allAttempts = [...previousAttempts, currentAttemptContent];
  const emptySlots = new Array(6 - allAttempts.length).fill([
    "",
    "",
    "",
    "",
    "",
  ]);

  const gridContent = allAttempts.concat(emptySlots);

  return (
    <div className="grid">
      {gridContent.map((gridRow) => {
        return <GridRow key={nanoid()} rowContent={gridRow} />;
      })}
    </div>
  );
}

function GridRow({ rowContent }) {
  return (
    <div className="grid__row">
      {rowContent.map((item) => {
        let content;
        let classes = "grid__tile";

        if (typeof item === "string") {
          content = item;
        } else {
          content = item.letter;

          if (item.status === "not in the word") {
            classes += ` grid__tile--not-in-the-word`;
          } else if (item.status === "incorrect place") {
            classes += ` grid__tile--incorrect-place`;
          } else if (item.status === "correct place") {
            classes += ` grid__tile--correct-place`;
          }
        }

        return (
          <div key={nanoid()} className={classes}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
