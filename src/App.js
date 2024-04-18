import { useEffect } from "react";
import Grid from "./components/Grid/Grid";
import Header from "./components/Header/Header";
import { fetchAnswer } from "./gameSlice";
import { useDispatch, useSelector } from "react-redux";
import Keyboard from "./components/Keyboard/Keyboard";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnswer());
  }, [dispatch]);

  const answer = useSelector((state) => state.game.answer.word);
  const isLoading = useSelector((state) => state.game.answer.loading);
  const error = useSelector((state) => state.game.answer.error);

  return (
    <main className="game-container">
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
    </main>
  );
}
