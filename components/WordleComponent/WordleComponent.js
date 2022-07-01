import React, { useEffect } from "react";
import { useState } from "react";
import useWordle from "../../hooks/useWordle";
import Keypad from "../Keypad/Keypad";
import WordleGrid from "../WordleGrid/WordleGrid";
import WordleModal from "../WordleModal/WordleModal";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react/";
export default function WordleComponent({ solution }) {
  const router = useRouter();
  const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } =
    useWordle(solution);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    if (isCorrect) {
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
      window.removeEventListener("keyup", handleKeyup);
    }
    if (turn > 5) {
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  return (
    <Box mt="4">
      <WordleGrid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      {showModal && (
        <WordleModal
          isCorrect={isCorrect}
          turn={turn}
          solution={solution}
          showModal={showModal}
          closeModal={() => {
            router.reload();
          }}
        />
      )}
    </Box>
  );
}
