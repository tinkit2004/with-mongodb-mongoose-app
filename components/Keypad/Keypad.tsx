import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import styles from "./Keypad.module.css";
export default function Keypad({
  usedKeys,
}: {
  usedKeys: { [key: string]: string };
}) {
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    fetch("/api/keypad")
      .then((res) => res.json())
      .then((json) => {
        setLetters(json);
      });
  }, []);

  return (
    <Box className={styles.keypad} textAlign="center">
      {letters &&
        letters.map((l) => {
          const color = usedKeys[l.key];
          return (
            <Box key={l.key} className={styles[color]}>
              {l.key}
            </Box>
          );
        })}
    </Box>
  );
}
