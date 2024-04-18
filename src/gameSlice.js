import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isGameOver: false,
  answer: {
    word: null,
    loading: false,
    error: null,
  },
  letters: [
    {
      letter: "A",
      status: "not tried yet",
    },
    {
      letter: "Z",
      status: "not tried yet",
    },
    {
      letter: "E",
      status: "not tried yet",
    },
    {
      letter: "R",
      status: "not tried yet",
    },
    {
      letter: "T",
      status: "not tried yet",
    },
    {
      letter: "Y",
      status: "not tried yet",
    },
    {
      letter: "U",
      status: "not tried yet",
    },
    {
      letter: "I",
      status: "not tried yet",
    },
    {
      letter: "O",
      status: "not tried yet",
    },
    {
      letter: "P",
      status: "not tried yet",
    },
    {
      letter: "Q",
      status: "not tried yet",
    },
    {
      letter: "S",
      status: "not tried yet",
    },
    {
      letter: "D",
      status: "not tried yet",
    },
    {
      letter: "F",
      status: "not tried yet",
    },
    {
      letter: "G",
      status: "not tried yet",
    },
    {
      letter: "H",
      status: "not tried yet",
    },
    {
      letter: "J",
      status: "not tried yet",
    },
    {
      letter: "K",
      status: "not tried yet",
    },
    {
      letter: "L",
      status: "not tried yet",
    },
    {
      letter: "M",
      status: "not tried yet",
    },
    {
      letter: "W",
      status: "not tried yet",
    },
    {
      letter: "X",
      status: "not tried yet",
    },
    {
      letter: "C",
      status: "not tried yet",
    },
    {
      letter: "V",
      status: "not tried yet",
    },
    {
      letter: "B",
      status: "not tried yet",
    },
    {
      letter: "N",
      status: "not tried yet",
    },
  ],
  attempts: {
    currentAttempt: [],
    previousAttempts: [],
  },
};

export const fetchAnswer = createAsyncThunk("answer/fetchAnswer", async () => {
  const response = await fetch(
    "https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase"
  );
  const data = await response.json();
  return data[0];
});

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    addLetter(state, action) {
      state.attempts.currentAttempt.push(action.payload);
    },
    deleteLetter(state) {
      state.attempts.currentAttempt.pop();
    },
    submitGuess(state) {
      const wordToGuessArray = state.answer.word.split("");
      const currentAttempt = state.attempts.currentAttempt;

      let attemptResult = [];

      for (let i = 0; i < currentAttempt.length; i++) {
        let match;

        const keyboardLetter = state.letters.find(
          (letter) => letter.letter === currentAttempt[i]
        );

        if (currentAttempt[i] === wordToGuessArray[i]) {
          match = "correct place";
          keyboardLetter.status = "correct place";
        } else if (!wordToGuessArray.includes(currentAttempt[i])) {
          match = "not in the word";
          keyboardLetter.status = "not in the word";
        } else if (wordToGuessArray.includes(currentAttempt[i])) {
          if (keyboardLetter.status !== "correct place") {
            keyboardLetter.status = "incorrect place";
          }

          const numberOfTimesThisLetterAppearsInUserGuess =
            currentAttempt.filter(
              (letter) => letter === currentAttempt[i]
            ).length;

          const numberOfTimesThisLetterAppearsInAnswer =
            wordToGuessArray.filter(
              (letter) => letter === currentAttempt[i]
            ).length;

          if (
            numberOfTimesThisLetterAppearsInUserGuess <=
            numberOfTimesThisLetterAppearsInAnswer
          ) {
            match = "incorrect place";
          } else {
            let numberOfTimesThisLetterIsCorrectlyPlacedInUserGuess = 0;

            for (let j = 0; j < currentAttempt.length; j++) {
              if (currentAttempt[j] === currentAttempt[i]) {
                if (currentAttempt[j] === wordToGuessArray[j]) {
                  numberOfTimesThisLetterIsCorrectlyPlacedInUserGuess++;
                }
              }
            }

            if (
              numberOfTimesThisLetterIsCorrectlyPlacedInUserGuess <
              numberOfTimesThisLetterAppearsInAnswer
            ) {
              const maxNumberOfYellowSlots =
                numberOfTimesThisLetterAppearsInAnswer -
                numberOfTimesThisLetterIsCorrectlyPlacedInUserGuess;

              const numberOfAlreadyYellowSlots = attemptResult.filter(
                (item) => {
                  return item.status === "incorrect place";
                }
              ).length;

              if (maxNumberOfYellowSlots > numberOfAlreadyYellowSlots) {
                match = "incorrect place";
              } else {
                match = "not in the word";
              }
            } else {
              match = "not in the word";
            }
          }
        }

        attemptResult.push({
          letter: currentAttempt[i],
          status: match,
        });
      }

      if (attemptResult.every((item) => item.status === "correct place")) {
        state.isGameOver = true;
      }

      state.attempts.previousAttempts.push(attemptResult);
      state.attempts.currentAttempt = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnswer.pending, (state) => {
        state.answer.loading = true;
      })
      .addCase(fetchAnswer.fulfilled, (state, action) => {
        state.answer.loading = false;
        state.answer.word = action.payload;
      })
      .addCase(fetchAnswer.rejected, (state, action) => {
        state.answer.loading = false;
        state.answer.error = action.error.message;
      });
  },
});

export default gameSlice.reducer;
export const { addLetter, deleteLetter, submitGuess } = gameSlice.actions;
