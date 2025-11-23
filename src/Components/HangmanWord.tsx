type HangmanWordProps = {
  reveal?: boolean;
  guessedLetters: string[];
  movieName: string;
};

export const HangmanWord = ({ reveal = false, guessedLetters, movieName }: HangmanWordProps) => {

  // helper: check if character is a letter
  const isLetter = (char: string) => /^[a-z]$/i.test(char);

  return (
    <div
      style={{
        display: "flex",
        gap: ".25em",
        fontSize: "3em",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
        flexWrap: "wrap",
      }}
    >
      {movieName.split("").map((char, index) => {
        const letter = char.toLowerCase();

        const shouldShow =
          !isLetter(char) || // always show space/punctuation
          guessedLetters.includes(letter) ||
          reveal;

        const isMissed = reveal && isLetter(char) && !guessedLetters.includes(letter);

        return (
          <span
            key={index}
            style={{
              borderBottom: isLetter(char) ? ".1em solid #000" : "none",
              display: "inline-block",
              minWidth: "0.6em",
              textAlign: "center",
            }}
          >
            <span
              style={{
                visibility: shouldShow ? "visible" : "hidden",
                color: isMissed ? "red" : "black",
              }}
            >
              {char}
            </span>
          </span>
        );
      })}
    </div>
  );
};
