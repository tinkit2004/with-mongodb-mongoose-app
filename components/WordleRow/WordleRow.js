import React from "react";
import { Flex } from "@chakra-ui/react";
import WordleSquare from "../WordleSquare/wordleSquare";
import { Box } from "@chakra-ui/react";
import styles from "../WordleSquare/WordleSquare.module.css";
export default function WordleRow({ guess, currentGuess }) {
  if (guess) {
    return (
      <Flex
        textAlign="center"
        justifyContent="center"
        className={`past ${styles.row}`}
      >
        {guess.map((l, i) => {
          return (
            <WordleSquare key={i} className={l.color}>
              {l.key}
            </WordleSquare>
          );
        })}
      </Flex>
    );
  }
  if (currentGuess) {
    let letters = currentGuess.split("");
    return (
      <Flex
        textAlign="center"
        justifyContent="center"
        className={`current ${styles.row}`}
      >
        {letters.map((letter, i) => (
          <WordleSquare key={i} className="filled">
            {letter}
          </WordleSquare>
        ))}
        {[...Array(5 - letters.length)].map((_, i) => (
          <WordleSquare key={i}></WordleSquare>
        ))}
      </Flex>
    );
  }
  return (
    <Flex textAlign="center" justifyContent="center" className={styles.row}>
      {[...Array(5)].map((s, i) => {
        return <WordleSquare key={i} />;
      })}
    </Flex>
  );
}
