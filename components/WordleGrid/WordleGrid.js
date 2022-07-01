import React from "react";
import WordleRow from "../WordleRow/WordleRow";

export default function WordleGrid({ guesses, currentGuess, turn }) {
  return (
    <div>
      {guesses.map((g, i) => {
        //current guess
        if (turn === i) {
          return <WordleRow key={i} currentGuess={currentGuess} />;
        }
        // Past guess
        return <WordleRow key={i} guess={g} />;
      })}
    </div>
  );
}
