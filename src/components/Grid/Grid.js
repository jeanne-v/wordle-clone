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
        return (
          <div key={nanoid()} className="grid__tile">
            {item}
          </div>
        );
      })}
    </div>
  );
}
