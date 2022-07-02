import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
export default function WordleModal({
  isCorrect,
  turn,
  solution,
  closeModal,
  showModal,
}) {
  return (
    <>
      {isCorrect && (
        <Modal isOpen={showModal} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">Congratulations!!!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <h1>The solution is {solution}</h1>
              <p>You found the solution in {turn} guesses :)</p>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      {!isCorrect && (
        <Modal isOpen={showModal} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">Nevermind</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <h1>The solution is {solution}</h1>
              <p>Try again :)</p>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
