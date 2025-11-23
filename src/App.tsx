import { useCallback, useEffect, useState } from "react";
import { movies } from "./utils/movies";
import { HangmanDrawing } from "./Components/HangmanDrawing";
import { HangmanWord } from "./Components/HangmanWord";
import { HangmanHints } from "./Components/HangmanHints";
import { HangmanKeyboard } from "./Components/HangmanKeyboard";

function App() {
  // pick a movie once and keep it stable across renders
  const [randomNumber] = useState(() => Math.floor(Math.random() * movies.length));
  const movie = movies[randomNumber];
  const movieName = movie.name.toLowerCase();
  const { name, Meta_score, ...movieHints } = movie;

  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | "blind">("medium");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !movieName.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;

  const isWinner = movieName
    .split("")
    .filter((ch) => ch.match(/[a-z]/))  // only check letters
    .every((letter) => guessedLetters.includes(letter));


  // stable callback that uses functional setState to avoid reading stale guessedLetters
  const addGuessedLetter = useCallback((letter: string) => {
    setGuessedLetters((currentLetters) => {
      // if letter already guessed or game already finished, return unchanged
      if (currentLetters.includes(letter) || isWinner || isLoser) return currentLetters;
      return [...currentLetters, letter];
    });
  }, [isWinner, isLoser]);

  // register handler once (depends only on addGuessedLetter)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (!key.match(/^[a-z]$/)) return;
      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);
    return () => document.removeEventListener("keypress", handler);
  }, [addGuessedLetter]);

  return (
    <div style={{
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      margin: "0 auto",
      alignItems: "center"
    }}>
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {isWinner && "Winner! Refresh to try again"}
        {isLoser && "Try again"}
      </div>

      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <div style={{ marginBottom: "1.5rem" }}>
        <select
          value={difficulty}
          onChange={e => setDifficulty(e.target.value as any)}
          style={{
            padding: "0.6rem 1rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            cursor: "pointer",
            backgroundColor: "#f9f9f9",
            transition: "all 0.2s ease",
            minWidth: "180px",
          }}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Difficult</option>
          <option value="blind">Blind</option>
        </select>
      </div>
      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} movieName={movieName} />
      <HangmanHints movieHints={movieHints} rank={randomNumber} difficulty={difficulty} />
      <div style={{ alignSelf: "stretch" }}>
        <HangmanKeyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter((letter) => movieName.includes(letter))}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
